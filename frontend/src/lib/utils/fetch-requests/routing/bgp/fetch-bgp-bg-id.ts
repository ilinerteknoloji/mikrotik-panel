import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "../..";
import {
  bgpConnectionResponseSchema,
  bgpConnectionSchema,
  BGPConnectionSchema,
} from "@/lib/schema/response/routing/bgp/connections";
import {
  createBgpConnectionFormSchema,
  CreateBgpConnectionFormSchema,
} from "@/app/admin/routing/(bgp)/bgp/add/schema";

export async function fetchBGPById(
  id: string,
): Promise<FormAction<CreateBgpConnectionFormSchema>> {
  try {
    const response = await fetchBackEnd(`routing/bgp/connection/${id}`);
    if (!response.status) throw new Error(response.message);
    const parsed = bgpConnectionResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    const data = createBgpConnectionFormSchema.parse({
      connect: parsed.response.connect,
      name: parsed.response.name,
      listen: parsed.response.listen,
      localAddress: parsed.response["local.address"],
      localPort: parsed.response["local.port"],
      remotePort: parsed.response["remote.port"],
      remoteAddress: parsed.response["remote.address"],
      localRole: parsed.response["local.role"],
      templates: parsed.response.templates,
      allowedAs: "",
      remoteASList: undefined,
      localTtl: undefined,
      remoteAs: undefined,
      remoteTtl: undefined,
      localHoldTimeList: undefined,
      tcpMd5Key: undefined,
    });
    return { status: true, data };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
