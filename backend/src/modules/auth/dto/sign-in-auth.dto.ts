import { PickType } from "@nestjs/mapped-types";
import { ValidateIf } from "class-validator";
import { SignUpAuthDto } from "./sign-up-auth.dto";

export class SignInAuthDto extends PickType(SignUpAuthDto, [
  "username",
  "email",
  "phoneNumber",
  "password",
] as const) {
  @ValidateIf((o) => !o.email && !o.phoneNumber)
  username: string;
  @ValidateIf((o) => !o.username && !o.phoneNumber)
  email: string;
  @ValidateIf((o) => !o.username && !o.email)
  phoneNumber: string;
}
