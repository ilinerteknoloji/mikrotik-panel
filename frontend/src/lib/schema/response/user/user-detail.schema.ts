import { z } from "zod";

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
