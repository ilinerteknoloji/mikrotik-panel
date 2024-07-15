import { z } from "zod";
import { userDetailsSchema } from "./user-detail.schema";
import { createResponseSchema } from "..";

export const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: z.boolean().optional(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  details: userDetailsSchema.optional(),
});
export type UserSchema = z.infer<typeof userSchema>;

export const userResponseSchema = createResponseSchema(userSchema);

const usersSchema = z.array(userSchema);
export type UsersSchema = z.infer<typeof usersSchema>;
export const usersResponseSchema = createResponseSchema(usersSchema);
export type UsersResponseSchema = z.infer<typeof usersResponseSchema>;
