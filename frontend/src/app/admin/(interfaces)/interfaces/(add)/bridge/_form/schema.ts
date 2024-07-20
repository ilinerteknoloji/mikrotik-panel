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
  "disabled",
  "permanent",
  "temporary-query",
] as const;

export const bridgeFormSchema = z.object({
  addDhcpOption82: z.boolean().optional(),
  adminMac: z.string().optional(),
  ageingTime: z
    .string()
    .regex(regexConstants.ageingTime[0], regexConstants.ageingTime[1])
    .optional(),
  arp: z.enum(arpValues).optional(),
  arpTimeout: z.number().int().optional(),
  autoMac: z.boolean().optional(),
  comment: z.string().optional(),
  dhcpSnooping: z.boolean().optional(),
  disabled: z.boolean().optional(),
  etherType: z.enum(etherTypeValues).optional(),
  fastForward: z.boolean().optional(),
  forwardDelay: z.string().optional(),
  frameTypes: z.enum(frameTypesValues).optional(),
  igmpSnooping: z.boolean().optional(),
  igmpVersion: z.enum(igmpVersionValues).optional(),
  ingressFiltering: z.boolean().optional(),
  l2mtu: z.string().optional(),
  lastMemberInterval: z.string().optional(),
  lastMemberQueryCount: z.number().int().optional(),
  maxHops: z.number().int().optional(),
  maxMessageAge: z.string().optional(),
  membershipInterval: z.string().optional(),
  mldVersion: z.enum(mdlVersionValues).optional(),
  mtu: z.number().int().optional(),
  multicastQuerier: z.boolean().optional(),
  multicastRouter: z.enum(multicastRouterValues).optional(),
  name: z.string().optional(),
  priority: z.number().int().optional(),
  protocolMode: z.enum(protocolModeValues).optional(),
  pvid: z.number().int().optional(),
  querierInterval: z.string().optional(),
  queryInterval: z.string().optional(),
  queryResponseInterval: z.string().optional(),
  regionName: z.string().optional(),
  regionRevision: z.number().int().optional(),
  startupQueryCount: z.number().int().optional(),
  startupQueryInterval: z.string().optional(),
  transmitHoldCount: z.number().int().optional(),
  vlanFiltering: z.boolean().optional(),
});

export type BridgeFormSchema = z.infer<typeof bridgeFormSchema>;
