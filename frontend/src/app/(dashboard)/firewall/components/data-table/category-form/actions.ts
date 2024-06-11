"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { env } from "@/schema";
import { FormAction } from "@/types";
import { getServerSession } from "next-auth";

type Categories = {
  id: number;
  title: string;
  description: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}[];

export async function getCategories(): Promise<FormAction<Categories>> {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${env.BACKEND_URL}/ip-categories`, {
      headers: {
        Authorization: `Bearer ${session?.tokens.accessToken.token}`,
      },
    });
    const responseJson = await response.json();
    if (response.ok) {
      return {
        status: true,
        data: responseJson.response,
      };
    }
    throw new Error(responseJson.response.message);
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
    const session = await getServerSession(authOptions);
    const response = await fetch(`${env.BACKEND_URL}/address-lists`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session?.tokens.accessToken.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ip,
        list: category,
      }),
    });
    const r = await response.json();
    if (response.ok) {
      return `${category} updated`;
    } else {
      return r.response.message;
    }
  } catch (error) {
    console.log(error);

    return error instanceof Error ? error.message : "An error accrued";
  }
}
