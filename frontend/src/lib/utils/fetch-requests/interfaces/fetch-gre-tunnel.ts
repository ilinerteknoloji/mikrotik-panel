"use server";

import {
  greTunnelFormSchema,
  GreTunnelSchema,
} from "@/app/admin/interfaces/(add)/gre-tunnel/_form/schema";
import { FormAction } from "@/lib/types";
import { fetchBackEnd } from "..";

export async function fetchGreTunnelById(
  id: string,
): Promise<FormAction<GreTunnelSchema>> {
  try {
    const response = await fetchBackEnd(`/interface/gre-tunnel/${id}`);
    if (!response.status) throw new Error(response.message);
    const parsed = greTunnelFormSchema.parse({
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
