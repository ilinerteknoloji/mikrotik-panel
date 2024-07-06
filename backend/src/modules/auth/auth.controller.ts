import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { User } from "src/lib/decorators/user.decorator";
import { RequestUserType } from "src/types/request-user.types";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { SignInAuthDto } from "./dto/sign-in-auth.dto";
import { AuthGuard } from "./guards/auth.guard";
import { RefreshTokenGuard } from "./guards/refresh-token.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  public signUp(@Body() signUpAuthDto: CreateUserDto) {
    return this.authService.signUp(signUpAuthDto);
  }

  @Post("sign-in")
  public async signIn(@Body() signInDto: SignInAuthDto) {
    return this.authService.signIn(signInDto);
  }

  @Post("sign-out")
  @UseGuards(AuthGuard)
  public signOut(@User() user: RequestUserType) {
    return this.authService.signOut(user);
  }

  @Post("refresh-token")
  @UseGuards(RefreshTokenGuard)
  public refreshToken(@User() user: RequestUserType) {
    return this.authService.refreshToken(user);
  }
}
