import {
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
} from "@nestjs/common";
import { invalidCredentials } from "src/lib/throws";
import { filterUsersPublicInformations } from "src/lib/utils";
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

  /**
   * signUp
   * @description Create a new user
   * @public
   * @async
   * @param {CreateUserDto} signUpAuthDto
   * @returns {Promise<{ message: string; user: { ...publicData, details: user_details } }>}
   * @memberof AuthService
   * @example
   * signUp(signUpAuthDto);
   */
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

  /**
   * signIn
   * @description Sign in user
   * @public
   * @async
   * @param {SignInAuthDto} signInDto
   * @returns {Promise<{ user: { ...publicData, details: user_details }; tokens: { accessToken, refreshToken } }>}
   * @memberof AuthService
   * @example
   * signIn(signInDto);
   */
  public async signIn(signInDto: SignInAuthDto) {
    const { username, password } = signInDto;
    const [{ users, user_details }] =
      await this.usersRepository.findUserWithUniqueValues(username);
    if (!users.status) throw new ForbiddenException("User is not active");
    const isMatch = await this.encryption.compare(password, users.password);
    if (!isMatch) invalidCredentials();
    const publicData = filterUsersPublicInformations(users);
    const tokens = await this.generateTokens(users);
    return {
      user: { ...publicData, details: user_details },
      tokens,
    };
  }

  /**
   * signOut
   * @description Sign out user
   * @public
   * @async
   * @param {RequestUserType} user
   * @returns {Promise<{ message: string }>}
   * @memberof AuthService
   * @example
   * signOut(user);
   */
  public async signOut(user: RequestUserType) {
    await this.makeTokenStatusFalse(user.refreshTokenId);
    return {
      message: "User signed out successfully",
    };
  }

  /**
   * refreshToken
   * @description Refresh token
   * @public
   * @async
   * @param {RequestUserType} user
   * @returns {Promise<{ user: { ...publicData, details: user_details }; tokens: { accessToken, refreshToken } }>}
   * @memberof AuthService
   * @example
   * refreshToken(user);
   */
  public async refreshToken(user: RequestUserType) {
    await this.makeTokenStatusFalse(user.refreshTokenId);
    const [users] = await this.usersRepository.findUserByKey("id", user.id);
    const tokens = await this.generateTokens(user);
    return {
      user: filterUsersPublicInformations(users),
      tokens,
    };
  }

  /**
   * isUserExists
   * @description Check if user exists
   * @private
   * @async
   * @param {UsersSchemaInsertType} { username, email, phoneNumber }
   * @returns {Promise<never>}
   * @memberof AuthService
   * @example
   * isUserExists({ username, email, phoneNumber });
   * @throws {ConflictException}
   */
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

  /**
   * makeTokenStatusFalse
   * @description Make token status false
   * @private
   * @async
   * @param {number} refreshTokenId
   * @returns {Promise<void>}
   * @memberof AuthService
   * @example
   * makeTokenStatusFalse(refreshTokenId);
   */
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

  /**
   * generateTokens
   * @description Generate tokens
   * @private
   * @async
   * @param {PayloadType} { id, role, username }
   * @returns {Promise<{ accessToken, refreshToken }>}
   * @memberof AuthService
   * @example
   * generateTokens({ id, role, username });
   */
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
