import {
  bgpTemplateResponseSchema,
  bgpTemplateSchema,
  BGPTemplateSchema,
} from "@/lib/schema/response/routing/bgp/templates";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "../../..";

export async function fetchBGPTemplateById(
  id: string,
): Promise<FormAction<BGPTemplateSchema>> {
  try {
    const response = await fetchBackEnd(`routing/bgp/templates/${id}`);
    if (!response.status) throw new Error(response.message);
    const parsed = bgpTemplateResponseSchema.parse(response.data);
    const data = bgpTemplateSchema.parse(parsed.response);
    return { status: true, data };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
