export type TokenType = "access" | "refresh";

export type KeyType = "public" | "private";

export type TokenKeyType = `${KeyType}_${TokenType}`;

export type PayloadType = {
  id: number;
  username: string;
  role: "admin" | "user";
};
