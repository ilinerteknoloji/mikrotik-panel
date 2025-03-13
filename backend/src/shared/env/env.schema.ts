import {z} from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .optional()
    .default("development"),
  PORT: z.coerce.number().optional().default(4000),
  DATABASE_URL: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
  JWT_ALGORITHM: z
    .enum(["RS256", "RS384", "RS512"])
    .optional()
    .default("RS256"),
  JWT_ACCESS_TOKEN_EXPIRATION: z.string().optional().default("2h"),
  JWT_REFRESH_TOKEN_EXPIRATION: z.string().optional().default("15 days"),
  MIKROTIK_HOST: z.string(),
  MIKROTIK_USERNAME: z.string(),
  MIKROTIK_PASSWORD: z.string(),
  CLOUDNS_MAX_AGES: z.coerce.number().default(7 * 24 * 60 * 60 * 1000),
  MAIL_USERNAME: z.string(),
  MAIL_EMAIL: z.string(),
  MAIL_PASSWORD: z.string(),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number(),
  FRONTEND_URL: z.string().url(),
});

export type EnvSchemaType = z.infer<typeof envSchema>;
