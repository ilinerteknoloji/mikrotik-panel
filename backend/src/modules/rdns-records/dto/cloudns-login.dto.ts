import {IsString} from "class-validator";

export class ClouDNSLoginDto {
  @IsString()
  id: string;

  @IsString()
  password: string;
}
