import {
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateTorchDto {
  @IsString()
  @IsNotEmpty()
  interface: string;
  @IsNumber()
  @Min(2, {
    message: "Duration must be greater than or equal to 2",
  })
  @Max(10, {
    message: "Duration must be less than or equal to 10",
  })
  duration: number;
  @IsIP()
  @IsOptional()
  srcAddress?: string;
  @IsIP()
  @IsOptional()
  dstAddress?: string;
}
