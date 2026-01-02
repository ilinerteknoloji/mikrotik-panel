import { regexConstants } from "@/lib/constant/regex";
import { z } from "zod";

export const arpValues = [
  "enabled",
  "disabled",
  "proxy-arp",
  "reply-only",
] as const;

export const etherTypeValues = ["0x8100", "0x88a8", "0x9100"] as const;

export const frameTypesValues = [
  "admit-all",
  "admit-only-untagged-and-priority-tagged",
  "admit-only-vlan-tagged",
] as const;

export const protocolModeValues = ["rstp", "none", "stp", "mstp"] as const;

export const mdlVersionValues = ["1", "2"] as const;

export const igmpVersionValues = ["2", "3"] as const;

export const multicastRouterValues = [
  "temporary-query",
  "disabled",
  "permanent",
] as const;

export const bridgeFormSchema = z.object({
  addDhcpOption82: z.coerce.boolean().optional(),
  adminMac: z.string().optional(),
  ageingTime: z
    .string()
    .regex(regexConstants.time[0], regexConstants.time[1])
    .optional(),
  arp: z.enum(arpValues).optional(),
  arpTimeout: z.coerce.number().int().optional(),
  autoMac: z.coerce.boolean().optional(),
  comment: z.string().optional(),
  dhcpSnooping: z.coerce.boolean().optional(),
  disabled: z.coerce.boolean().optional(),
  etherType: z.enum(etherTypeValues).optional(),
  fastForward: z.coerce.boolean().optional(),
  forwardDelay: z
    .string()
    .regex(regexConstants.time[0], regexConstants.time[1])
    .optional(),
  frameTypes: z.enum(frameTypesValues).optional(),
  igmpSnooping: z.coerce.boolean().optional(),
  igmpVersion: z.enum(igmpVersionValues).optional(),
  ingressFiltering: z.coerce.boolean().optional(),
  l2mtu: z.string().optional(),
  lastMemberInterval: z
    .string()
    .regex(regexConstants.second[0], regexConstants.second[1])
    .optional(),
  lastMemberQueryCount: z.coerce
    .number()
    .int()
    .min(0)
    .max(4294967295)
    .optional(),
  maxHops: z.coerce.number().int().optional(),
  maxMessageAge: z
    .string()
    .regex(regexConstants.time[0], regexConstants.time[1])
    .optional(),
  membershipInterval: z.string().optional(),
  mldVersion: z.enum(mdlVersionValues).optional(),
  mtu: z.coerce.number().int().optional(),
  multicastQuerier: z.coerce.boolean().optional(),
  multicastRouter: z.enum(multicastRouterValues).optional(),
  name: z.string().optional(),
  priority: z.coerce.number().int().min(0).max(65535).optional(),
  protocolMode: z.enum(protocolModeValues).optional(),
  pvid: z.coerce.number().int().optional(),
  querierInterval: z.string().optional(),
  queryInterval: z.string().optional(),
  queryResponseInterval: z.string().optional(),
  regionName: z.string().optional(),
  regionRevision: z.coerce.number().int().min(0).max(65535).optional(),
  startupQueryCount: z.coerce.number().int().min(0).max(4294967295).optional(),
  startupQueryInterval: z.string().optional(),
  transmitHoldCount: z.coerce.number().int().optional(),
  vlanFiltering: z.coerce.boolean().optional(),
});

export type BridgeFormSchema = z.infer<typeof bridgeFormSchema>;
