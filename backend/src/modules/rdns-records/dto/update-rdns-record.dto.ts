import { PartialType } from "@nestjs/mapped-types";
import { CreateRdnsRecordDto } from "./create-rdns-record.dto";

export class UpdateRdnsRecordDto extends PartialType(CreateRdnsRecordDto) {}
