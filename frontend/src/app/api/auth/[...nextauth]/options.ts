import { env } from "@/server";
import { responseSchema } from "@/types";
import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

export const refreshToken = async (token: JWT): Promise<JWT> => {
  const response = await fetch(`${env.BACKEND_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-refresh-token": token.tokens.refreshToken.token,
    },
  });
  const user = await response.json();
  const tokenSchema = z.object({
    accessToken: z.object({
      token: z.string(),
      expiresAt: z.number(),
    }),
    refreshToken: z.object({
      token: z.string(),
      expiresAt: z.number(),
    }),
  });
  const result = tokenSchema.safeParse(user.response);
  if (!response.ok || !result.success) {
    throw new Error("Failed to refresh token");
  }
  return {
    ...token,
    tokens: {
      accessToken: {
        token: result.data.accessToken.token,
        expiresAt: result.data.accessToken.expiresAt,
      },
      refreshToken: {
        token: result.data.refreshToken.token,
        expiresAt: result.data.refreshToken.expiresAt,
      },
    },
  };
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/sign-in",
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const response = await fetch(`${env.BACKEND_URL}/auth/sign-in`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await response.json();
        const result = responseSchema.safeParse(user);
        if (response.ok && result.success && result.data.status) {
          return user.response;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        return {
          ...user,
          ...token,
        };
      }
      if (Date.now() < token.tokens.accessToken.expiresAt) {
        return token;
      }
      return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = { ...token.user };
      session.tokens = { ...token.tokens };
      return session;
    },
  },
};
