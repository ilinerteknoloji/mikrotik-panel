import { z } from "zod";

export const addPathOutValues = ["all", "none"] as const;

export const addressFamiliesValues = [
  "ip",
  "ipv6",
  "l2vpn",
  "l2vpn-cisco",
  "vpnv4",
] as const;

export const ciscoVplsNlriLenFmtValues = [
  "auto-bits",
  "auto-bytes",
  "bits",
  "bytes",
] as const;

export const affinityValues = [
  "afi",
  "alone",
  "instance",
  "main",
  "remote-as",
  "vrf",
] as const;

export const nexthopChoiceValues = [
  "default",
  "force-self",
  "propagate",
] as const;

export const defaultOriginateValues = [
  "always",
  "if-installed",
  "never",
] as const;

export const routingBgpTemplatesAddFormSchema = z.object({
  addPathOut: z.enum(addPathOutValues).optional(),
  addressFamilies: z.enum(addressFamiliesValues).optional(),
  as: z.coerce.number().int().min(0).max(4294967295).optional(),
  asOverride: z.boolean().optional(),
  ciscoVplsNlriLenFmt: z.enum(ciscoVplsNlriLenFmtValues).optional(),
  clusterId: z.string().optional(),
  disabled: z.boolean().optional(),
  holdTime: z.string().optional(),
  acceptCommunities: z.string().optional(),
  acceptExtCommunities: z.string().optional(),
  acceptLargeCommunities: z.string().optional(),
  acceptNlri: z.string().optional(),
  acceptUnknown: z.string().optional(),
  affinity: z.enum(affinityValues).optional(),
  allowAs: z.coerce.number().int().min(0).max(10).optional(),
  filter: z.string().optional(),
  ignoreAsPathLen: z.boolean().optional(),
  limitNlriDiversity: z.coerce.number().optional(),
  limitProcessRoutesIpv4: z.coerce.number().optional(),
  limitProcessRoutesIpv6: z.coerce.number().optional(),
  keepaliveTime: z.string().optional(),
  multihop: z.boolean().optional(),
  name: z.string().nonempty(),
  nexthopChoice: z.enum(nexthopChoiceValues).optional(),
  outputAffinity: z.string().optional(),
  defaultOriginate: z.enum(defaultOriginateValues).optional(),
  defaultPrepend: z.coerce.number().int().min(0).max(255).optional(),
  filterChain: z.string().optional(),
  filterSelect: z.string().optional(),
  keepSentAttributes: z.boolean().optional(),
  network: z.string().optional(),
  noClientToClientReflection: z.boolean().optional(),
  noEarlyCut: z.boolean().optional(),
  redistribute: z.string().optional(),
  removePrivateAs: z.boolean().optional(),
  routerId: z.string().optional(),
  routingTable: z.string().optional(),
  saveTo: z.string().optional(),
  templates: z.string().optional(),
  useBfd: z.boolean().optional(),
  vrf: z.string().optional(),
});
export type RoutingBgpTemplatesAddFormSchema = z.infer<
  typeof routingBgpTemplatesAddFormSchema
>;
