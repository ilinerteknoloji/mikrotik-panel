"use server";

import { RDnsRecord } from "@/lib/schema/response/rdns-hosts/rdns-records";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { RDnsRecordSchema } from "./schema";

export async function updateRDnsRecord(
  record: RDnsRecord,
  values: RDnsRecordSchema,
): Promise<FormAction<string>> {
  try {
    const response = await fetchBackEnd(
      `/rdns-records/${record.id}?domainName=${record.domainName}&host=${record.host}&record=${values.record}`,
      {
        method: "PATCH",
      },
    );
    return {
      status: true,
      data: "RDns record updated successfully",
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
