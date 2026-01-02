import { z } from "zod";

export const updateProfileFormSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  username: z.string().min(3).max(50),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
});

export type UpdateProfileFormSchema = z.infer<typeof updateProfileFormSchema>;
