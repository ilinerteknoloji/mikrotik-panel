import { UserSchema } from "@/lib/schema/response/user/user.schema";
import { Prettify } from "../../pretiffy.type";
import { dataTableSearchParamType } from "@/components/admin/data-table/search-params.type";

export type UsersPageSearchParams = Prettify<
  dataTableSearchParamType & {
    "order-by"?: keyof UserSchema;
    role?: "user" | "admin";
  }
>;
