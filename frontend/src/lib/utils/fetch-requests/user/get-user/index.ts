import {
  userResponseSchema,
  UserSchema,
} from "@/lib/schema/response/user/user.schema";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "../..";

export async function getUserByUsernameOrId(
  usernameOrId: string,
): Promise<FormAction<UserSchema>> {
  try {
    const response = await fetchBackEnd(`/users/${usernameOrId}`);
    if (!response.status) throw new Error(response.message);
    const parsed = userResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
