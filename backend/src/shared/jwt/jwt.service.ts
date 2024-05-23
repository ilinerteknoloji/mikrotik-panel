import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import ms from "ms";
import { GenerateTokenType, PayloadType, TokenType } from "src/types";
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
    const accessToken = this.generateToken(payload, "access");
    const refreshToken = this.generateToken(payload, "refresh");
    return { accessToken, refreshToken };
  }

  public generateToken(
    payload: PayloadType,
    tokenType: TokenType,
  ): GenerateTokenType {
    const { id, role, username } = payload;
    const token = tokenType === "access" ? "JWT_ACCESS" : "JWT_REFRESH";
    const tokenPrivateKey = this.key.readKey(`private_${tokenType}`);
    const expiresIn = this.config.get(`${token}_TOKEN_EXPIRATION`);
    const expiresAt: number = Date.now() + ms(expiresIn);
    const generatedToken = jwt.sign({ id, role, username }, tokenPrivateKey, {
      algorithm: this.algorithm,
      expiresIn,
    });
    return { token: generatedToken, expiresAt };
  }

  public verifyToken(jwtToken: string, tokenType: TokenType) {
    const tokenPublicKey = this.key.readKey(`public_${tokenType}`);
    let payload: PayloadType;
    jwt.verify(
      jwtToken,
      tokenPublicKey,
      {
        algorithms: [this.algorithm],
      },
      (error, decoded) => {
        if (error) {
          throw new UnauthorizedException(error.message);
        }
        payload = decoded as PayloadType;
      },
    );
    return payload;
  }
}
