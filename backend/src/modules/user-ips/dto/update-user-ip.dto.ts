import { PartialType } from "@nestjs/mapped-types";
import { CreateUserIpDto } from "./create-user-ip.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateUserIpDto extends PartialType(CreateUserIpDto) {
  @IsBoolean()
  @IsOptional()
  status: boolean;
}
