"use server";

import { FormAction } from "@/lib/types";
import { IpIpTunnelFormSchema } from "./schema";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { interfaceResponseSchema } from "@/lib/schema/response/interfaces";

export async function addIpIpTunnel(
  values: IpIpTunnelFormSchema,
): Promise<FormAction<string>> {
  try {
    if (values.dscp === "inherit") delete values.dscp;
    if (values.localAddress === "") delete values.localAddress;
    if (values.ipsecSecret === "") delete values.ipsecSecret;

    const response = await fetchBackEnd("interface/ip-tunnel", {
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
