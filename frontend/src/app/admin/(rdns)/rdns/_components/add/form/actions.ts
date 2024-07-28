"use server";

import { FormAction } from "@/lib/types";
import { RDnsHostForm } from "./schema";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";
import { rDnsHostsResponseSchema } from "@/lib/schema/response/rdns-hosts";

export async function addRdnsHost(
  values: RDnsHostForm,
): Promise<FormAction<string>> {
  try {
    if (!values.hostnameMain) {
      const [v3, v2, v1] = values.host.split(".");
      values.hostnameMain = `${v1}.${v2}.${v3}`;
    }
    const response = await fetchBackEnd("/rdns-hosts", {
      method: "POST",
      body: JSON.stringify({
        host: values.host,
        hostnameMain: values.hostnameMain,
      }),
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
