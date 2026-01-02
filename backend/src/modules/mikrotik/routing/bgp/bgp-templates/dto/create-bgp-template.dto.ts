import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateBgpTemplateDto {
  @IsEnum(["all", "none"])
  @IsOptional()
  addPathOut?: "all" | "none";

  @IsEnum(["ip", "ipv6", "l2vpn", "l2vpn-cisco", "vpnv4"])
  @IsOptional()
  addressFamilies?: "ip" | "ipv6" | "l2vpn" | "l2vpn-cisco" | "vpnv4";

  @IsInt()
  @Min(0)
  @Max(4294967295)
  @IsOptional()
  as?: number;

  @IsBoolean()
  @IsOptional()
  asOverride?: boolean;

  @IsEnum(["auto-bits", "auto-bytes", "bits", "bytes"])
  @IsOptional()
  ciscoVplsNlriLenFmt?: "auto-bits" | "auto-bytes" | "bits" | "bytes";

  @IsString()
  @IsOptional()
  clusterId?: string;

  @IsBoolean()
  @IsOptional()
  disabled?: boolean;

  @IsString()
  @IsOptional()
  holdTime?: string;

  @IsString()
  @IsOptional()
  acceptCommunities?: string;

  @IsString()
  @IsOptional()
  acceptExtCommunities?: string;

  @IsString()
  @IsOptional()
  acceptLargeCommunities?: string;

  @IsString()
  @IsOptional()
  acceptNlri?: string;

  @IsString()
  @IsOptional()
  acceptUnknown?: string;

  @IsEnum(["afi", "alone", "instance", "main", "remote-as", "vrf"])
  @IsOptional()
  affinity?: "afi" | "alone" | "instance" | "main" | "remote-as" | "vrf";

  @IsInt()
  @Min(0)
  @Max(10)
  @IsOptional()
  allowAs?: number;

  @IsString()
  @IsOptional()
  filter?: string;

  @IsBoolean()
  @IsOptional()
  ignoreAsPathLen?: boolean;

  @IsInt()
  @IsOptional()
  limitNlriDiversity?: number;

  @IsInt()
  @IsOptional()
  limitProcessRoutesIpv4?: number;

  @IsInt()
  @IsOptional()
  limitProcessRoutesIpv6?: number;

  @IsString()
  @IsOptional()
  keepaliveTime?: string;

  @IsBoolean()
  @IsOptional()
  multihop?: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(["default", "force-self", "propagate"])
  @IsOptional()
  nexthopChoice?: "default" | "force-self" | "propagate";

  @IsString()
  @IsOptional()
  outputAffinity?: string;

  @IsEnum(["always", "if-installed", "never"])
  @IsOptional()
  defaultOriginate?: "always" | "if-installed" | "never";

  @IsInt()
  @Min(0)
  @Max(255)
  @IsOptional()
  defaultPrepend?: number;

  @IsString()
  @IsOptional()
  filterChain?: string;

  @IsString()
  @IsOptional()
  filterSelect?: string;

  @IsBoolean()
  @IsOptional()
  keepSentAttributes?: boolean;

  @IsString()
  @IsOptional()
  network?: string;

  @IsBoolean()
  @IsOptional()
  noClientToClientReflection?: boolean;

  @IsBoolean()
  @IsOptional()
  noEarlyCut?: boolean;

  @IsString()
  @IsOptional()
  redistribute?: string;

  @IsBoolean()
  @IsOptional()
  removePrivateAs?: boolean;

  @IsString()
  @IsOptional()
  routerId?: string;

  @IsString()
  @IsOptional()
  routingTable?: string;

  @IsString()
  @IsOptional()
  saveTo?: string;

  @IsString()
  @IsOptional()
  templates?: string;

  @IsBoolean()
  @IsOptional()
  useBfd?: boolean;

  @IsString()
  @IsOptional()
  vrf?: string;
}
