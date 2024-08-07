import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
  @IsString()
  address: string;

  @IsBoolean()
  @IsOptional()
  advertise?: boolean;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsBoolean()
  @IsOptional()
  disabled?: boolean;

  @IsBoolean()
  @IsOptional()
  eui64?: boolean;

  @IsString()
  @IsOptional()
  fromPool?: string;

  @IsBoolean()
  @IsOptional()
  noDad?: boolean;

  @IsString()
  interface: string;
}
