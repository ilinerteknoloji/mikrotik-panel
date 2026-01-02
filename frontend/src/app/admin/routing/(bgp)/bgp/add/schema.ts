import { z } from "zod";

export const localRoleValues = [
  "ebgp",
  "ebgp-customer",
  "ebgp-peer",
  "ebgp-provider",
  "ebgp-rs",
  "ebgp-rs-client",
  "ibgp",
  "ibgp-rr",
  "ibgp-rr-client",
] as const;

export const createBgpConnectionFormSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  connect: z.boolean().optional().default(true),
  listen: z.boolean().optional().default(true),
  localAddress: z.string().optional().default("::"),
  localPort: z.coerce.number().int().min(0).max(65535).optional().default(179),
  localRole: z.enum(localRoleValues),
  localTtl: z.coerce.number().int().min(1).max(255).optional(),
  remoteAddress: z.string().optional().default("::"),
  remotePort: z.coerce.number().int().min(0).max(65535).optional().default(179),
  remoteAs: z.coerce.number().int().optional(),
  allowedAs: z
    .string()
    .optional()
    .refine((value) => {
      if (value === "") return true;
      return (value ?? "").split(",").every((as) => /^\d+$/.test(as));
    }),
  remoteTtl: z.coerce.number().int().min(1).max(255).optional(),
  tcpMd5Key: z.string().optional(),
  templates: z.string().optional().default("default"),
});
export type CreateBgpConnectionFormSchema = z.infer<
  typeof createBgpConnectionFormSchema
>;
