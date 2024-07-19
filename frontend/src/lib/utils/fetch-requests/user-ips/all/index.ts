import { FormAction } from "@/lib/types";
import { UserIpsPageSearchParams } from "@/lib/types/admin/user-ips-page";
import { fetchBackEnd } from "../..";
import { searchParamsToText } from "@/lib/utils/search-params-to-text";
import {
  userIpsResponseSchema,
  UserIpsSchema,
} from "@/lib/schema/response/user-ips/user-ips.schema";

export async function fetchUserIps(
  searchParams: UserIpsPageSearchParams,
): Promise<FormAction<UserIpsSchema>> {
  try {
    const response = await fetchBackEnd(
      `user-ips?${searchParamsToText(searchParams)}&isDashboardPage=true`,
    );
    if (!response.status) throw new Error(response.message);
    const parsed = userIpsResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
