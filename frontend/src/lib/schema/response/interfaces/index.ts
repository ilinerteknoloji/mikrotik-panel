import { z } from "zod";
import { createResponseSchema } from "..";

export const interfaceItem = z.object({
  ".id": z.string(),
  "default-name": z.string().optional(),
  "actual-mtu": z.string().optional(),
  comment: z.string().optional(),
  disabled: z.string(),
  "fp-rx-byte": z.string(),
  "fp-rx-packet": z.string(),
  "fp-tx-byte": z.string(),
  "fp-tx-packet": z.string(),
  l2mtu: z.string().optional(),
  "last-link-up-time": z.string().optional(),
  "link-downs": z.string(),
  "mac-address": z.string().optional(),
  mtu: z.string(),
  name: z.string(),
  running: z.string(),
  "rx-byte": z.string(),
  "rx-drop": z.string(),
  "rx-error": z.string(),
  "rx-packet": z.string(),
  "tx-byte": z.string(),
  "tx-drop": z.string(),
  "tx-error": z.string(),
  "tx-packet": z.string(),
  "tx-queue-drop": z.string(),
  type: z.string(),
});

export type InterfaceItem = z.infer<typeof interfaceItem>;

export const interfaceResponseSchema = createResponseSchema(interfaceItem);

export const interfacesResponseSchema = createResponseSchema(
  z.array(interfaceItem),
);
