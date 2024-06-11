import { IsIP, IsNotEmpty, IsString } from "class-validator";

export class UpdateAddressListDto {
  @IsIP("4", {
    message: "The IP address must be a valid IPv4 address",
  })
  ip: string;
  @IsString()
  @IsNotEmpty()
  list: string;
}
