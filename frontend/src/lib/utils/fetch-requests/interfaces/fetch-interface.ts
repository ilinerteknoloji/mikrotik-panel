"use server";

import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "..";
import {
  InterfaceItem,
  interfaceResponseSchema,
} from "@/lib/schema/response/interfaces";
import {
  bridgeFormSchema,
  BridgeFormSchema,
} from "@/app/admin/interfaces/(add)/bridge/_form/schema";

export async function fetchInterfaceById(
  id: string,
): Promise<FormAction<BridgeFormSchema>> {
  try {
    const response = await fetchBackEnd(`/interface/${id}`);
    if (!response.status) throw new Error(response.message);
    const parsed = interfaceResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.response.toString());
    const bridgeParsed = bridgeFormSchema.parse({
      ...parsed.response,
      mtu: parsed.response.mtu === "auto" ? "" : parsed.response.mtu,
    });
    return {
      status: true,
      data: bridgeParsed,
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
