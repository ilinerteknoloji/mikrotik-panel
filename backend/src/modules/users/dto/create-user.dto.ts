import {
  IsAlpha,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  Length,
  Matches,
} from "class-validator";

export class CreateUserDto {
  @IsAlpha("tr-TR")
  @Length(2, 50, { message: "First name must be between 2 and 50 character" })
  firstName: string;
  @IsAlpha("tr-TR")
  @Length(2, 50, { message: "Last name must be between 2 and 50 characters" })
  lastName: string;
  @Matches(/^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/, {
    message: "Username must contain at least one letter",
  })
  @Length(3, 50, { message: "Username must be between 3 and 50 characters" })
  username: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber("TR")
  phoneNumber: string;
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
