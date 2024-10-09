import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsBoolean, IsEnum, IsOptional } from "class-validator";

export class UpdateUserFromAdmin extends PartialType(CreateUserDto) {
  @IsEnum(["user", "admin"])
  @IsOptional()
  role?: "user" | "admin";
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
