import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: "server/.env.server" });

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error("Usage: node server/createAdmin.js <email> <password>");
  process.exit(1);
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env.server");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const hash = await bcrypt.hash(password, 10);

const { data, error } = await supabase
  .from("users")
  .insert({
    email,
    password_hash: hash,
    role: "admin",
    is_active: true,
  })
  .select("*")
  .single();

if (error) {
  console.error("Failed to create user:", error.message);
  process.exit(1);
}

console.log("Admin created:", data.email);
