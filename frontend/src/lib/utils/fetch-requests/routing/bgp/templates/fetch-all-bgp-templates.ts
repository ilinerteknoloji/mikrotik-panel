"use server";

import {
  bgpTemplatesResponseSchema,
  BGPTemplatesSchema,
} from "@/lib/schema/response/routing/bgp/templates";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "../../..";

export async function fetchAllBGPTemplates(): Promise<
  FormAction<BGPTemplatesSchema>
> {
  try {
    const response = await fetchBackEnd("routing/bgp/templates");
    if (!response.status) throw new Error(response.message);
    const parsed = bgpTemplatesResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
