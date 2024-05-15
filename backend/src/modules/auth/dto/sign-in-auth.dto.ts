import { PickType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";

export class SignInAuthDto extends PickType(CreateUserDto, [
  "password",
] as const) {
  @IsString()
  username: string;
}
