import { dataTableSearchParamType } from "@/components/admin/data-table/search-params.type";
import {
  RDnsHosts,
  rDnsHostsResponseSchema,
} from "@/lib/schema/response/rdns-hosts";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "..";
import { searchParamsToText } from "../../search-params-to-text";

export async function fetchAllRDnsHosts(
  searchParams: dataTableSearchParamType,
): Promise<FormAction<RDnsHosts>> {
  try {
    const response = await fetchBackEnd(
      `/rdns-hosts?${searchParamsToText(searchParams)}`,
    );
    if (!response.status) return response;
    const parsed = rDnsHostsResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
