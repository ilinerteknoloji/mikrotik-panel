"use server";

import { env } from "@/lib/schema/env";
import { FormAction } from "@/lib/types";

export async function fetchBackEndClient(
  accessToken: string,
  path: string,
  request: RequestInit = { method: "GET" },
): Promise<FormAction<unknown>> {
  try {
    const url = new URL(path, env.BACKEND_URL);
    const response = await fetch(url, {
      ...request,
      headers: {
        ...request.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await response.json();
    return { status: true, data: json };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
