import { Injectable } from "@nestjs/common";
import { SignInAuthDto, SignUpAuthDto } from "./dto";

@Injectable()
export class AuthService {
  public async signUp(signUpAuthDto: SignUpAuthDto) {
    throw new Error("Method not implemented.");
  }

  public async signIn(signInDto: SignInAuthDto) {
    throw new Error("Method not implemented.");
  }

  public async signOut() {
    throw new Error("Method not implemented.");
  }

  public async refreshToken() {
    throw new Error("Method not implemented.");
  }
}
