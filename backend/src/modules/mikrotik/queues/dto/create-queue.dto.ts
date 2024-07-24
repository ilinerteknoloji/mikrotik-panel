import {
  IsIP,
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

  @IsIP()
  target: string;

  @IsOptional()
  @Matches(/^(0|[1-9]\d*([KMGT]?)\/(0|[1-9]\d*([KMGT]?)))$/)
  maxLimit: string;

  @IsOptional()
  @Matches(/^(0|[1-9]\d*([KMGT]?)\/(0|[1-9]\d*([KMGT]?)))$/)
  limitAt: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(7)
  priority: number;
}
