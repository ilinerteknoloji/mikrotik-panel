import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: { id: number; username: string; role: string };
    accessToken: string;
    expiresAt: number;
    refreshToken: string;
    error?: string;
  }
  interface User {
    id: number;
    username: string;
    role: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: { id: number; username: string; role: string };
    accessToken: string;
    expiresAt: number;
    refreshToken: string;
    error?: string;
  }
  interface User {
    id: number;
    username: string;
    role: string;
  }
}
