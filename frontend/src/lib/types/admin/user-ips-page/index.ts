import { dataTableSearchParamType } from "@/components/admin/data-table/search-params.type";
import { UserIpSchema } from "@/lib/schema/response/user-ips/user-ips.schema";
import { Prettify } from "../../pretiffy.type";

export type UserIpsPageSearchParams = Prettify<
  dataTableSearchParamType & {
    "order-by"?: keyof UserIpSchema;
  }
>;
