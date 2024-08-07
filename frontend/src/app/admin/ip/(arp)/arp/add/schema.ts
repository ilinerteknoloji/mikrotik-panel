import { z } from "zod";

export const arpFormSchema = z.object({
  comment: z.string(),
  address: z.string().min(1),
  interface: z.string().min(1),
  macAddress: z.string(),
  published: z.boolean().optional().default(false),
});
export type ArpFormSchema = z.infer<typeof arpFormSchema>;
