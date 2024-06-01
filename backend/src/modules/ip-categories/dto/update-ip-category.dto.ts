import { PartialType } from "@nestjs/mapped-types";
import { CreateIpCategoryDto } from "./create-ip-category.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateIpCategoryDto extends PartialType(CreateIpCategoryDto) {
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
