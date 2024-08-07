import { z } from "zod";

export const ipAddressesFormSchema = z.object({
  address: z.string().min(1),
  // advertise: z.boolean().optional().default(false),
  comment: z.string().optional(),
  disabled: z.boolean().optional().default(false),
  // eui64: z.boolean().optional().default(false),
  // fromPool: z.string().optional(),
  // noDad: z.boolean().optional().default(false),
  interface: z.string(),
});
export type IpAddressesFormSchema = z.infer<typeof ipAddressesFormSchema>;
