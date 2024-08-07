import { z } from "zod";
import { createResponseSchema } from "..";

export const arpSchema = z.object({
  ".id": z.string(),
  DHCP: z.coerce.boolean(),
  address: z.string(),
  complete: z.coerce.boolean(),
  disabled: z.coerce.boolean(),
  dynamic: z.coerce.boolean(),
  interface: z.string(),
  invalid: z.coerce.boolean(),
  "mac-address": z.string().optional(),
  published: z.coerce.boolean(),
  status: z
    .enum([
      "delay",
      "failed",
      "incomplete",
      "permanent",
      "probe",
      "reachable",
      "stale",
    ])
    .optional(),
});
export type ArpSchema = z.infer<typeof arpSchema>;
export const arpResponseSchema = createResponseSchema(arpSchema);

export const arpsSchema = z.array(arpSchema);
export type ArpsSchema = z.infer<typeof arpsSchema>;
export const arpsResponseSchema = createResponseSchema(arpsSchema);
