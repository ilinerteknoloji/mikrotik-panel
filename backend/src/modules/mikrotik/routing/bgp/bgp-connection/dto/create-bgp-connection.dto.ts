import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

// General > Name, Template, AS, Remote Address, Remote AS, Local Role
// Exstra > Routing Table
// Filter > İnput Filter, Output Filter, Output Network

export class CreateBgpConnectionDto {
  // Enabled
  @IsBoolean()
  @IsOptional()
  disabled: boolean;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsString()
  @IsOptional()
  name?: string;

  // TODO: Template bulunamadı

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(4294967295)
  as?: number;

  // AFI
  @IsEnum(["ip", "ipv6", "l2vpn", "l2vpn-cisco", "vpnv4"])
  @IsOptional()
  addressFamilies?: "ip" | "ipv6" | "l2vpn" | "l2vpn-cisco" | "vpnv4";

  @IsString()
  @IsOptional()
  routerId?: string;

  @IsString()
  @IsOptional()
  remoteAddress?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(4294967295)
  remoteAs?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(65535)
  remotePort?: number;

  // TODO: Remote Allow AS

  //? Read Only
  // @IsString()
  // @IsOptional()
  // localAddress?: string;

  // TODO: localPort
  // TODO: localRole

  @IsString()
  @IsOptional()
  tcpMd5Key?: string;

  @IsBoolean()
  @IsOptional()
  multihop?: boolean;

  // TODO: tx ttl
  // TODO: Rx Min ttl
  // TODO: connect: boolean;
  // TODO: listen: boolean;

  @IsString()
  @IsOptional()
  holdTime?: string;

  @IsString()
  @IsOptional()
  keepaliveTime?: string;

  @IsBoolean()
  @IsOptional()
  useBfd?: boolean;

  // TODO: routing table
  // TODO: vrf

  @IsString()
  @IsOptional()
  clusterId?: string;

  // TODO: No Client To Client Reflection
  // TODO: Output Redistribute

  @IsEnum(["always", "if-installed", "never"])
  @IsOptional()
  defaultOriginate?: "always" | "if-installed" | "never";

  // TODO: No Early Cut
  // TODO: Keep Sent Attributes
  // TODO: Input Affinity
  // TODO: Output Affinity

  @IsEnum(["default", "force-self", "propagate"])
  @IsOptional()
  nexthopChoice?: "default" | "force-self" | "propagate";

  @IsBoolean()
  @IsOptional()
  asOverride?: boolean;

  // TODO: Default Prepend
  // TODO: Add Path Out

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(10)
  allowAsIn?: number;

  @IsBoolean()
  @IsOptional()
  ignoreAsPathLen?: boolean;

  @IsBoolean()
  @IsOptional()
  removePrivateAs?: boolean;

  @IsEnum(["auto-bits", "auto-bytes", "bits", "bytes"])
  @IsOptional()
  ciscoVplsNlriLenFmt?: "auto-bits" | "auto-bytes" | "bits" | "bytes";

  // TODO: Input Filter
  // TODO: Input Accept NLRI
  // TODO: Input Accept Communities
  // TODO: Input Accept Ext Communities
  // TODO: Input Accept Large Communities
  // TODO: Input Accept Unknown
  // TODO: Output Filter
  // TODO: Output Selection Policy
  // TODO: Output Network
}
