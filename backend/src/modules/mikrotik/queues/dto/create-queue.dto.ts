import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from "class-validator";

export class CreateQueueDto {
  @IsOptional()
  @IsString()
  name: string;

  @Matches(/^([0-9]{1,3}\.){3}[0-9]{1,3}\/([0-9]|[1-2][0-9]|3[0-2])$/, {
    message: "target must be a valid CIDR notation",
  })
  target: string;

  @IsOptional()
  @Matches(/^(0|[1-9]\d*([KMGT]?)\/(0|[1-9]\d*([KMGT]?)))/)
  maxLimit: string;

  @IsOptional()
  @Matches(/^(0|[1-9]\d*([KMGT]?)\/(0|[1-9]\d*([KMGT]?)))/)
  limitAt: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(7)
  priority: number;
}
