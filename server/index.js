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

function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "").trim());
}

function isIsoMonth(value) {
  return /^\d{4}-\d{2}$/.test(String(value || "").trim());
}

function parseIsoDateToUtc(value) {
  const [y, m, d] = String(value).split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function formatUtcDate(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addUtcDays(date, days) {
  const next = new Date(date.getTime());
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function monthRangeFromIso(isoMonth) {
  const [y, m] = isoMonth.split("-").map(Number);
  const start = new Date(Date.UTC(y, m - 1, 1));
  const end = new Date(Date.UTC(y, m, 0));
  return { start, end };
}

function normalizeSelectedDates(selectedDates = []) {
  return [...new Set((selectedDates || []).filter((d) => isIsoDate(d)).map((d) => String(d)))].sort();
}

function inferPeriodBounds({ period_start_date, period_end_date, selected_dates }) {
  const normalized = normalizeSelectedDates(selected_dates || []);
  const start = period_start_date || normalized[0] || null;
  const end = period_end_date || normalized[normalized.length - 1] || start;
  return { start, end, normalized };
}

function buildPeriodTrackerSummary({
  isoMonth,
  lastPeriodStartDate,
  cycleLengthDays,
  periodLengthDays,
  prePeriodDays,
  postPeriodDays,
  ovulationStartDay,
  ovulationWindowDays,
}) {
  const { start: monthStart, end: monthEnd } = monthRangeFromIso(isoMonth);
  const cycleLen = Number(cycleLengthDays) || 28;
  const periodLen = Number(periodLengthDays) || 5;
  const preLen = Number(prePeriodDays) || 2;
  const postLen = Number(postPeriodDays) || 2;
  const ovuStart = Number(ovulationStartDay) || 11;
  const ovuWindow = Number(ovulationWindowDays) || 5;

  const statusByDate = {};
  let cycleStart = parseIsoDateToUtc(lastPeriodStartDate);
  const searchStart = addUtcDays(monthStart, -cycleLen * 2);
  while (cycleStart > searchStart) {
    cycleStart = addUtcDays(cycleStart, -cycleLen);
  }

  const searchEnd = addUtcDays(monthEnd, cycleLen * 2);
  while (cycleStart <= searchEnd) {
    for (let i = 0; i < periodLen; i += 1) {
      const dt = formatUtcDate(addUtcDays(cycleStart, i));
      statusByDate[dt] = statusByDate[dt] || new Set();
      statusByDate[dt].add("period");
    }
    for (let i = periodLen; i < periodLen + postLen; i += 1) {
      const dt = formatUtcDate(addUtcDays(cycleStart, i));
      statusByDate[dt] = statusByDate[dt] || new Set();
      statusByDate[dt].add("post_period");
    }
    for (let i = ovuStart - 1; i < ovuStart - 1 + ovuWindow; i += 1) {
      const dt = formatUtcDate(addUtcDays(cycleStart, i));
      statusByDate[dt] = statusByDate[dt] || new Set();
      statusByDate[dt].add("peak_ovulation");
    }
    for (let i = cycleLen - preLen; i < cycleLen; i += 1) {
      const dt = formatUtcDate(addUtcDays(cycleStart, i));
      statusByDate[dt] = statusByDate[dt] || new Set();
      statusByDate[dt].add("pre_period");
    }
    cycleStart = addUtcDays(cycleStart, cycleLen);
  }

  const priority = ["period", "peak_ovulation", "pre_period", "post_period"];
  const days = [];
  let current = new Date(monthStart.getTime());
  while (current <= monthEnd) {
    const iso = formatUtcDate(current);
    const statuses = Array.from(statusByDate[iso] || []);
    const primary = priority.find((p) => statuses.includes(p)) || null;
    days.push({
      date: iso,
      day: current.getUTCDate(),
      statuses,
      primary_status: primary,
    });
    current = addUtcDays(current, 1);
  }

  return {
    month: isoMonth,
    cycle_length_days: cycleLen,
    period_length_days: periodLen,
    pre_period_days: preLen,
    post_period_days: postLen,
    ovulation_start_day: ovuStart,
    ovulation_window_days: ovuWindow,
    days,
  };
}

function averageRounded(values = []) {
  if (!values.length) return null;
  const total = values.reduce((sum, value) => sum + Number(value || 0), 0);
  return Math.round(total / values.length);
}

function deriveAdaptiveCycleMetricsFromLogs(logs = []) {
  const sorted = [...(logs || [])]
    .filter((row) => row?.period_start_date && isIsoDate(row.period_start_date))
    .sort((a, b) => String(a.period_start_date).localeCompare(String(b.period_start_date)));

  const cycleLengths = [];
  for (let i = 1; i < sorted.length; i += 1) {
    const prev = parseIsoDateToUtc(sorted[i - 1].period_start_date);
    const current = parseIsoDateToUtc(sorted[i].period_start_date);
    const diffDays = Math.round((current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays >= 15 && diffDays <= 60) {
      cycleLengths.push(diffDays);
    }
  }

  const periodLengths = [];
  for (const row of sorted) {
    if (row.period_start_date && row.period_end_date && isIsoDate(row.period_end_date)) {
      const start = parseIsoDateToUtc(row.period_start_date);
      const end = parseIsoDateToUtc(row.period_end_date);
      const diffDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      if (diffDays >= 1 && diffDays <= 15) {
        periodLengths.push(diffDays);
      }
    } else if (Array.isArray(row.selected_dates) && row.selected_dates.length > 0) {
      const diffDays = row.selected_dates.length;
      if (diffDays >= 1 && diffDays <= 15) {
        periodLengths.push(diffDays);
      }
    }
  }

  return {
    adaptive_cycle_length_days: averageRounded(cycleLengths),
    adaptive_period_length_days: averageRounded(periodLengths),
    samples_used_for_cycle: cycleLengths.length,
    samples_used_for_period: periodLengths.length,
  };
}

function normalizeSymptomArray(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map((item) => String(item || "").trim()).filter(Boolean))];
}

function isValidReminderType(value) {
  return ["period", "pre_period", "post_period", "peak_ovulation", "custom"].includes(String(value || ""));
}

function isValidRepeatType(value) {
  return ["none", "daily", "weekly", "monthly"].includes(String(value || ""));
}

function isTimeHHMM(value) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(String(value || "").trim());
}

function parseTimeHHMM(value) {
  const [hh, mm] = String(value).split(":").map(Number);
  return { hh, mm };
}

function formatReminderDateTime(isoDate, hhmm) {
  const { hh, mm } = parseTimeHHMM(hhmm);
  const dt = parseIsoDateToUtc(isoDate);
  dt.setUTCHours(hh, mm, 0, 0);
  return dt.toISOString();
}

function addOccurrencesByRepeat({ fromDate, toDate, seedDate, repeatType, reminderTime }) {
  const result = [];
  if (!seedDate || !isIsoDate(seedDate)) return result;
  if (!repeatType || repeatType === "none") {
    if (seedDate >= fromDate && seedDate <= toDate) {
      result.push({ date: seedDate, scheduled_at: formatReminderDateTime(seedDate, reminderTime) });
    }
    return result;
  }

  let current = parseIsoDateToUtc(seedDate);
  const start = parseIsoDateToUtc(fromDate);
  const end = parseIsoDateToUtc(toDate);

  while (current < start) {
    if (repeatType === "daily") current = addUtcDays(current, 1);
    if (repeatType === "weekly") current = addUtcDays(current, 7);
    if (repeatType === "monthly") current = new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth() + 1, current.getUTCDate()));
  }

  while (current <= end) {
    const iso = formatUtcDate(current);
    result.push({ date: iso, scheduled_at: formatReminderDateTime(iso, reminderTime) });
    if (repeatType === "daily") current = addUtcDays(current, 1);
    if (repeatType === "weekly") current = addUtcDays(current, 7);
    if (repeatType === "monthly") current = new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth() + 1, current.getUTCDate()));
  }

  return result;
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

async function buildUpcomingReminderEventsForUser({ userId, days = 30 }) {
  const safeDays = Math.min(Math.max(Number(days) || 30, 1), 90);
  const startDate = new Date();
  const fromIso = formatUtcDate(new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate())));
  const toIso = formatUtcDate(addUtcDays(parseIsoDateToUtc(fromIso), safeDays - 1));

  const { data: reminders, error: remindersError } = await supabase
    .from("period_tracker_reminders")
    .select("*")
    .eq("user_id", userId)
    .eq("is_enabled", true);
  if (remindersError) throw new Error(remindersError.message);

  const { data: setupData, error: setupError } = await supabase
    .from("period_tracker_settings")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (setupError) throw new Error(setupError.message);

  const monthSet = new Set();
  let cursor = parseIsoDateToUtc(fromIso);
  const endCursor = parseIsoDateToUtc(toIso);
  while (cursor <= endCursor) {
    monthSet.add(`${cursor.getUTCFullYear()}-${String(cursor.getUTCMonth() + 1).padStart(2, "0")}`);
    cursor = addUtcDays(cursor, 1);
  }

  const statusDateMap = {};
  if (setupData?.last_period_start_date) {
    for (const month of monthSet) {
      const summary = buildPeriodTrackerSummary({
        isoMonth: month,
        lastPeriodStartDate: setupData.last_period_start_date,
        cycleLengthDays: setupData.cycle_length_days || 28,
        periodLengthDays: setupData.period_length_days || 5,
        prePeriodDays: setupData.pre_period_days || 2,
        postPeriodDays: setupData.post_period_days || 2,
        ovulationStartDay: setupData.ovulation_start_day || 11,
        ovulationWindowDays: setupData.ovulation_window_days || 5,
      });
      for (const day of summary.days || []) {
        if (day.date >= fromIso && day.date <= toIso) {
          statusDateMap[day.date] = day.statuses || [];
        }
      }
    }
  }

  const upcoming = [];
  for (const reminder of reminders || []) {
    const reminderTime = isTimeHHMM(reminder.reminder_time) ? reminder.reminder_time : "09:00";
    if (reminder.reminder_type === "custom") {
      const occurrences = addOccurrencesByRepeat({
        fromDate: fromIso,
        toDate: toIso,
        seedDate: reminder.custom_date,
        repeatType: reminder.repeat_type || "none",
        reminderTime,
      });
      for (const occ of occurrences) {
        upcoming.push({
          reminder_id: reminder.id,
          title: reminder.title,
          message: reminder.message,
          reminder_type: reminder.reminder_type,
          reminder_time: reminderTime,
          trigger_date: occ.date,
          scheduled_at: occ.scheduled_at,
        });
      }
      continue;
    }

    for (const [isoDate, statuses] of Object.entries(statusDateMap)) {
      if (!statuses.includes(reminder.reminder_type)) continue;
      const targetDate = addUtcDays(parseIsoDateToUtc(isoDate), -Math.max(Number(reminder.days_before) || 0, 0));
      const targetIso = formatUtcDate(targetDate);
      if (targetIso < fromIso || targetIso > toIso) continue;
      upcoming.push({
        reminder_id: reminder.id,
        title: reminder.title,
        message: reminder.message,
        reminder_type: reminder.reminder_type,
        reminder_time: reminderTime,
        trigger_date: targetIso,
        scheduled_at: formatReminderDateTime(targetIso, reminderTime),
        based_on_date: isoDate,
      });
    }
  }

  upcoming.sort((a, b) => String(a.scheduled_at).localeCompare(String(b.scheduled_at)));
  return { upcoming, meta: { days: safeDays, from: fromIso, to: toIso, count: upcoming.length } };
}

async function getTrackerSummaryForUser({ userId, month }) {
  let targetMonth = month;
  if (!targetMonth) {
    const now = new Date();
    targetMonth = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  }

  const { data: setupData } = await supabase
    .from("period_tracker_settings")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  const { data: logsData } = await supabase
    .from("period_tracker_logs")
    .select("period_start_date, period_end_date, selected_dates, created_at")
    .eq("user_id", userId)
    .order("period_start_date", { ascending: false })
    .limit(24);

  let settings = setupData || null;
  if (!settings && logsData?.length) {
    const lastLog = logsData[0];
    settings = {
      last_period_start_date: lastLog.period_start_date,
      cycle_length_days: lastLog.cycle_length_days || 28,
      period_length_days: lastLog.period_length_days || 5,
      pre_period_days: 2,
      post_period_days: 2,
      ovulation_start_day: 11,
      ovulation_window_days: 5,
    };
  }
  if (!settings?.last_period_start_date) {
    return null;
  }

  const adaptive = deriveAdaptiveCycleMetricsFromLogs(logsData || []);
  const resolvedCycleLength = adaptive.adaptive_cycle_length_days || settings.cycle_length_days || 28;
  const resolvedPeriodLength = adaptive.adaptive_period_length_days || settings.period_length_days || 5;

  const data = buildPeriodTrackerSummary({
    isoMonth: targetMonth,
    lastPeriodStartDate: settings.last_period_start_date,
    cycleLengthDays: resolvedCycleLength,
    periodLengthDays: resolvedPeriodLength,
    prePeriodDays: settings.pre_period_days || 2,
    postPeriodDays: settings.post_period_days || 2,
    ovulationStartDay: settings.ovulation_start_day || 11,
    ovulationWindowDays: settings.ovulation_window_days || 5,
  });

  return {
    data,
    adaptive_metrics: {
      cycle_length_days: resolvedCycleLength,
      period_length_days: resolvedPeriodLength,
      samples_used_for_cycle: adaptive.samples_used_for_cycle,
      samples_used_for_period: adaptive.samples_used_for_period,
      source: adaptive.samples_used_for_cycle > 0 || adaptive.samples_used_for_period > 0 ? "historical_logs" : "setup_defaults",
    },
    legend: [
      { key: "pre_period", label: "Pre-Period" },
      { key: "period", label: "Period Days" },
      { key: "post_period", label: "Post-Period" },
      { key: "peak_ovulation", label: "Peak Ovulation" },
    ],
  };
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

app.get("/api/v1/period-tracker/setup", apiAuthRequired, async (req, res) => {
  const { data, error } = await supabase
    .from("period_tracker_settings")
    .select("*")
    .eq("user_id", req.user.id)
    .maybeSingle();

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  if (!data) {
    return res.status(404).json({ error: "Period tracker setup not found" });
  }
  return res.json({ data });
});

app.post("/api/v1/period-tracker/setup", apiAuthRequired, async (req, res) => {
  const {
    last_period_start_date,
    period_end_date,
    selected_dates,
    has_no_idea,
    cycle_length_days,
    period_length_days,
    pre_period_days,
    post_period_days,
    ovulation_start_day,
    ovulation_window_days,
    notes,
  } = req.body || {};

  const { start, end, normalized } = inferPeriodBounds({
    period_start_date: last_period_start_date,
    period_end_date,
    selected_dates,
  });

  const finalStart = start || formatUtcDate(new Date());
  if (!isIsoDate(finalStart)) {
    return res.status(400).json({ error: "last_period_start_date is required in YYYY-MM-DD format" });
  }
  if (end && !isIsoDate(end)) {
    return res.status(400).json({ error: "period_end_date must be YYYY-MM-DD format" });
  }

  const payload = {
    user_id: req.user.id,
    last_period_start_date: finalStart,
    period_end_date: end || null,
    selected_dates: normalized,
    has_no_idea: !!has_no_idea,
    cycle_length_days: Number.isFinite(Number(cycle_length_days)) ? Number(cycle_length_days) : 28,
    period_length_days: Number.isFinite(Number(period_length_days)) ? Number(period_length_days) : (normalized.length || 5),
    pre_period_days: Number.isFinite(Number(pre_period_days)) ? Number(pre_period_days) : 2,
    post_period_days: Number.isFinite(Number(post_period_days)) ? Number(post_period_days) : 2,
    ovulation_start_day: Number.isFinite(Number(ovulation_start_day)) ? Number(ovulation_start_day) : 11,
    ovulation_window_days: Number.isFinite(Number(ovulation_window_days)) ? Number(ovulation_window_days) : 5,
    notes: notes ? String(notes).trim() : null,
  };

  const { data, error } = await supabase
    .from("period_tracker_settings")
    .upsert(payload, { onConflict: "user_id" })
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to save setup" });
  }

  await supabase.from("period_tracker_logs").insert({
    user_id: req.user.id,
    period_start_date: payload.last_period_start_date,
    period_end_date: payload.period_end_date,
    selected_dates: payload.selected_dates,
    has_no_idea: payload.has_no_idea,
    cycle_length_days: payload.cycle_length_days,
    period_length_days: payload.period_length_days,
    notes: payload.notes,
  });

  return res.json({ data });
});

app.put("/api/v1/period-tracker/setup", apiAuthRequired, async (req, res) => {
  const updates = {};
  const {
    last_period_start_date,
    period_end_date,
    selected_dates,
    has_no_idea,
    cycle_length_days,
    period_length_days,
    pre_period_days,
    post_period_days,
    ovulation_start_day,
    ovulation_window_days,
    notes,
  } = req.body || {};

  if (last_period_start_date !== undefined) {
    if (!isIsoDate(last_period_start_date)) {
      return res.status(400).json({ error: "last_period_start_date must be YYYY-MM-DD format" });
    }
    updates.last_period_start_date = String(last_period_start_date);
  }
  if (period_end_date !== undefined) {
    if (period_end_date !== null && !isIsoDate(period_end_date)) {
      return res.status(400).json({ error: "period_end_date must be YYYY-MM-DD format or null" });
    }
    updates.period_end_date = period_end_date ? String(period_end_date) : null;
  }
  if (selected_dates !== undefined) {
    if (!Array.isArray(selected_dates) || selected_dates.some((d) => !isIsoDate(d))) {
      return res.status(400).json({ error: "selected_dates must be an array of YYYY-MM-DD strings" });
    }
    updates.selected_dates = normalizeSelectedDates(selected_dates);
  }
  if (has_no_idea !== undefined) updates.has_no_idea = !!has_no_idea;
  if (cycle_length_days !== undefined) updates.cycle_length_days = cycle_length_days === null ? null : Number(cycle_length_days);
  if (period_length_days !== undefined) updates.period_length_days = period_length_days === null ? null : Number(period_length_days);
  if (pre_period_days !== undefined) updates.pre_period_days = pre_period_days === null ? null : Number(pre_period_days);
  if (post_period_days !== undefined) updates.post_period_days = post_period_days === null ? null : Number(post_period_days);
  if (ovulation_start_day !== undefined) updates.ovulation_start_day = ovulation_start_day === null ? null : Number(ovulation_start_day);
  if (ovulation_window_days !== undefined) updates.ovulation_window_days = ovulation_window_days === null ? null : Number(ovulation_window_days);
  if (notes !== undefined) updates.notes = notes ? String(notes).trim() : null;

  const { data, error } = await supabase
    .from("period_tracker_settings")
    .update(updates)
    .eq("user_id", req.user.id)
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to update setup" });
  }

  return res.json({ data });
});

app.get("/api/v1/period-tracker/summary", apiAuthRequired, async (req, res) => {
  const month = req.query.month ? String(req.query.month) : null;
  let targetMonth = month;
  if (!targetMonth) {
    const now = new Date();
    targetMonth = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  }
  if (!isIsoMonth(targetMonth)) {
    return res.status(400).json({ error: "month must be in YYYY-MM format" });
  }

  let settings = null;
  const { data: setupData } = await supabase
    .from("period_tracker_settings")
    .select("*")
    .eq("user_id", req.user.id)
    .maybeSingle();
  settings = setupData || null;

  const { data: logsData } = await supabase
    .from("period_tracker_logs")
    .select("period_start_date, period_end_date, selected_dates, created_at")
    .eq("user_id", req.user.id)
    .order("period_start_date", { ascending: false })
    .limit(24);

  if (!settings) {
    const lastLog = logsData?.[0] || null;
    if (lastLog) {
      settings = {
        last_period_start_date: lastLog.period_start_date,
        cycle_length_days: lastLog.cycle_length_days || 28,
        period_length_days: lastLog.period_length_days || 5,
        pre_period_days: 2,
        post_period_days: 2,
        ovulation_start_day: 11,
        ovulation_window_days: 5,
      };
    }
  }

  if (!settings?.last_period_start_date) {
    return res.status(404).json({ error: "Period tracker setup not found. Complete setup first." });
  }

  const adaptive = deriveAdaptiveCycleMetricsFromLogs(logsData || []);
  const resolvedCycleLength = adaptive.adaptive_cycle_length_days || settings.cycle_length_days || 28;
  const resolvedPeriodLength = adaptive.adaptive_period_length_days || settings.period_length_days || 5;

  const summary = buildPeriodTrackerSummary({
    isoMonth: targetMonth,
    lastPeriodStartDate: settings.last_period_start_date,
    cycleLengthDays: resolvedCycleLength,
    periodLengthDays: resolvedPeriodLength,
    prePeriodDays: settings.pre_period_days || 2,
    postPeriodDays: settings.post_period_days || 2,
    ovulationStartDay: settings.ovulation_start_day || 11,
    ovulationWindowDays: settings.ovulation_window_days || 5,
  });

  return res.json({
    data: summary,
    adaptive_metrics: {
      cycle_length_days: resolvedCycleLength,
      period_length_days: resolvedPeriodLength,
      samples_used_for_cycle: adaptive.samples_used_for_cycle,
      samples_used_for_period: adaptive.samples_used_for_period,
      source: adaptive.samples_used_for_cycle > 0 || adaptive.samples_used_for_period > 0 ? "historical_logs" : "setup_defaults",
    },
    legend: [
      { key: "pre_period", label: "Pre-Period" },
      { key: "period", label: "Period Days" },
      { key: "post_period", label: "Post-Period" },
      { key: "peak_ovulation", label: "Peak Ovulation" },
    ],
  });
});

app.post("/api/v1/period-tracker/logs", apiAuthRequired, async (req, res) => {
  const {
    period_start_date,
    period_end_date,
    selected_dates,
    has_no_idea,
    cycle_length_days,
    period_length_days,
    notes,
  } = req.body || {};

  if (!period_start_date || !isIsoDate(period_start_date)) {
    return res.status(400).json({ error: "period_start_date is required in YYYY-MM-DD format" });
  }
  if (period_end_date && !isIsoDate(period_end_date)) {
    return res.status(400).json({ error: "period_end_date must be YYYY-MM-DD format" });
  }
  if (selected_dates && !Array.isArray(selected_dates)) {
    return res.status(400).json({ error: "selected_dates must be an array of YYYY-MM-DD strings" });
  }
  if (Array.isArray(selected_dates) && selected_dates.some((d) => !isIsoDate(d))) {
    return res.status(400).json({ error: "Each selected_dates value must be YYYY-MM-DD format" });
  }

  const payload = {
    user_id: req.user.id,
    period_start_date: String(period_start_date),
    period_end_date: period_end_date ? String(period_end_date) : null,
    selected_dates: Array.isArray(selected_dates) ? selected_dates : [],
    has_no_idea: !!has_no_idea,
    cycle_length_days: Number.isFinite(Number(cycle_length_days)) ? Number(cycle_length_days) : null,
    period_length_days: Number.isFinite(Number(period_length_days)) ? Number(period_length_days) : null,
    notes: notes ? String(notes).trim() : null,
  };

  const { data, error } = await supabase
    .from("period_tracker_logs")
    .insert(payload)
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to save period tracker data" });
  }

  return res.json({ data });
});

app.get("/api/v1/period-tracker/logs", apiAuthRequired, async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
  const offset = Math.max(Number(req.query.offset) || 0, 0);

  const { data, error } = await supabase
    .from("period_tracker_logs")
    .select("*")
    .eq("user_id", req.user.id)
    .order("period_start_date", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.json({ data: data || [], meta: { limit, offset } });
});

app.get("/api/v1/period-tracker/logs/:id", apiAuthRequired, async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("period_tracker_logs")
    .select("*")
    .eq("id", id)
    .eq("user_id", req.user.id)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: "Period tracker log not found" });
  }
  return res.json({ data });
});

app.put("/api/v1/period-tracker/logs/:id", apiAuthRequired, async (req, res) => {
  const { id } = req.params;
  const {
    period_start_date,
    period_end_date,
    selected_dates,
    has_no_idea,
    cycle_length_days,
    period_length_days,
    notes,
  } = req.body || {};

  const payload = {};

  if (period_start_date !== undefined) {
    if (!isIsoDate(period_start_date)) {
      return res.status(400).json({ error: "period_start_date must be YYYY-MM-DD format" });
    }
    payload.period_start_date = String(period_start_date);
  }

  if (period_end_date !== undefined) {
    if (period_end_date !== null && !isIsoDate(period_end_date)) {
      return res.status(400).json({ error: "period_end_date must be YYYY-MM-DD format or null" });
    }
    payload.period_end_date = period_end_date ? String(period_end_date) : null;
  }

  if (selected_dates !== undefined) {
    if (!Array.isArray(selected_dates) || selected_dates.some((d) => !isIsoDate(d))) {
      return res.status(400).json({ error: "selected_dates must be an array of YYYY-MM-DD strings" });
    }
    payload.selected_dates = selected_dates;
  }

  if (has_no_idea !== undefined) payload.has_no_idea = !!has_no_idea;
  if (cycle_length_days !== undefined) payload.cycle_length_days = cycle_length_days === null ? null : Number(cycle_length_days);
  if (period_length_days !== undefined) payload.period_length_days = period_length_days === null ? null : Number(period_length_days);
  if (notes !== undefined) payload.notes = notes ? String(notes).trim() : null;

  const { data, error } = await supabase
    .from("period_tracker_logs")
    .update(payload)
    .eq("id", id)
    .eq("user_id", req.user.id)
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to update period tracker log" });
  }

  return res.json({ data });
});

app.delete("/api/v1/period-tracker/logs/:id", apiAuthRequired, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from("period_tracker_logs")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.json({ ok: true });
});

app.post("/api/v1/period-tracker/symptoms", apiAuthRequired, async (req, res) => {
  const {
    track_date,
    symptoms,
    flow_intensity,
    pain_level,
    mood,
    notes,
  } = req.body || {};

  if (!track_date || !isIsoDate(track_date)) {
    return res.status(400).json({ error: "track_date is required in YYYY-MM-DD format" });
  }
  if (pain_level !== undefined && pain_level !== null) {
    const numericPain = Number(pain_level);
    if (!Number.isFinite(numericPain) || numericPain < 0 || numericPain > 10) {
      return res.status(400).json({ error: "pain_level must be a number between 0 and 10" });
    }
  }

  const payload = {
    user_id: req.user.id,
    track_date: String(track_date),
    symptoms: normalizeSymptomArray(symptoms),
    flow_intensity: flow_intensity ? String(flow_intensity).trim().toLowerCase() : null,
    pain_level: pain_level === undefined || pain_level === null ? null : Number(pain_level),
    mood: mood ? String(mood).trim() : null,
    notes: notes ? String(notes).trim() : null,
  };

  const { data, error } = await supabase
    .from("period_tracker_symptoms")
    .upsert(payload, { onConflict: "user_id,track_date" })
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to save symptom entry" });
  }
  return res.json({ data });
});

app.get("/api/v1/period-tracker/symptoms", apiAuthRequired, async (req, res) => {
  const from = req.query.from ? String(req.query.from) : null;
  const to = req.query.to ? String(req.query.to) : null;
  const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
  const offset = Math.max(Number(req.query.offset) || 0, 0);

  if (from && !isIsoDate(from)) {
    return res.status(400).json({ error: "from must be YYYY-MM-DD format" });
  }
  if (to && !isIsoDate(to)) {
    return res.status(400).json({ error: "to must be YYYY-MM-DD format" });
  }

  let query = supabase
    .from("period_tracker_symptoms")
    .select("*")
    .eq("user_id", req.user.id)
    .order("track_date", { ascending: false })
    .range(offset, offset + limit - 1);

  if (from) query = query.gte("track_date", from);
  if (to) query = query.lte("track_date", to);

  const { data, error } = await query;
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json({ data: data || [], meta: { limit, offset, from, to } });
});

app.get("/api/v1/period-tracker/symptoms/:id", apiAuthRequired, async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("period_tracker_symptoms")
    .select("*")
    .eq("id", id)
    .eq("user_id", req.user.id)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: "Symptom entry not found" });
  }
  return res.json({ data });
});

app.put("/api/v1/period-tracker/symptoms/:id", apiAuthRequired, async (req, res) => {
  const { id } = req.params;
  const {
    track_date,
    symptoms,
    flow_intensity,
    pain_level,
    mood,
    notes,
  } = req.body || {};

  const updates = {};
  if (track_date !== undefined) {
    if (!isIsoDate(track_date)) {
      return res.status(400).json({ error: "track_date must be YYYY-MM-DD format" });
    }
    updates.track_date = String(track_date);
  }
  if (symptoms !== undefined) {
    updates.symptoms = normalizeSymptomArray(symptoms);
  }
  if (flow_intensity !== undefined) {
    updates.flow_intensity = flow_intensity ? String(flow_intensity).trim().toLowerCase() : null;
  }
  if (pain_level !== undefined) {
    if (pain_level !== null) {
      const numericPain = Number(pain_level);
      if (!Number.isFinite(numericPain) || numericPain < 0 || numericPain > 10) {
        return res.status(400).json({ error: "pain_level must be a number between 0 and 10" });
      }
      updates.pain_level = numericPain;
    } else {
      updates.pain_level = null;
    }
  }
  if (mood !== undefined) updates.mood = mood ? String(mood).trim() : null;
  if (notes !== undefined) updates.notes = notes ? String(notes).trim() : null;

  const { data, error } = await supabase
    .from("period_tracker_symptoms")
    .update(updates)
    .eq("id", id)
    .eq("user_id", req.user.id)
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to update symptom entry" });
  }
  return res.json({ data });
});

app.delete("/api/v1/period-tracker/symptoms/:id", apiAuthRequired, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from("period_tracker_symptoms")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.json({ ok: true });
});

app.post("/api/v1/period-tracker/reminders", apiAuthRequired, async (req, res) => {
  const {
    reminder_type,
    title,
    message,
    reminder_time,
    days_before,
    custom_date,
    repeat_type,
    is_enabled,
  } = req.body || {};

  if (!isValidReminderType(reminder_type)) {
    return res.status(400).json({ error: "reminder_type must be one of: period, pre_period, post_period, peak_ovulation, custom" });
  }
  if (!title || !String(title).trim()) {
    return res.status(400).json({ error: "title is required" });
  }
  if (!isTimeHHMM(reminder_time || "09:00")) {
    return res.status(400).json({ error: "reminder_time must be in HH:MM format" });
  }
  const finalRepeat = repeat_type ? String(repeat_type) : "monthly";
  if (!isValidRepeatType(finalRepeat)) {
    return res.status(400).json({ error: "repeat_type must be one of: none, daily, weekly, monthly" });
  }
  if (reminder_type === "custom" && (!custom_date || !isIsoDate(custom_date))) {
    return res.status(400).json({ error: "custom_date is required in YYYY-MM-DD format for custom reminders" });
  }

  const payload = {
    user_id: req.user.id,
    reminder_type: String(reminder_type),
    title: String(title).trim(),
    message: message ? String(message).trim() : null,
    reminder_time: String(reminder_time || "09:00"),
    days_before: Number.isFinite(Number(days_before)) ? Number(days_before) : 0,
    custom_date: custom_date ? String(custom_date) : null,
    repeat_type: finalRepeat,
    is_enabled: is_enabled === undefined ? true : !!is_enabled,
  };

  const { data, error } = await supabase
    .from("period_tracker_reminders")
    .insert(payload)
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to create reminder" });
  }
  return res.json({ data });
});

app.get("/api/v1/period-tracker/reminders", apiAuthRequired, async (req, res) => {
  const { data, error } = await supabase
    .from("period_tracker_reminders")
    .select("*")
    .eq("user_id", req.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.json({ data: data || [] });
});

app.get("/api/v1/period-tracker/reminders/:id", apiAuthRequired, async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("period_tracker_reminders")
    .select("*")
    .eq("id", id)
    .eq("user_id", req.user.id)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: "Reminder not found" });
  }
  return res.json({ data });
});

app.put("/api/v1/period-tracker/reminders/:id", apiAuthRequired, async (req, res) => {
  const { id } = req.params;
  const {
    reminder_type,
    title,
    message,
    reminder_time,
    days_before,
    custom_date,
    repeat_type,
    is_enabled,
  } = req.body || {};
  const updates = {};

  if (reminder_type !== undefined) {
    if (!isValidReminderType(reminder_type)) {
      return res.status(400).json({ error: "reminder_type must be one of: period, pre_period, post_period, peak_ovulation, custom" });
    }
    updates.reminder_type = String(reminder_type);
  }
  if (title !== undefined) updates.title = String(title || "").trim();
  if (message !== undefined) updates.message = message ? String(message).trim() : null;
  if (reminder_time !== undefined) {
    if (!isTimeHHMM(reminder_time)) {
      return res.status(400).json({ error: "reminder_time must be in HH:MM format" });
    }
    updates.reminder_time = String(reminder_time);
  }
  if (days_before !== undefined) updates.days_before = Number.isFinite(Number(days_before)) ? Number(days_before) : 0;
  if (repeat_type !== undefined) {
    if (!isValidRepeatType(repeat_type)) {
      return res.status(400).json({ error: "repeat_type must be one of: none, daily, weekly, monthly" });
    }
    updates.repeat_type = String(repeat_type);
  }
  if (custom_date !== undefined) {
    if (custom_date !== null && !isIsoDate(custom_date)) {
      return res.status(400).json({ error: "custom_date must be YYYY-MM-DD format or null" });
    }
    updates.custom_date = custom_date ? String(custom_date) : null;
  }
  if (is_enabled !== undefined) updates.is_enabled = !!is_enabled;

  const { data, error } = await supabase
    .from("period_tracker_reminders")
    .update(updates)
    .eq("id", id)
    .eq("user_id", req.user.id)
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to update reminder" });
  }
  return res.json({ data });
});

app.delete("/api/v1/period-tracker/reminders/:id", apiAuthRequired, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from("period_tracker_reminders")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.json({ ok: true });
});

app.get("/api/v1/period-tracker/reminders/upcoming", apiAuthRequired, async (req, res) => {
  try {
    const { upcoming, meta } = await buildUpcomingReminderEventsForUser({
      userId: req.user.id,
      days: req.query.days,
    });
    return res.json({ data: upcoming, meta });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed to get upcoming reminders" });
  }
});

app.post("/api/v1/notifications/devices", apiAuthRequired, async (req, res) => {
  const { device_id, push_token, platform, app_version, timezone } = req.body || {};
  if (!device_id || !String(device_id).trim()) {
    return res.status(400).json({ error: "device_id is required" });
  }
  if (!push_token || !String(push_token).trim()) {
    return res.status(400).json({ error: "push_token is required" });
  }

  const payload = {
    user_id: req.user.id,
    device_id: String(device_id).trim(),
    push_token: String(push_token).trim(),
    platform: platform ? String(platform).trim().toLowerCase() : null,
    app_version: app_version ? String(app_version).trim() : null,
    timezone: timezone ? String(timezone).trim() : null,
    is_active: true,
    last_seen_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("notification_devices")
    .upsert(payload, { onConflict: "user_id,device_id" })
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to register device token" });
  }
  return res.json({ data });
});

app.get("/api/v1/notifications/devices", apiAuthRequired, async (req, res) => {
  const { data, error } = await supabase
    .from("notification_devices")
    .select("*")
    .eq("user_id", req.user.id)
    .order("last_seen_at", { ascending: false });

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.json({ data: data || [] });
});

app.delete("/api/v1/notifications/devices/:id", apiAuthRequired, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from("notification_devices")
    .update({ is_active: false, last_seen_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.json({ ok: true });
});

app.post("/api/v1/period-tracker/reminders/dispatch/queue", apiAuthRequired, async (req, res) => {
  const days = Math.min(Math.max(Number(req.body?.days) || 2, 1), 30);
  try {
    const { upcoming } = await buildUpcomingReminderEventsForUser({
      userId: req.user.id,
      days,
    });

    const now = new Date();
    const futureLimit = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    const dueEvents = upcoming.filter((item) => {
      const when = new Date(item.scheduled_at);
      return when >= now && when <= futureLimit;
    });

    if (!dueEvents.length) {
      return res.json({ data: [], meta: { queued: 0 } });
    }

    const payload = dueEvents.map((item) => ({
      user_id: req.user.id,
      reminder_id: item.reminder_id,
      reminder_type: item.reminder_type,
      title: item.title,
      message: item.message,
      trigger_date: item.trigger_date,
      scheduled_at: item.scheduled_at,
      status: "pending",
    }));

    const { data, error } = await supabase
      .from("notification_dispatch_queue")
      .upsert(payload, { onConflict: "user_id,reminder_id,scheduled_at" })
      .select("*");

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.json({ data: data || [], meta: { queued: (data || []).length } });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed to queue reminders" });
  }
});

app.get("/api/v1/period-tracker/reminders/dispatch/queue", apiAuthRequired, async (req, res) => {
  const status = req.query.status ? String(req.query.status) : null;
  const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
  const offset = Math.max(Number(req.query.offset) || 0, 0);

  let query = supabase
    .from("notification_dispatch_queue")
    .select("*")
    .eq("user_id", req.user.id)
    .order("scheduled_at", { ascending: true })
    .range(offset, offset + limit - 1);

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.json({ data: data || [], meta: { limit, offset, status } });
});

app.get("/api/v1/notifications/settings", apiAuthRequired, async (req, res) => {
  const { data, error } = await supabase
    .from("notification_settings")
    .select("*")
    .eq("user_id", req.user.id)
    .maybeSingle();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (data) return res.json({ data });

  const defaultSettings = {
    user_id: req.user.id,
    period_reminder_enabled: true,
    ovulation_reminder_enabled: true,
    daily_insights_enabled: true,
    daily_period_reminder_enabled: false,
    app_updates_enabled: true,
  };

  const { data: inserted, error: insertError } = await supabase
    .from("notification_settings")
    .insert(defaultSettings)
    .select("*")
    .single();

  if (insertError || !inserted) {
    return res.status(400).json({ error: insertError?.message || "Failed to initialize notification settings" });
  }
  return res.json({ data: inserted });
});

app.put("/api/v1/notifications/settings", apiAuthRequired, async (req, res) => {
  const payload = {};
  const fields = [
    "period_reminder_enabled",
    "ovulation_reminder_enabled",
    "daily_insights_enabled",
    "daily_period_reminder_enabled",
    "app_updates_enabled",
  ];
  for (const key of fields) {
    if (req.body?.[key] !== undefined) {
      payload[key] = !!req.body[key];
    }
  }

  const { data, error } = await supabase
    .from("notification_settings")
    .upsert({ user_id: req.user.id, ...payload }, { onConflict: "user_id" })
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to update notification settings" });
  }
  return res.json({ data });
});

app.post("/api/v1/support/reports", apiAuthRequired, upload.single("file"), async (req, res) => {
  const issueTypesRaw = req.body?.issue_types;
  const details = String(req.body?.details || "").trim();

  if (!details) {
    return res.status(400).json({ error: "details is required" });
  }

  let issueTypes = [];
  if (issueTypesRaw) {
    try {
      if (String(issueTypesRaw).trim().startsWith("[")) {
        issueTypes = JSON.parse(String(issueTypesRaw));
      } else {
        issueTypes = String(issueTypesRaw)
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    } catch {
      issueTypes = [];
    }
  }

  let mediaUrl = null;
  let mediaType = null;
  if (req.file) {
    const mime = String(req.file.mimetype || "").toLowerCase();
    const isImage = mime.startsWith("image/");
    const isVideo = mime.startsWith("video/");
    if (!isImage && !isVideo) {
      return res.status(400).json({ error: "Only image/video files are allowed" });
    }
    try {
      const uploaded = await uploadBufferToMediaBucket(req.file);
      mediaUrl = uploaded.url;
      mediaType = isImage ? "image" : "video";
    } catch (error) {
      return res.status(400).json({ error: error.message || "Media upload failed" });
    }
  }

  const { data, error } = await supabase
    .from("support_reports")
    .insert({
      user_id: req.user.id,
      issue_types: issueTypes,
      details,
      media_url: mediaUrl,
      media_type: mediaType,
      status: "open",
    })
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to submit report" });
  }
  return res.json({ data });
});

app.get("/api/v1/support/reports/my", apiAuthRequired, async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
  const offset = Math.max(Number(req.query.offset) || 0, 0);
  const { data, error } = await supabase
    .from("support_reports")
    .select("*")
    .eq("user_id", req.user.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.json({ data: data || [], meta: { limit, offset } });
});

app.get("/api/v1/support/reports", apiAuthRequired, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
  const offset = Math.max(Number(req.query.offset) || 0, 0);
  const status = req.query.status ? String(req.query.status).trim().toLowerCase() : "";

  let query = supabase
    .from("support_reports")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const userIds = Array.from(new Set((data || []).map((row) => row.user_id).filter(Boolean)));
  let usersMap = {};
  if (userIds.length) {
    const { data: usersData } = await supabase.from("users").select("id, email, role").in("id", userIds);
    usersMap = Object.fromEntries((usersData || []).map((u) => [u.id, u]));
  }

  const rows = (data || []).map((row) => ({ ...row, user: usersMap[row.user_id] || null }));
  return res.json({ data: rows, meta: { limit, offset, status: status || null } });
});

app.put("/api/v1/support/reports/:id", apiAuthRequired, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  const { id } = req.params;
  const status = req.body?.status ? String(req.body.status).trim().toLowerCase() : null;
  const allowed = ["open", "in_progress", "resolved", "closed"];
  if (status && !allowed.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const payload = {};
  if (status) payload.status = status;

  const { data, error } = await supabase
    .from("support_reports")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to update report" });
  }
  return res.json({ data });
});

app.post("/api/v1/cycle-snaps/media/upload", apiAuthRequired, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const mime = String(req.file.mimetype || "").toLowerCase();
  if (!mime.startsWith("image/") && !mime.startsWith("video/")) {
    return res.status(400).json({ error: "Only image/video files are allowed" });
  }
  try {
    const result = await uploadBufferToMediaBucket(req.file);
    return res.json({
      url: result.url,
      path: result.path,
      media_type: mime.startsWith("image/") ? "image" : "video",
    });
  } catch (err) {
    return res.status(400).json({ error: err.message || "Upload failed" });
  }
});

app.post("/api/v1/cycle-snaps", apiAuthRequired, async (req, res) => {
  const title = String(req.body?.title || "").trim();
  const description = String(req.body?.description || "").trim();
  const mediaUrl = String(req.body?.media_url || "").trim();
  const mediaType = String(req.body?.media_type || "").trim().toLowerCase();

  if (!description) {
    return res.status(400).json({ error: "description is required" });
  }
  if (!mediaUrl) {
    return res.status(400).json({ error: "media_url is required" });
  }
  if (!["image", "video"].includes(mediaType)) {
    return res.status(400).json({ error: "media_type must be image or video" });
  }

  const { data, error } = await supabase
    .from("cycle_snaps")
    .insert({
      user_id: req.user.id,
      title: title || null,
      description,
      media_url: mediaUrl,
      media_type: mediaType,
      status: "pending",
    })
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to create cycle snap" });
  }
  return res.json({ data });
});

app.get("/api/v1/cycle-snaps", apiAuthOptional, async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
  const offset = Math.max(Number(req.query.offset) || 0, 0);
  const mine = String(req.query.mine || "").toLowerCase() === "true";
  const status = req.query.status ? String(req.query.status).toLowerCase() : "";

  let query = supabase
    .from("cycle_snaps")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (mine) {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    query = query.eq("user_id", req.user.id);
  } else if (req.user?.role === "admin" && status) {
    query = query.eq("status", status);
  } else if (req.user?.role === "admin") {
    // admin can view all statuses by default
  } else {
    query = query.eq("status", "approved");
  }

  const { data, error } = await query;
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const userIds = Array.from(new Set((data || []).map((row) => row.user_id).filter(Boolean)));
  let usersMap = {};
  if (userIds.length) {
    const { data: usersData } = await supabase.from("users").select("id, email").in("id", userIds);
    usersMap = Object.fromEntries((usersData || []).map((u) => [u.id, u]));
  }

  const rows = (data || []).map((row) => ({ ...row, author: usersMap[row.user_id] || null }));
  return res.json({ data: rows, meta: { limit, offset, mine, status: status || null } });
});

app.get("/api/v1/cycle-snaps/:id", apiAuthOptional, async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("cycle_snaps").select("*").eq("id", id).maybeSingle();
  if (error || !data) {
    return res.status(404).json({ error: "Cycle snap not found" });
  }
  if (data.status !== "approved" && data.user_id !== req.user?.id && req.user?.role !== "admin") {
    return res.status(403).json({ error: "Not allowed" });
  }

  const { data: author } = await supabase.from("users").select("id, email").eq("id", data.user_id).maybeSingle();
  return res.json({ data: { ...data, author: author || null } });
});

app.put("/api/v1/cycle-snaps/:id/status", apiAuthRequired, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  const status = String(req.body?.status || "").trim().toLowerCase();
  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "status must be pending, approved, or rejected" });
  }

  const { data, error } = await supabase
    .from("cycle_snaps")
    .update({
      status,
      reviewed_by: req.user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", req.params.id)
    .select("*")
    .single();

  if (error || !data) {
    return res.status(400).json({ error: error?.message || "Failed to update cycle snap status" });
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

app.get("/api/admin/period-tracker/users", authRequired, async (_req, res) => {
  const { data: customers, error } = await supabase
    .from("customers")
    .select("id, user_id, name, phone, status, created_at, users:user_id (email, role, is_active)")
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });

  const userIds = (customers || []).map((item) => item.user_id).filter(Boolean);
  const latestSetupByUser = {};
  const latestLogByUser = {};

  if (userIds.length) {
    const { data: setups } = await supabase
      .from("period_tracker_settings")
      .select("user_id, last_period_start_date, cycle_length_days, period_length_days, updated_at")
      .in("user_id", userIds);

    for (const row of setups || []) {
      latestSetupByUser[row.user_id] = row;
    }

    const { data: logs } = await supabase
      .from("period_tracker_logs")
      .select("id, user_id, period_start_date, period_end_date, created_at")
      .in("user_id", userIds)
      .order("period_start_date", { ascending: false });

    for (const row of logs || []) {
      if (!latestLogByUser[row.user_id]) {
        latestLogByUser[row.user_id] = row;
      }
    }
  }

  const rows = (customers || []).map((item) => ({
    ...item,
    latest_setup: latestSetupByUser[item.user_id] || null,
    latest_log: latestLogByUser[item.user_id] || null,
  }));
  return res.json({ data: rows });
});

app.get("/api/admin/period-tracker/user/:userId/details", authRequired, async (req, res) => {
  const { userId } = req.params;
  const month = req.query.month ? String(req.query.month) : undefined;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id, email, role, is_active, created_at")
    .eq("id", userId)
    .maybeSingle();

  if (userError) return res.status(400).json({ error: userError.message });
  if (!userData) return res.status(404).json({ error: "User not found" });

  const { data: customerData } = await supabase
    .from("customers")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  const [
    setupRes,
    logsRes,
    symptomsRes,
    remindersRes,
    notifSettingsRes,
  ] = await Promise.all([
    supabase.from("period_tracker_settings").select("*").eq("user_id", userId).maybeSingle(),
    supabase
      .from("period_tracker_logs")
      .select("*")
      .eq("user_id", userId)
      .order("period_start_date", { ascending: false })
      .limit(100),
    supabase
      .from("period_tracker_symptoms")
      .select("*")
      .eq("user_id", userId)
      .order("track_date", { ascending: false })
      .limit(100),
    supabase
      .from("period_tracker_reminders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
    supabase.from("notification_settings").select("*").eq("user_id", userId).maybeSingle(),
  ]);

  const summary = await getTrackerSummaryForUser({ userId, month }).catch(() => null);

  return res.json({
    data: {
      user: userData,
      customer: customerData || null,
      setup: setupRes.error ? null : setupRes.data || null,
      logs: logsRes.error ? [] : logsRes.data || [],
      symptoms: symptomsRes.error ? [] : symptomsRes.data || [],
      reminders: remindersRes.error ? [] : remindersRes.data || [],
      notification_settings: notifSettingsRes.error ? null : notifSettingsRes.data || null,
      summary: summary || null,
      warnings: [
        setupRes.error ? `period_tracker_settings: ${setupRes.error.message}` : null,
        logsRes.error ? `period_tracker_logs: ${logsRes.error.message}` : null,
        symptomsRes.error ? `period_tracker_symptoms: ${symptomsRes.error.message}` : null,
        remindersRes.error ? `period_tracker_reminders: ${remindersRes.error.message}` : null,
        notifSettingsRes.error ? `notification_settings: ${notifSettingsRes.error.message}` : null,
      ].filter(Boolean),
    },
  });
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
