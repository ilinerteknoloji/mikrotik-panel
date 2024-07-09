import { IsIn, IsInt, IsIP, IsOptional, IsString } from "class-validator";

export class CreateGreTunnelDto {
  @IsOptional()
  @IsIn(["yes", "no"])
  clampTcpMss?: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsIn(["yes", "no"])
  disabled?: string;

  @IsOptional()
  @IsIn(["inherit", "no"])
  dontFragment?: string;

  @IsOptional()
  @IsInt()
  dscp?: number;

  @IsOptional()
  @IsString()
  ipsecSecret?: string;

  @IsOptional()
  @IsString()
  keepalive?: string;

  @IsOptional()
  @IsInt()
  l2mtu?: number;

  @IsOptional()
  @IsString()
  localAddress?: string;

  @IsOptional()
  @IsInt()
  mtu?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsIP()
  remoteAddress: string;
}
