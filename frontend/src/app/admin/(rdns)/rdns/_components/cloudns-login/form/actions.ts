"use server";

import { FormAction } from "@/lib/types";
import { CloudnsLoginFormSchema } from "./cloudns-loginschema";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { cookies } from "next/headers";
import { env } from "@/lib/schema/env";
import { z } from "zod";

export async function cloudnsLogin(
  values: CloudnsLoginFormSchema,
): Promise<FormAction<string>> {
  try {
    const response = await fetchBackEnd("/rdns-records/cloudns-login", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (!response.status) throw new Error(response.message);
    const schema = z.object({ response: z.object({ message: z.string() }) });
    const data = schema.parse(response.data);
    cookies().set("cd", data.response.message, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: env.MAX_AGE,
    });
    return {
      status: true,
      data: "Success",
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
