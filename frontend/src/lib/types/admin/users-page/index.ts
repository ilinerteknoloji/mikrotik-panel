export type UsersPageSearchParams = {
  page: number;
  limit?: number;
  search?: string;
  role?: "user" | "admin";
  status?: boolean;
};
