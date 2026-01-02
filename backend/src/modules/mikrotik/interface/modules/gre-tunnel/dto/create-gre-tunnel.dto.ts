import { IsBoolean, IsIn, IsInt, IsOptional, IsString } from "class-validator";

export class CreateGreTunnelDto {
  @IsOptional()
  @IsBoolean()
  clampTcpMss?: boolean;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  @IsOptional()
  @IsIn(["inherit", "no"])
  dontFragment?: string;

  @IsOptional()
  @IsString()
  dscp?: string;

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

  @IsString()
  remoteAddress: string;
}
