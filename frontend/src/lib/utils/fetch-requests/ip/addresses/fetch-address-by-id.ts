"use server";

import {
  ipAddressesFormSchema,
  IpAddressesFormSchema,
} from "@/app/admin/ip/(addresses)/addresses/add/schema";
import { ipAddressResponseSchema } from "@/lib/schema/response/ip/addresses";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "../..";

export async function getAddressById(
  id: string,
): Promise<FormAction<IpAddressesFormSchema>> {
  try {
    const response = await fetchBackEnd(`ip/addresses/${id}`);
    if (!response.status) throw new Error(response.message);
    const parsed = ipAddressResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    const ipParsed = ipAddressesFormSchema.parse({
      address: parsed.response.address,
      comment: "",
      disabled: parsed.response.disabled,
      interface: parsed.response.interface,
    });
    return { status: true, data: ipParsed };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
