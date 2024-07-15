import { FormAction } from "@/lib/types";
import { UsersPageSearchParams } from "@/lib/types/admin/users-page";
import { searchParamsToText } from "@/lib/utils/search-params-to-text";
import { fetchBackEnd } from "../..";
import {
  usersResponseSchema,
  UsersSchema,
} from "@/lib/schema/response/user/user.schema";

export async function fetchAllUsers(
  searchParams: UsersPageSearchParams,
): Promise<FormAction<UsersSchema>> {
  try {
    const response = await fetchBackEnd(
      `users?${searchParamsToText(searchParams)}`,
    );
    if (!response.status) throw new Error(response.message);
    const parsed = usersResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
