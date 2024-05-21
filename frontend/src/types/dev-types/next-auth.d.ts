import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      role: string;
    };
    tokens: {
      accessToken: {
        token: string;
        expiresAt: number;
      };
      refreshToken: {
        token: string;
        expiresAt: number;
      };
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      username: string;
      role: string;
    };
    tokens: {
      accessToken: {
        token: string;
        expiresAt: number;
      };
      refreshToken: {
        token: string;
        expiresAt: number;
      };
    };
  }
}
