import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { PayloadType, TokenType } from "src/types";
import { EnvService } from "../env/env.service";
import { GenerateKeysService } from "../keys/generate-keys.service";

@Injectable()
export class JwtService {
  constructor(
    private readonly config: EnvService,
    private readonly key: GenerateKeysService,
  ) {}

  private readonly algorithm = this.config.get(
    "JWT_ALGORITHM",
  ) as jwt.Algorithm;

  public generateTokens(payload: PayloadType) {
    const access_token = this.generateToken(payload, "access");
    const refresh_token = this.generateToken(payload, "refresh");
    return { access_token, refresh_token };
  }

  public generateToken(payload: PayloadType, tokenType: TokenType): string {
    const token = tokenType === "access" ? "JWT_ACCESS" : "JWT_REFRESH";
    const tokenPrivateKey = this.key.readKey(`private_${tokenType}`);
    const expiresIn = this.config.get(`${token}_TOKEN_EXPIRATION`);
    return jwt.sign(payload, tokenPrivateKey, {
      algorithm: this.algorithm,
      expiresIn,
    });
  }

  public verifyTokens(accessToken: string, refreshToken: string) {
    const accessPayload = this.verifyToken(accessToken, "access");
    const refreshPayload = this.verifyToken(refreshToken, "refresh");
    return { accessPayload, refreshPayload };
  }

  public verifyToken(jwtToken: string, tokenType: TokenType) {
    const tokenPublicKey = this.key.readKey(`public_${tokenType}`);
    return jwt.verify(jwtToken, tokenPublicKey, {
      algorithms: [this.algorithm],
    });
  }
}
