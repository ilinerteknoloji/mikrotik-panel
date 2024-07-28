import { dataTableSearchParamType } from "@/components/admin/data-table/search-params.type";
import {
  RDnsRecords,
  rDnsRecordsResponseSchema,
} from "@/lib/schema/response/rdns-hosts/rdns-records";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "..";
import { searchParamsToText } from "../../search-params-to-text";

export async function fetchAllRDnsRecords(
  searchParams: dataTableSearchParamType,
): Promise<FormAction<RDnsRecords>> {
  try {
    const response = await fetchBackEnd(
      `/rdns-records?${searchParamsToText(searchParams)}`,
    );
    console.log(`/rdns-records?${searchParamsToText(searchParams)}`);

    if (!response.status) return response;
    const parsed = rDnsRecordsResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return { status: true, data: parsed.response };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
