import { PartialType } from "@nestjs/mapped-types";
import { CreateRdnsHostDto } from "./create-rdns-host.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateRdnsHostDto extends PartialType(CreateRdnsHostDto) {
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
