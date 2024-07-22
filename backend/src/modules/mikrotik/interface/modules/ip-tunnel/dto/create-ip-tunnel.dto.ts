import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsEnum,
  IsIP,
} from "class-validator";

enum DontFragment {
  INHERIT = "inherit",
  NO = "no",
}
export class CreateIpTunnelDto {
  @IsBoolean()
  @IsOptional()
  clampTcpMss?: boolean;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  @IsEnum(DontFragment)
  @IsOptional()
  dontFragment?: DontFragment;

  @IsInt()
  @IsOptional()
  dscp?: number;

  @IsString()
  @IsOptional()
  ipsecSecret?: string;

  @IsIP()
  @IsOptional()
  localAddress?: string;

  @IsInt()
  @IsOptional()
  mtu?: number;

  @IsString()
  @IsOptional()
  keepalive?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsIP()
  remoteAddress?: string;
}
