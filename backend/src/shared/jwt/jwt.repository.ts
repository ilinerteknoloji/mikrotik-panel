import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DRIZZLE_PROVIDER } from "src/lib/constants";
import {
  AccessTokenSchemaInsertType,
  AccessTokenSchemaType,
  RefreshTokenSchemaInsertType,
  RefreshTokenSchemaType,
  accessTokenSchema,
  refreshTokenSchema,
} from "src/shared/drizzle/schemas";
import { TokenType } from "src/types";
import { Drizzle } from "src/types/drizzle.types";

type SchemaType<T extends TokenType> = T extends "access"
  ? AccessTokenSchemaType
  : RefreshTokenSchemaType;

@Injectable()
export class JwtRepository {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly drizzle: Drizzle) {}

  public async createRefreshToken(token: RefreshTokenSchemaInsertType) {
    const isExist = await this.findRefreshTokenByToken(token.token);
    if (isExist.length > 0) return isExist[0].id;
    const [{ insertId }] = await this.drizzle
      .insert(refreshTokenSchema)
      .values(token);
    return insertId;
  }

  public async createAccessToken(token: AccessTokenSchemaInsertType) {
    const [{ insertId }] = await this.drizzle
      .insert(accessTokenSchema)
      .values(token);
    return insertId;
  }

  public async updateTokenStatusByToken(tokenType: TokenType, token: string) {
    const schema =
      tokenType === "access" ? accessTokenSchema : refreshTokenSchema;
    return await this.drizzle
      .update(schema)
      .set({ status: false })
      .where(eq(schema.token, token));
  }

  public async updateTokenStatusById(tokenType: TokenType, id: number) {
    const schema =
      tokenType === "access" ? accessTokenSchema : refreshTokenSchema;
    return await this.drizzle
      .update(schema)
      .set({ status: false })
      .where(eq(schema.id, id));
  }

  public async updateTokenStatus<
    T extends TokenType,
    K extends keyof SchemaType<T>,
  >(tokenType: T, key: K, value: SchemaType<T>[K]) {
    const schema =
      tokenType === "access" ? accessTokenSchema : refreshTokenSchema;
    return await this.drizzle
      .update(schema)
      .set({ status: false })
      .where(eq(schema[key as string], value));
  }

  public async findAccessTokenByToken(token: string) {
    return await this.drizzle
      .select()
      .from(accessTokenSchema)
      .where(eq(accessTokenSchema.token, token));
  }

  public async findRefreshTokenByToken(token: string) {
    return await this.drizzle
      .select()
      .from(refreshTokenSchema)
      .where(eq(refreshTokenSchema.token, token));
  }
}
