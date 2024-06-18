import { ConflictException, HttpException, Injectable } from "@nestjs/common";
import { invalidCredentials } from "src/lib/throws";
import {
  filterSignInValueType,
  filterUsersPublicInformations,
} from "src/lib/utils";
import { formatPhoneNumber } from "src/lib/utils/format-phone-number.utils";
import { UsersSchemaInsertType } from "src/shared/drizzle/schemas";
import { EncryptionService } from "src/shared/encryption/encryption.service";
import { JwtRepository } from "src/shared/jwt/jwt.repository";
import { JwtService } from "src/shared/jwt/jwt.service";
import { PayloadType } from "src/types";
import { RequestUserType } from "src/types/request-user.types";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersRepository } from "../users/users.repository";
import { SignInAuthDto } from "./dto/sign-in-auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly encryption: EncryptionService,
    private readonly jwt: JwtService,
    private readonly jwtRepository: JwtRepository,
  ) {}

  public async signUp(signUpAuthDto: CreateUserDto) {
    try {
      signUpAuthDto.phoneNumber = formatPhoneNumber(signUpAuthDto.phoneNumber);
      await this.isUserExists(signUpAuthDto);
      signUpAuthDto.password = await this.encryption.encrypt(
        signUpAuthDto.password,
      );
      const userId =
        await this.usersRepository.createUserWithDetails(signUpAuthDto);
      const [{ users, user_details }] =
        await this.usersRepository.findUserByKeyWithDetail("id", userId);
      const publicData = filterUsersPublicInformations(users);
      return {
        message: "User created successfully",
        user: { ...publicData, details: user_details },
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, 500);
    }
  }

  public async signIn(signInDto: SignInAuthDto) {
    const { username, password } = signInDto;
    const key = filterSignInValueType(username);
    const [{ users, user_details }] =
      await this.usersRepository.findUserByKeyWithDetail(key, username);
    const isMatch = await this.encryption.compare(password, users.password);
    if (!isMatch) invalidCredentials();
    const publicData = filterUsersPublicInformations(users);
    const tokens = await this.generateTokens(users);
    return {
      user: { ...publicData, details: user_details },
      tokens,
    };
  }

  public async signOut(user: RequestUserType) {
    await this.makeTokenStatusFalse(user.refreshTokenId);
    return {
      message: "User signed out successfully",
    };
  }

  public async refreshToken(user: RequestUserType) {
    await this.makeTokenStatusFalse(user.refreshTokenId);
    return await this.generateTokens(user);
  }

  private async isUserExists({
    username,
    email,
    phoneNumber,
  }: UsersSchemaInsertType): Promise<never> {
    const [isUsernameTaken, isEmailTaken, isPhoneNumberTaken] =
      await Promise.allSettled([
        this.usersRepository.findUserByKey("username", username),
        this.usersRepository.findUserByKey("email", email),
        this.usersRepository.findUserByKey("phoneNumber", phoneNumber),
      ]);
    if (
      isUsernameTaken.status === "rejected" &&
      isEmailTaken.status === "rejected" &&
      isPhoneNumberTaken.status === "rejected"
    )
      return;
    const message = [];
    if (isUsernameTaken.status === "fulfilled") message.push("username");
    if (isEmailTaken.status === "fulfilled") message.push("email");
    if (isPhoneNumberTaken.status === "fulfilled") message.push("phoneNumber");
    throw new ConflictException(`[${message.join(", ")}] already exists`);
  }

  private async makeTokenStatusFalse(refreshTokenId: number) {
    await Promise.all([
      this.jwtRepository.updateTokenStatus(
        "access",
        "refreshTokenId",
        refreshTokenId,
      ),
      this.jwtRepository.updateTokenStatus("refresh", "id", refreshTokenId),
    ]);
  }

  private async generateTokens({ id, role, username }: PayloadType) {
    const payload = { id, role, username };
    const { accessToken, refreshToken } = this.jwt.generateTokens(payload);
    const isRefreshExist = await this.jwtRepository.findRefreshTokenByToken(
      refreshToken.token,
    );
    const isAccessExist = await this.jwtRepository.findAccessTokenByToken(
      accessToken.token,
    );
    let refreshTokenId: number;
    if (!isRefreshExist.length) {
      refreshTokenId = await this.jwtRepository.createRefreshToken({
        userId: id,
        token: refreshToken.token,
        expiresAt: new Date(refreshToken.expiresAt),
      });
    }
    if (!isAccessExist.length) {
      await this.jwtRepository.createAccessToken({
        userId: id,
        refreshTokenId: isRefreshExist.length
          ? isRefreshExist[0].id
          : refreshTokenId,
        token: accessToken.token,
        expiresAt: new Date(accessToken.expiresAt),
      });
    }
    return { accessToken, refreshToken };
  }
}
