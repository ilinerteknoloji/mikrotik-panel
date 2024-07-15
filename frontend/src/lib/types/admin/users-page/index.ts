import { UserSchema } from "@/lib/schema/response/user/user.schema";

export type UsersPageSearchParams = {
  page: number;
  limit?: number;
  search?: string;
  role?: "user" | "admin";
  status?: boolean;
  "order-by"?: keyof UserSchema;
};
