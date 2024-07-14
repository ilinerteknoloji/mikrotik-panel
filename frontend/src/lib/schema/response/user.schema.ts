import { z } from "zod";
import { createResponseSchema } from ".";

export const userDetailsSchema = z.object({
  id: z.number(),
  userId: z.number(),
  isEmailVerified: z.boolean(),
  isPhoneNumberVerified: z.boolean(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

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
export const usersResponseSchema = createResponseSchema(usersSchema);
export type UsersResponseSchema = z.infer<typeof usersResponseSchema>;

export const totalUsersSchema = z.array(
  z.object({
    total_count: z.preprocess((x) => Number(x), z.number()),
    admin_count: z.preprocess((x) => Number(x), z.number()),
    active_admin: z.preprocess((x) => Number(x), z.number()),
    passive_admin: z.preprocess((x) => Number(x), z.number()),
    user_count: z.preprocess((x) => Number(x), z.number()),
    active_user: z.preprocess((x) => Number(x), z.number()),
    passive_user: z.preprocess((x) => Number(x), z.number()),
  }),
);
export const totalUsersResponseSchema = createResponseSchema(totalUsersSchema);
export type TotalUsersResponseSchema = z.infer<typeof totalUsersResponseSchema>;
