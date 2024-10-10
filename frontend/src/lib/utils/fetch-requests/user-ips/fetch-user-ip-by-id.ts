"use server";

import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "..";
import {
  userIpResponseSchema,
  UserIpSchema,
  userIpSchema,
} from "@/lib/schema/response/user-ips/user-ips.schema";
import { parse } from "path";

export async function fetchUserIpById(
  id: string,
): Promise<FormAction<UserIpSchema>> {
  try {
    const response = await fetchBackEnd(`/user-ips/${id}`);
    if (!response.status) throw new Error(response.message);
    const parsed = userIpResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.response.toString());
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
