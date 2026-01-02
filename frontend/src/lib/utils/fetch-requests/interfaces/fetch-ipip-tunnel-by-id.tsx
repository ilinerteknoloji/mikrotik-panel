import {
  ipIpTunnelFormSchema,
  IpIpTunnelFormSchema,
} from "@/app/admin/interfaces/(add)/ipip-tunnel/_form/schema";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "..";

export async function fetchIpIpTunnelById(
  id: string,
): Promise<FormAction<IpIpTunnelFormSchema>> {
  try {
    const response = await fetchBackEnd(`/interface/ip-tunnel/${id}`);
    if (!response.status) throw new Error(response.message);
    const parsed = ipIpTunnelFormSchema.parse({
      ...(response.data as { response: any }).response,
      keepalive: "00:00:10, 10",
      mtu:
        (response.data as { response: any }).response.mtu === "auto"
          ? ""
          : (response.data as { response: any }).response.mtu,
    });
    return { status: true, data: parsed };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
