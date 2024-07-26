import { FormAction } from "@/lib/types";
import { RDnsHostForm } from "./schema";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { rDnsHostsResponseSchema } from "@/lib/schema/response/rdns-hosts";

export async function addRdnsHost(
  values: RDnsHostForm,
): Promise<FormAction<string>> {
  try {
    const response = await fetchBackEnd("/rdns-hosts", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (!response.status) return response;
    const parsed = rDnsHostsResponseSchema.parse(response.data);
    if (!parsed.status) throw new Error(parsed.error);
    return {
      status: true,
      data: `${parsed.response[0].hostname} added successfully`,
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
