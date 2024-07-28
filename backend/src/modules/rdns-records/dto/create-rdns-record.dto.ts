import { IsString } from "class-validator";

export class CreateRdnsRecordDto {
  @IsString()
  record: string;
}
