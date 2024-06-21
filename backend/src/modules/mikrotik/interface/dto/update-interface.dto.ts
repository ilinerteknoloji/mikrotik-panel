import { PartialType } from "@nestjs/mapped-types";
import { CreateInterfaceDto } from "./create-interface.dto";

export class UpdateInterfaceDto extends PartialType(CreateInterfaceDto) {}
