import { env } from "@/lib/schema/env";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const privatePages = ["/dashboard"];
const isPrivate = (pathname: string) =>
  privatePages.some((page) => pathname.startsWith(page));

export async function authMiddleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;
  const token = await getToken({
    req: request,
    secret: env.NEXTAUTH_SECRET,
  });
  const url = request.nextUrl.clone();
  if (isPrivate(pathname) && !token) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
