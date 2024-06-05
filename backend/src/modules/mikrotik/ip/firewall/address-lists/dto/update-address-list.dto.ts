import { IsNotEmpty, IsString } from "class-validator";

export class UpdateAddressListDto {
  @IsString()
  @IsNotEmpty()
  list: string;
}
