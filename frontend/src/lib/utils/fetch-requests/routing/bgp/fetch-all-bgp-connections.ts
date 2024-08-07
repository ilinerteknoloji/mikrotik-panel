import {
  bgpConnectionsResponseSchema,
  BGPConnectionsSchema,
} from "@/lib/schema/response/routing/bgp/connections";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "../..";

export async function fetchAllBGPConnections(): Promise<
  FormAction<BGPConnectionsSchema>
> {
  try {
    const response = await fetchBackEnd("routing/bgp/connection");
    if (!response.status) throw new Error(response.message);
    const parsed = bgpConnectionsResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
