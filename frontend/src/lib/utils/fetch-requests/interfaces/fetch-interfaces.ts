"use server";

import { authConfig } from "@/app/api/(auth)/auth/[...nextauth]/auth.config";
import { env } from "@/lib/schema/env";
import {
  InterfaceItem,
  interfacesResponseSchema,
} from "@/lib/schema/response/interfaces";
import { FormAction } from "@/lib/types";
import { getServerSession } from "next-auth";

export async function fetchInterfaces(): Promise<
  FormAction<Array<InterfaceItem>>
> {
  try {
    const session = await getServerSession(authConfig);
    const interfacesResponse = await fetch(`${env.BACKEND_URL}/interface`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const interfacesJson = await interfacesResponse.json();
    const parsedInterfaces = interfacesResponseSchema.safeParse(interfacesJson);
    if (!parsedInterfaces.success)
      throw new Error(parsedInterfaces.error.message);
    else if (!parsedInterfaces.data.status)
      throw new Error(parsedInterfaces.data.error);
    const { response } = parsedInterfaces.data;
    return {
      status: true,
      data: response,
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
