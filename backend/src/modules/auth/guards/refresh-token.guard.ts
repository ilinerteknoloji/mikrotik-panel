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
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly jwtRepository: JwtRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const refreshToken = Array.isArray(req.headers["x-refresh-token"])
      ? req.headers["x-refresh-token"][0]
      : req.headers["x-refresh-token"];
    if (!refreshToken) throw new UnauthorizedException("Token is required");
    const payload = this.jwt.verifyToken(refreshToken, "refresh");
    const tokenInfo =
      await this.jwtRepository.findRefreshTokenByToken(refreshToken);
    if (!tokenInfo.length || !tokenInfo[0].status)
      throw new UnauthorizedException("Token is invalid");
    req.user = {
      id: payload.id,
      username: payload.username,
      role: payload.role,
      refreshTokenId: tokenInfo[0].id,
    };
    return true;
  }
}
