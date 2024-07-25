"use server";

import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { addUserIpsResponseSchema, AddUserIpsSchema } from "./schema";

export async function addUserIps(values: AddUserIpsSchema) {
  try {
    const bodyData = {
      userId: +values.userId,
      ips: values.ips.split(",").map((ip) => ip.trim()),
    };
    console.log(bodyData);
    const response = await fetchBackEnd("user-ips", {
      method: "POST",
      body: JSON.stringify(bodyData),
    });
    if (!response.status) return response;
    const parsedData = addUserIpsResponseSchema.parse(response.data);
    if (!parsedData.status) throw new Error(parsedData.error);
    let responseData = `${parsedData.response.created.join(", ")} added successfully.`;
    if (parsedData.response.errors.length > 0)
      responseData += `${parsedData.response.errors.join(", ")} failed to add.`;
    return { status: true, data: responseData };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred.",
    };
  }
}
