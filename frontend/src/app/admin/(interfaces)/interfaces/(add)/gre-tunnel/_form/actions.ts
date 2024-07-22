"use server";

import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { dontFragmentValues, GreTunnelSchema } from "./schema";
import { interfaceResponseSchema } from "@/lib/schema/response/interfaces";
import { FormAction } from "@/lib/types";

export async function addGreTunnel(
  values: GreTunnelSchema,
): Promise<FormAction<string>> {
  try {
    if (values.clampTcpMss) delete values.clampTcpMss;
    if (values.comment) delete values.comment;
    if (!values.disabled) delete values.disabled;
    if (values.dontFragment === dontFragmentValues[0])
      delete values.dontFragment;
    if (values.dscp === "inherit") delete values.dscp;
    if (values.ipsecSecret === "") delete values.ipsecSecret;
    if (values.keepalive === "00:00:10,10") delete values.keepalive;
    if (values.localAddress === "") delete values.localAddress;
    if (values.mtu === 1476) delete values.mtu;
    if (values.name === "") delete values.name;
    delete values.l2mtu;

    const response = await fetchBackEnd("interface/gre-tunnel", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (!response.status) throw new Error(response.message);
    const parsedData = interfaceResponseSchema.parse(response.data);
    if (!parsedData.status) throw new Error(parsedData.response.error);
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
