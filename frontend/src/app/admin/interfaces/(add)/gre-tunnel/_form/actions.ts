"use server";

import { interfaceResponseSchema } from "@/lib/schema/response/interfaces";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { GreTunnelSchema } from "./schema";

export async function addGreTunnel(
  values: GreTunnelSchema,
): Promise<FormAction<string>> {
  try {
    if (values.dscp === "inherit") delete values.dscp;
    if (values.localAddress === "") delete values.localAddress;
    if (values.ipsecSecret === "") delete values.ipsecSecret;

    const response = await fetchBackEnd("interface/gre-tunnel", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (!response.status) throw new Error(response.message);
    const parsedData = interfaceResponseSchema.parse(response.data);
    if (!parsedData.status) throw new Error(parsedData.error);
    return {
      status: true,
      data: `${parsedData.response.name} added successfully.`,
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred.",
    };
  }
}

export async function updateGreTunnel(
  id: string,
  values: GreTunnelSchema,
): Promise<FormAction<string>> {
  try {
    if (values.dscp === "inherit") delete values.dscp;
    if (values.localAddress === "") delete values.localAddress;
    if (values.ipsecSecret === "") delete values.ipsecSecret;

    const response = await fetchBackEnd(`interface/gre-tunnel/${id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
    });
    if (!response.status) throw new Error(response.message);
    const parsedData = interfaceResponseSchema.parse(response.data);
    if (!parsedData.status) throw new Error(parsedData.error);
    return {
      status: true,
      data: `${parsedData.response.name} updated successfully.`,
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred.",
    };
  }
}
