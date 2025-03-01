import { ArpFormSchema } from "@/app/admin/ip/(arp)/arp/add/schema";
import { arpResponseSchema } from "@/lib/schema/response/ip/arp";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "../..";

export async function fetchArpById(
  id: string,
): Promise<FormAction<ArpFormSchema>> {
  try {
    const response = await fetchBackEnd(`ip/arps/${id}`);
    if (!response.status) throw new Error(response.message);
    const parsed = arpResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return {
      status: true,
      data: {
        address: parsed.response.address,
        comment: "",
        interface: parsed.response.interface,
        macAddress: parsed.response["mac-address"] ?? "00:00:00:00:00:00",
        published: parsed.response.published,
      },
    };
  } catch (error) {
    console.log("fetchArpById", error);

    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
