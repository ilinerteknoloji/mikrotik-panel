import { z } from "zod";

export const addressListSchema = z.object({
  ".id": z.string(),
  address: z.string(),
  list: z.string(),
  disabled: z.string(),
  dynamic: z.string(),
  "creation-time": z.string(),
});
