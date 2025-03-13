export type TokenType = "access" | "refresh" | "cloudns";

export type KeyType = "public" | "private";

export type TokenKeyType = `${KeyType}_${TokenType}`;

export type PayloadType = {
  id: number;
  username: string;
  role: "admin" | "user";
};

export type GenerateTokenType = {
  token: string;
  expiresAt: number;
};

export type SaveTokenParams = {
  userId: number;
  refreshToken: GenerateTokenType;
  accessToken: GenerateTokenType;
};
