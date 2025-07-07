// /** @type { import("drizzle-kit").Config } */
// export default {
//   schema: "./configs/schema.js",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: "postgresql://neondb_owner:npg_s5AxjU3DIaiR@ep-icy-paper-a8v2b2z1-pooler.eastus2.azure.neon.tech/autoBazar?sslmode=require&channel_binding=require",
//   },
// };

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.VITE_DATABASE_URL,
  },
  verbose: true,
  strict: true,
  port: 4984, // Use a different port
});