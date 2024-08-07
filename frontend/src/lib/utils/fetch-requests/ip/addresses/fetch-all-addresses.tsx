import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "../..";
import {
  ipAddressesResponseSchema,
  IpAddressesSchema,
} from "@/lib/schema/response/ip/addresses";

export async function fetchAllAddresses(): Promise<
  FormAction<IpAddressesSchema>
> {
  try {
    const response = await fetchBackEnd("ip/addresses");
    if (!response.status) throw new Error(response.message);
    const parsed = ipAddressesResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
