import { z } from "zod";
import { ipCategorySchema } from "../firewall/ip-categories.schema";
import { userSchema } from "../user/user.schema";
import { createResponseSchema } from "..";

export const userIpSchema = z.object({
  id: z.number(),
  ip: z.string(),
  status: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: userSchema,
  addressList: z.array(
    z.object({
      mikrotikId: z.string(),
      address: z.object({
        id: z.number(),
        status: z.boolean(),
        createdAt: z.string(),
        updatedAt: z.string(),
      }),
      ipCategory: ipCategorySchema,
    }),
  ),
});
export type UserIpSchema = z.infer<typeof userIpSchema>;

const userIpsSchema = z.array(userIpSchema);
export type UserIpsSchema = z.infer<typeof userIpsSchema>;
export const userIpsResponseSchema = createResponseSchema(userIpsSchema);
