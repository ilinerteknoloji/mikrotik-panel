import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInAuthDto, SignUpAuthDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  public signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    return this.authService.signUp(signUpAuthDto);
  }

  @Post("sign-in")
  public signIn(@Body() signInDto: SignInAuthDto) {
    return this.authService.signIn(signInDto);
  }

  @Post("sign-out")
  public signOut() {
    return this.authService.signOut();
  }

  @Post("refresh-token")
  public refreshToken() {
    return this.authService.refreshToken();
  }
}
