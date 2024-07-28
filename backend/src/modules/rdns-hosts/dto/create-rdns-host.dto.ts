import { IsString } from "class-validator";

export class CreateRdnsHostDto {
  @IsString()
  host: string;

  @IsString()
  hostnameMain: string;
}
