import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/shared/drizzle/schemas/*.schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
  },
} satisfies Config;
