"use server";

import { authConfig } from "@/app/api/(auth)/auth/[...nextauth]/auth.config";
import { env } from "@/lib/schema/env";
import { FormAction } from "@/lib/types";
import { getServerSession } from "next-auth";

export async function fetchBackEnd(
  path: string,
  request: RequestInit = { method: "GET" },
): Promise<FormAction<unknown>> {
  try {
    const session = await getServerSession(authConfig);
    if (!session) throw new Error("Session not found");
    const url = new URL(path, env.BACKEND_URL);
    const response = await fetch(url, {
      ...request,
      headers: {
        ...request.headers,
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) console.log(json);
    return { status: true, data: json };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
