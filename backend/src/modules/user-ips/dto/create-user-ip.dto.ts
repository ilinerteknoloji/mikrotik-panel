import { IsArray, IsIP, IsInt, Min } from "class-validator";

export class CreateUserIpDto {
  @IsInt()
  @Min(1)
  userId: number;
  @IsArray()
  @IsIP("4", {
    each: true,
    message: "The IP address must be a valid IPv4 address",
  })
  ips: string[];
}
