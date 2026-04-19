import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: "server/.env.server" });

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const MEDIA_BUCKET = process.env.SUPABASE_MEDIA_BUCKET || "media";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const COOKIE_SAME_SITE = process.env.COOKIE_SAME_SITE || (process.env.NODE_ENV === "production" ? "none" : "lax");
const COOKIE_SECURE = process.env.COOKIE_SECURE
  ? process.env.COOKIE_SECURE === "true"
  : process.env.NODE_ENV === "production";

function normalizeOrigin(value) {
  try {
    const parsed = new URL(value);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return value;
  }
}

const allowedOrigins = FRONTEND_ORIGIN.split(",")
  .map((origin) => normalizeOrigin(origin.trim()))
  .filter(Boolean);

const wildcardOriginRegexes = allowedOrigins
  .filter((origin) => origin.includes("*"))
  .map((origin) => {
    const escaped = origin
      .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\*/g, ".*");
    return new RegExp(`^${escaped}$`);
  });

function isOriginAllowed(origin) {
  const normalizedOrigin = normalizeOrigin(origin);
  if (allowedOrigins.includes(normalizedOrigin)) return true;
  return wildcardOriginRegexes.some((regex) => regex.test(normalizedOrigin));
}

function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function buildNewsSlug(item, index = 0) {
  if (item?.meta?.slug) return item.meta.slug;
  const base = slugify(item?.title) || `article-${index + 1}`;
  if (item?.id) {
    const shortId = String(item.id).split("-")[0];
    return `${base}-${shortId}`;
  }
  return base;
}

function buildEventSlug(item, index = 0) {
  if (item?.meta?.slug) return item.meta.slug;
  const base = slugify(item?.title) || `event-${index + 1}`;
  if (item?.id) {
    const shortId = String(item.id).split("-")[0];
    return `${base}-${shortId}`;
  }
  return base;
}

async function uploadBufferToMediaBucket(file) {
  const fileExt = file.originalname.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(filePath);
  return { url: data.publicUrl, path: filePath };
}

async function getPostCounts(postIds = []) {
  if (!postIds.length) {
    return { likeCounts: {}, commentCounts: {} };
  }

  const { data: likesData, error: likesError } = await supabase
    .from("post_likes")
    .select("post_id")
    .in("post_id", postIds);
  if (likesError) throw new Error(likesError.message);

  const { data: commentsData, error: commentsError } = await supabase
    .from("post_comments")
    .select("post_id")
    .in("post_id", postIds);
  if (commentsError) throw new Error(commentsError.message);

  const likeCounts = {};
  const commentCounts = {};
  for (const id of postIds) {
    likeCounts[id] = 0;
    commentCounts[id] = 0;
  }
  for (const like of likesData || []) {
    likeCounts[like.post_id] = (likeCounts[like.post_id] || 0) + 1;
  }
  for (const comment of commentsData || []) {
    commentCounts[comment.post_id] = (commentCounts[comment.post_id] || 0) + 1;
  }

  return { likeCounts, commentCounts };
}

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  // eslint-disable-next-line no-console
  console.warn("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env.server");
}

const supabase = createClient(SUPABASE_URL || "", SUPABASE_SERVICE_KEY || "");

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server and curl/postman requests without Origin
      if (!origin) return callback(null, true);
      try {
        return callback(null, isOriginAllowed(origin));
      } catch {
        return callback(null, false);
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

const upload = multer({ storage: multer.memoryStorage() });

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function extractBearerToken(req) {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) return null;
  return authHeader.slice("Bearer ".length).trim();
}

function apiAuthRequired(req, res, next) {
  const bearerToken = extractBearerToken(req);
  const cookieToken = req.cookies.admin_token;
  const token = bearerToken || cookieToken;
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

function authRequired(req, res, next) {
  const token = req.cookies.admin_token;
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== "admin") {
      return res.status(403).json({ error: "You are not an admin." });
    }
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

function apiAuthOptional(req, _res, next) {
  const token = extractBearerToken(req) || req.cookies.admin_token;
  if (!token) {
    req.user = null;
    return next();
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch {
    req.user = null;
  }
  return next();
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/public/newsarticles", async (req, res) => {
  const { data, error } = await supabase
    .from("content_items")
    .select("*")
    .eq("page_slug", "Newsarticles")
    .eq("section_key", "news_articles")
    .order("sort_order", { ascending: true });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const articles = (data || []).map((item, index) => ({
    ...item,
    slug: buildNewsSlug(item, index),
  }));

  return res.json({ data: articles });
});

app.get("/api/public/newsarticles/:slug", async (req, res) => {
  const targetSlug = String(req.params.slug || "").trim().toLowerCase();
  if (!targetSlug) {
    return res.status(400).json({ error: "Slug is required" });
  }

  const { data, error } = await supabase
    .from("content_items")
    .select("*")
    .eq("page_slug", "Newsarticles")
    .eq("section_key", "news_articles")
    .order("sort_order", { ascending: true });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const articles = (data || []).map((item, index) => ({
    ...item,
    slug: buildNewsSlug(item, index),
  }));
  const article = articles.find((item) => item.slug.toLowerCase() === targetSlug);

  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }

  return res.json({ data: article });
});

app.get("/api/public/compitionevents", async (req, res) => {
  const { data, error } = await supabase
    .from("content_items")
    .select("*")
    .eq("page_slug", "Compitionevent")
    .eq("section_key", "competition_events")
    .order("sort_order", { ascending: true });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const events = (data || []).map((item, index) => ({
    ...item,
    slug: buildEventSlug(item, index),
  }));

  return res.json({ data: events });
});

app.get("/api/public/compitionevents/:slug", async (req, res) => {
  const targetSlug = String(req.params.slug || "").trim().toLowerCase();
  if (!targetSlug) {
    return res.status(400).json({ error: "Slug is required" });
  }

  const { data, error } = await supabase
    .from("content_items")
    .select("*")
    .eq("page_slug", "Compitionevent")
    .eq("section_key", "competition_events")
    .order("sort_order", { ascending: true });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const events = (data || []).map((item, index) => ({
    ...item,
    slug: buildEventSlug(item, index),
  }));
  const event = events.find((item) => item.slug.toLowerCase() === targetSlug);

  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  return res.json({ data: event });
});

app.get("/api/public/photogallery", async (req, res) => {
  const { data, error } = await supabase
    .from("content_items")
    .select("*")
    .eq("page_slug", "Photogallery")
    .eq("section_key", "gallery_images")
    .order("sort_order", { ascending: true });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json({ data: data || [] });
});

app.get("/api/public/videogallery", async (req, res) => {
  const { data, error } = await supabase
    .from("content_items")
    .select("*")
    .eq("page_slug", "Videogallery")
    .eq("section_key", "video_gallery")
    .order("sort_order", { ascending: true });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json({ data: data || [] });
});

app.post("/api/v1/auth/register", async (req, res) => {
  const { email, password, role } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  if (String(password).length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const cleanRole = role && ["customer", "admin"].includes(role) ? role : "customer";

  const { data: existingUser, error: existingUserError } = await supabase
    .from("users")
    .select("id")
    .eq("email", cleanEmail)
    .single();

  if (existingUserError && existingUserError.code !== "PGRST116") {
    return res.status(400).json({ error: existingUserError.message });
  }
  if (existingUser) {
    return res.status(400).json({ error: "Email already registered" });
  }

  const password_hash = await bcrypt.hash(String(password), 10);
  const { data: user, error } = await supabase
    .from("users")
    .insert({
      email: cleanEmail,
      password_hash,
      role: cleanRole,
      is_active: true,
    })
    .select("*")
    .single();

  if (error || !user) {
    return res.status(400).json({ error: error?.message || "Failed to register" });
  }

  const token = signToken(user);
  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      pin_enabled: !!user.pin_enabled,
    },
  });
});

app.post("/api/v1/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", cleanEmail)
    .eq("is_active", true)
    .single();

  if (error || !user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const passwordOk = await bcrypt.compare(String(password), user.password_hash);
  if (!passwordOk) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signToken(user);
  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      pin_enabled: !!user.pin_enabled,
    },
  });
});

app.get("/api/v1/auth/me", apiAuthRequired, async (req, res) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, role, is_active, pin_enabled, pin_updated_at")
    .eq("id", req.user.id)
    .single();

  if (error || !user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json({ user });
});

app.post("/api/v1/auth/pin/set", apiAuthRequired, async (req, res) => {
  const { pin } = req.body || {};
  if (!pin) {
    return res.status(400).json({ error: "PIN is required" });
  }
  const pinString = String(pin).trim();
  if (!/^\d{4,6}$/.test(pinString)) {
    return res.status(400).json({ error: "PIN must be 4 to 6 digits" });
  }

  const pin_hash = await bcrypt.hash(pinString, 10);
  const { data, error } = await supabase
    .from("users")
    .update({
      pin_hash,
      pin_enabled: true,
      pin_updated_at: new Date().toISOString(),
    })
    .eq("id", req.user.id)
    .select("id, email, role, pin_enabled, pin_updated_at")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to set PIN" });
  }

  return res.json({ message: "PIN set successfully", user: data });
});

app.post("/api/v1/auth/pin/verify", apiAuthRequired, async (req, res) => {
  const { pin } = req.body || {};
  if (!pin) {
    return res.status(400).json({ error: "PIN is required" });
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("id, pin_hash, pin_enabled")
    .eq("id", req.user.id)
    .single();

  if (error || !user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (!user.pin_enabled || !user.pin_hash) {
    return res.status(400).json({ error: "PIN is not set" });
  }

  const pinOk = await bcrypt.compare(String(pin).trim(), user.pin_hash);
  if (!pinOk) {
    return res.status(401).json({ error: "Invalid PIN" });
  }

  return res.json({ verified: true });
});

app.post("/api/v1/posts/media/upload", apiAuthRequired, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  if (!String(req.file.mimetype || "").startsWith("image/")) {
    return res.status(400).json({ error: "Only image files are allowed" });
  }
  try {
    const result = await uploadBufferToMediaBucket(req.file);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message || "Upload failed" });
  }
});

app.post("/api/v1/posts", apiAuthRequired, async (req, res) => {
  const { title, content, image_url } = req.body || {};
  const cleanContent = String(content || "").trim();
  if (!cleanContent) {
    return res.status(400).json({ error: "Content is required" });
  }

  const payload = {
    user_id: req.user.id,
    title: title ? String(title).trim() : null,
    content: cleanContent,
    image_url: image_url ? String(image_url).trim() : null,
    status: "published",
  };

  const { data, error } = await supabase
    .from("posts")
    .insert(payload)
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to create post" });
  }

  return res.json({ data: { ...data, like_count: 0, comment_count: 0, liked_by_me: false } });
});

app.get("/api/v1/posts", apiAuthOptional, async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
  const offset = Math.max(Number(req.query.offset) || 0, 0);

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const postIds = (posts || []).map((p) => p.id);
  const { likeCounts, commentCounts } = await getPostCounts(postIds).catch((err) => ({
    likeCounts: {},
    commentCounts: {},
    countsError: err.message,
  }));

  let likedByMeSet = new Set();
  if (req.user?.id && postIds.length) {
    const { data: myLikes } = await supabase
      .from("post_likes")
      .select("post_id")
      .eq("user_id", req.user.id)
      .in("post_id", postIds);
    likedByMeSet = new Set((myLikes || []).map((row) => row.post_id));
  }

  const userIds = Array.from(new Set((posts || []).map((p) => p.user_id).filter(Boolean)));
  let usersMap = {};
  if (userIds.length) {
    const { data: usersData } = await supabase
      .from("users")
      .select("id, email, role")
      .in("id", userIds);
    usersMap = Object.fromEntries((usersData || []).map((u) => [u.id, u]));
  }

  const formatted = (posts || []).map((post) => ({
    ...post,
    author: usersMap[post.user_id] || null,
    like_count: likeCounts[post.id] || 0,
    comment_count: commentCounts[post.id] || 0,
    liked_by_me: likedByMeSet.has(post.id),
  }));

  return res.json({ data: formatted, meta: { limit, offset } });
});

app.get("/api/v1/posts/:id", apiAuthOptional, async (req, res) => {
  const { id } = req.params;
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const { likeCounts, commentCounts } = await getPostCounts([post.id]).catch(() => ({
    likeCounts: {},
    commentCounts: {},
  }));

  let likedByMe = false;
  if (req.user?.id) {
    const { data: myLike } = await supabase
      .from("post_likes")
      .select("post_id")
      .eq("post_id", post.id)
      .eq("user_id", req.user.id)
      .maybeSingle();
    likedByMe = !!myLike;
  }

  const { data: author } = await supabase
    .from("users")
    .select("id, email, role")
    .eq("id", post.user_id)
    .maybeSingle();

  return res.json({
    data: {
      ...post,
      author: author || null,
      like_count: likeCounts[post.id] || 0,
      comment_count: commentCounts[post.id] || 0,
      liked_by_me: likedByMe,
    },
  });
});

app.post("/api/v1/posts/:id/like", apiAuthRequired, async (req, res) => {
  const { id } = req.params;
  const { data: post } = await supabase.from("posts").select("id").eq("id", id).maybeSingle();
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const { data: existingLike } = await supabase
    .from("post_likes")
    .select("post_id")
    .eq("post_id", id)
    .eq("user_id", req.user.id)
    .maybeSingle();

  if (existingLike) {
    const { error: deleteError } = await supabase
      .from("post_likes")
      .delete()
      .eq("post_id", id)
      .eq("user_id", req.user.id);
    if (deleteError) {
      return res.status(400).json({ error: deleteError.message });
    }
  } else {
    const { error: insertError } = await supabase
      .from("post_likes")
      .insert({ post_id: id, user_id: req.user.id });
    if (insertError) {
      return res.status(400).json({ error: insertError.message });
    }
  }

  const { likeCounts } = await getPostCounts([id]).catch(() => ({ likeCounts: {} }));
  return res.json({
    data: {
      post_id: id,
      liked: !existingLike,
      like_count: likeCounts[id] || 0,
    },
  });
});

app.get("/api/v1/posts/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("post_comments")
    .select("*")
    .eq("post_id", id)
    .order("created_at", { ascending: true });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const userIds = Array.from(new Set((data || []).map((c) => c.user_id).filter(Boolean)));
  let usersMap = {};
  if (userIds.length) {
    const { data: usersData } = await supabase
      .from("users")
      .select("id, email, role")
      .in("id", userIds);
    usersMap = Object.fromEntries((usersData || []).map((u) => [u.id, u]));
  }

  const comments = (data || []).map((comment) => ({
    ...comment,
    author: usersMap[comment.user_id] || null,
  }));

  return res.json({ data: comments });
});

app.post("/api/v1/posts/:id/comments", apiAuthRequired, async (req, res) => {
  const { id } = req.params;
  const content = String(req.body?.content || "").trim();
  if (!content) {
    return res.status(400).json({ error: "Comment content is required" });
  }

  const { data: post } = await supabase.from("posts").select("id").eq("id", id).maybeSingle();
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const { data, error } = await supabase
    .from("post_comments")
    .insert({
      post_id: id,
      user_id: req.user.id,
      content,
    })
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to add comment" });
  }

  return res.json({ data });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const passwordOk = await bcrypt.compare(password, data.password_hash);
  if (!passwordOk) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  if (data.role !== "admin") {
    return res.status(403).json({ error: "You are not an admin." });
  }

  const token = signToken(data);
  res.cookie("admin_token", token, {
    httpOnly: true,
    sameSite: COOKIE_SAME_SITE,
    secure: COOKIE_SECURE,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  let customerProfile = null;
  if (data.role === "customer") {
    const { data: profile } = await supabase
      .from("customers")
      .select("*")
      .eq("user_id", data.id)
      .single();
    customerProfile = profile || null;
  }

  return res.json({
    id: data.id,
    email: data.email,
    role: data.role,
    customer: customerProfile,
  });
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("admin_token");
  res.json({ ok: true });
});

app.get("/api/auth/me", authRequired, async (req, res) => {
  let customerProfile = null;
  if (req.user.role === "customer") {
    const { data: profile } = await supabase
      .from("customers")
      .select("*")
      .eq("user_id", req.user.id)
      .single();
    customerProfile = profile || null;
  }
  return res.json({ user: req.user, customer: customerProfile });
});

app.get("/api/content/page/:slug", authRequired, async (req, res) => {
  const { slug } = req.params;
  const { data, error } = await supabase
    .from("page_content")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return res.status(404).json({ error: "Not found" });
  }
  return res.json({ data });
});

app.put("/api/content/page/:slug", authRequired, async (req, res) => {
  const { slug } = req.params;
  const payload = { ...req.body, slug };
  const { data, error } = await supabase
    .from("page_content")
    .upsert(payload, { onConflict: "slug" })
    .select("*")
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.json({ data });
});

app.get("/api/content/items", authRequired, async (req, res) => {
  const { page, section } = req.query;
  let query = supabase.from("content_items").select("*").order("sort_order");
  if (page) query = query.eq("page_slug", page);
  if (section) query = query.eq("section_key", section);
  const { data, error } = await query;
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ data });
});

app.post("/api/content/items", authRequired, async (req, res) => {
  const { data, error } = await supabase
    .from("content_items")
    .insert(req.body)
    .select("*")
    .single();
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ data });
});

app.put("/api/content/items/:id", authRequired, async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("content_items")
    .update(req.body)
    .eq("id", id)
    .select("*")
    .single();
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ data });
});

app.delete("/api/content/items/:id", authRequired, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("content_items").delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ ok: true });
});

app.get("/api/customers", authRequired, async (req, res) => {
  const { data, error } = await supabase
    .from("customers")
    .select("*, users:user_id (email, role, is_active)")
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  return res.json({ data });
});

app.post("/api/customers", authRequired, async (req, res) => {
  const { name, email, password, phone, status, notes, is_active } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }

  const cleanEmail = String(email).trim().toLowerCase();

  const { data: existingUser, error: existingUserError } = await supabase
    .from("users")
    .select("id")
    .eq("email", cleanEmail)
    .single();
  if (existingUserError && existingUserError.code !== "PGRST116") {
    return res.status(400).json({ error: existingUserError.message });
  }
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists in users" });
  }

  const password_hash = await bcrypt.hash(String(password), 10);
  const { data: createdUser, error: userError } = await supabase
    .from("users")
    .insert({
      email: cleanEmail,
      password_hash,
      role: "customer",
      is_active: typeof is_active === "boolean" ? is_active : true,
    })
    .select("*")
    .single();

  if (userError || !createdUser) {
    return res.status(400).json({ error: userError?.message || "Failed to create user" });
  }

  const { data, error } = await supabase
    .from("customers")
    .insert({
      user_id: createdUser.id,
      name: String(name).trim(),
      phone: phone ? String(phone).trim() : null,
      status: status ? String(status).trim() : "new",
      notes: notes ? String(notes).trim() : null,
    })
    .select("*")
    .single();

  if (error) {
    await supabase.from("users").delete().eq("id", createdUser.id);
    return res.status(400).json({ error: error.message });
  }

  return res.json({ data: { ...data, users: { email: createdUser.email, role: createdUser.role, is_active: createdUser.is_active } } });
});

app.post("/api/media/upload", authRequired, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const fileExt = req.file.originalname.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(filePath, req.file.buffer, {
      contentType: req.file.mimetype,
      upsert: false,
    });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(filePath);
  return res.json({ url: data.publicUrl, path: filePath });
});

// Serve React frontend in production
const distPath = join(__dirname, "../dist");
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`);
});
