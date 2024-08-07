import { z } from "zod";
import { createResponseSchema } from "..";

export const ipAddressSchema = z.object({
  ".id": z.string(),
  "actual-interface": z.string().optional(),
  address: z.string(),
  disabled: z.coerce.boolean(),
  dynamic: z.coerce.boolean().optional(),
  interface: z.string(),
  invalid: z.coerce.boolean().optional(),
  network: z.string(),
  global: z.coerce.boolean().optional(),
  "link-local": z.coerce.boolean().optional(),
  deprecated: z.coerce.boolean().optional(),
  slave: z.coerce.boolean().optional(),
});
export type IpAddressSchema = z.infer<typeof ipAddressSchema>;
export const ipAddressResponseSchema = createResponseSchema(ipAddressSchema);

export const ipAddressesSchema = z.array(ipAddressSchema);
export type IpAddressesSchema = z.infer<typeof ipAddressesSchema>;
export const ipAddressesResponseSchema =
  createResponseSchema(ipAddressesSchema);
