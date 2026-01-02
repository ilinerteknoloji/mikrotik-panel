import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";

enum ARP {
  DISABLED = "disabled",
  ENABLED = "enabled",
  PROXY_ARP = "proxy-arp",
  REPLY_ONLY = "reply-only",
}

enum EtherType {
  TYPE_9100 = "0x9100",
  TYPE_8100 = "0x8100",
  TYPE_88A8 = "0x88a8",
}

enum FrameTypes {
  ADMIT_ALL = "admit-all",
  ADMIT_ONLY_UNTAGGED_AND_PRIORITY_TAGGED = "admit-only-untagged-and-priority-tagged",
  ADMIT_ONLY_VLAN_TAGGED = "admit-only-vlan-tagged",
}

enum ProtocolMode {
  NONE = "none",
  RSTP = "rstp",
  STP = "stp",
  MSTP = "mstp",
}

enum MldVersion {
  VERSION_1 = 1,
  VERSION_2 = 2,
}

enum IgmpVersion {
  VERSION_2 = 2,
  VERSION_3 = 3,
}

export class CreateBridgeDto {
  @IsBoolean()
  @IsOptional()
  addDhcpOption82?: boolean;

  @IsString()
  @IsOptional()
  adminMac?: string;

  @IsString()
  @IsOptional()
  ageingTime?: string;

  @IsEnum(ARP)
  @IsOptional()
  arp?: ARP;

  @IsString()
  @IsOptional()
  arpTimeout?: string;

  @IsBoolean()
  @IsOptional()
  autoMac?: boolean;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsBoolean()
  @IsOptional()
  dhcpSnooping?: boolean;

  @IsBoolean()
  @IsOptional()
  disabled?: boolean;

  @IsEnum(EtherType)
  @IsOptional()
  etherType?: EtherType;

  @IsBoolean()
  @IsOptional()
  fastForward?: boolean;

  @IsString()
  @IsOptional()
  forwardDelay?: string;

  @IsEnum(FrameTypes)
  @IsOptional()
  frameTypes?: FrameTypes;

  @IsBoolean()
  @IsOptional()
  igmpSnooping?: boolean;

  @IsEnum(IgmpVersion)
  @IsOptional()
  igmpVersion?: IgmpVersion;

  @IsBoolean()
  @IsOptional()
  ingressFiltering?: boolean;

  @IsString()
  @IsOptional()
  l2mtu?: string;

  @IsString()
  @IsOptional()
  lastMemberInterval?: string;

  @IsInt()
  @IsOptional()
  lastMemberQueryCount?: number;

  @IsInt()
  @IsOptional()
  maxHops?: number;

  @IsString()
  @IsOptional()
  maxMessageAge?: string;

  @IsString()
  @IsOptional()
  membershipInterval?: string;

  @IsEnum(MldVersion)
  @IsOptional()
  mldVersion?: MldVersion;

  @IsInt()
  @IsOptional()
  mtu?: number;

  @IsBoolean()
  @IsOptional()
  multicastQuerier?: boolean;

  @IsEnum(["disabled", "permanent", "temporary-query"])
  @IsOptional()
  multicastRouter?: "disabled" | "permanent" | "temporary-query";

  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsOptional()
  priority?: number;

  @IsEnum(ProtocolMode)
  @IsOptional()
  protocolMode?: ProtocolMode;

  @IsInt()
  @IsOptional()
  pvid?: number;

  @IsString()
  @IsOptional()
  querierInterval?: string;

  @IsString()
  @IsOptional()
  queryInterval?: string;

  @IsString()
  @IsOptional()
  queryResponseInterval?: string;

  @IsString()
  @IsOptional()
  regionName?: string;

  @IsInt()
  @IsOptional()
  regionRevision?: number;

  @IsInt()
  @IsOptional()
  startupQueryCount?: number;

  @IsString()
  @IsOptional()
  startupQueryInterval?: string;

  @IsInt()
  @IsOptional()
  transmitHoldCount?: number;

  @IsBoolean()
  @IsOptional()
  vlanFiltering?: boolean;
}
