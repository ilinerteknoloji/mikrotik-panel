import { env } from "@/schema";
import { signInResponseSchema } from "@/types/schemas/response/auth/sign-in.schema";
import { tokensResponseSchema } from "@/types/schemas/response/auth/tokens.schema";
import { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const refreshToken = async (token: JWT): Promise<JWT> => {
  // console.log({ type: "refreshToken", token });
  console.log(`Refresh Token ${new Date().toLocaleString("tr")}`);
  if (!token.refreshToken) throw new Error("Missing refresh token");
  try {
    const response = await fetch(`${env.BACKEND_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-refresh-token": token.refreshToken,
      },
    });
    if (!response.ok)
      throw new Error(response.statusText ?? "Failed to refresh token");
    const responseJson = await response.json();
    const parsedResponse = tokensResponseSchema.safeParse(responseJson);
    if (!parsedResponse.success) throw new Error("Failed to refresh token");
    if (!parsedResponse.data.status)
      throw new Error(
        parsedResponse.data.response.error ?? "Failed to refresh token",
      );
    const tokens = parsedResponse.data.response;
    return {
      ...token,
      user: token.user,
      accessToken: tokens.accessToken.token,
      expiresAt: tokens.accessToken.expiresAt,
      refreshToken: tokens.refreshToken.token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: error instanceof Error ? error.message : "Failed to refresh token",
    };
  }
};

export const authConfig: AuthOptions = {
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
      async authorize(credentials) {
        const response = await fetch(`${env.BACKEND_URL}/auth/sign-in`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const responseJson = await response.json();
        if (!response.ok)
          throw Error(response.statusText ?? "Failed to sign in");
        const parsedResponse = signInResponseSchema.safeParse(responseJson);
        if (!parsedResponse.success) throw Error("Failed to sign in");
        if (!parsedResponse.data.status)
          throw Error(parsedResponse.data.response.error);
        const {
          user: { id, username, role },
          tokens,
        } = parsedResponse.data.response;
        return {
          id,
          username,
          role,
          accessToken: tokens.accessToken.token,
          refreshToken: tokens.refreshToken.token,
          expiresAt: tokens.accessToken.expiresAt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }): Promise<JWT> {
      if (user)
        return {
          user: { id: +user.id, username: user.username, role: user.role },
          // @ts-expect-error
          accessToken: user?.accessToken ?? token?.accessToken,
          // @ts-expect-error
          expiresAt: user?.expiresAt ?? token?.expiresAt,
          // @ts-expect-error
          refreshToken: user?.refreshToken ?? token?.refreshToken,
        };
      if (Date.now() < token.expiresAt) return token;
      return await refreshToken(token);
    },
    async session({ token, session }): Promise<Session> {
      if (token.user) session.user = token.user as User;
      return {
        user: session.user,
        accessToken: token.accessToken,
        expiresAt: token.expiresAt,
        refreshToken: token.refreshToken,
        expires: session.expires,
      };
    },
  },
};
