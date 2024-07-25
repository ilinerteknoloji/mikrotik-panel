import {
  usernamesResponseSchema,
  UsernamesSchema,
} from "@/lib/schema/response/user/user.schema";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "../..";

export async function fetchUsernames(): Promise<FormAction<UsernamesSchema>> {
  try {
    const response = await fetchBackEnd(`users/usernames`);
    if (!response.status) return response;
    const parsed = usernamesResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
