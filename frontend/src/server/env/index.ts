import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  BACKEND_URL: z.string().default("http://localhost:4000"),
  NEXTAUTH_SECRET: z.string().default("secret"),
});

export const env = envSchema.parse(process.env);
