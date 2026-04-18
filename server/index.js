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
      if (isOriginAllowed(origin)) return callback(null, true);
      return callback(new Error("CORS: Origin not allowed"));
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
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
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
