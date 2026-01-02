import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateArpDto {
  @IsString()
  @IsOptional()
  comment: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  interface: string;

  @IsString()
  @IsOptional()
  macAddress: string = "00:00:00:00:00:00";

  @IsBoolean()
  @IsOptional()
  published: boolean = false;
}
