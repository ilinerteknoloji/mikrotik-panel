import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { JwtRepository } from "src/shared/jwt/jwt.repository";
import { JwtService } from "src/shared/jwt/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly jwtRepository: JwtRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token is required");
    }
    const token = authorization.split(" ")[1];
    const payload = this.jwt.verifyToken(token, "access");
    const tokenInfo = await this.jwtRepository.findAccessTokenByToken(token);
    if (!tokenInfo.length || !tokenInfo[0].status) {
      throw new UnauthorizedException("Token is invalid");
    }
    req.user = {
      id: payload.id,
      username: payload.username,
      role: payload.role,
      accessTokenId: tokenInfo[0].id,
      refreshTokenId: tokenInfo[0].refreshTokenId,
    };
    return true;
  }
}
