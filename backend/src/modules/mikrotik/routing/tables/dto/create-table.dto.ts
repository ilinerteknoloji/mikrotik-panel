import {IsBoolean, IsOptional, IsString} from "class-validator";

export class CreateTableDto {
  @IsBoolean()
  @IsOptional()
  disabled?: boolean;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsBoolean()
  @IsOptional()
  fib?: boolean;
}
