"use server";

import {
  totalUsersResponseSchema,
  TotalUsersSchema,
} from "@/lib/schema/response/user.schema";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "../..";

export async function fetchUserCount(): Promise<FormAction<TotalUsersSchema>> {
  try {
    const response = await fetchBackEnd("users/count");
    if (!response.status) throw new Error(response.message);
    const parsedUsers = totalUsersResponseSchema.parse(response.data);
    if (!parsedUsers.status) throw new Error(parsedUsers.error);
    return {
      status: true,
      data: parsedUsers.response,
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
