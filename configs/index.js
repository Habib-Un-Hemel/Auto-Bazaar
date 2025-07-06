import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!import.meta.env.VITE_DATABASE_URL) {
  throw new Error(
    "Environment variable VITE_DATABASE_URL is not set. Please set it in your .env.local file."
  );
}

const sql = neon(import.meta.env.VITE_DATABASE_URL);
export const db = drizzle(sql, { schema });
