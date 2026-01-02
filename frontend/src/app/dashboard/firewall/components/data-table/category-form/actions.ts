"use server";

import { authConfig } from "@/app/api/(auth)/auth/[...nextauth]/auth.config";
import { env } from "@/lib/schema/env";
import {
  ipCategoriesResponseSchema,
  IpCategoriesSchema,
} from "@/lib/schema/response/firewall/ip-categories.schema";
import { FormAction } from "@/lib/types";
import { getServerSession } from "next-auth";

export async function getCategories(): Promise<FormAction<IpCategoriesSchema>> {
  try {
    const session = await getServerSession(authConfig);
    const ipCategoriesResponse = await fetch(
      `${env.BACKEND_URL}/ip-categories`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );
    const ipCategoriesJson = await ipCategoriesResponse.json();
    const parsedIpCategories =
      ipCategoriesResponseSchema.safeParse(ipCategoriesJson);
    if (!parsedIpCategories.success)
      throw new Error(parsedIpCategories.error.message);
    if (!parsedIpCategories.data.status)
      throw new Error(parsedIpCategories.data.error);
    return {
      status: true,
      data: parsedIpCategories.data.response,
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error accrued",
    };
  }
}

export async function updateCategory(
  ip: string,
  category: string,
): Promise<string> {
  try {
    const session = await getServerSession(authConfig);
    const response = await fetch(`${env.BACKEND_URL}/address-lists`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ip,
        list: category,
      }),
    });
    const r = await response.json();
    if (!response.ok) throw new Error(r.response.message);
    return `${category} updated`;
  } catch (error) {
    return error instanceof Error ? error.message : "An error accrued";
  }
}
