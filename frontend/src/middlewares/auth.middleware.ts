import next from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const publicPages = ["/sign-in", "/sign-up", "/forgot-password"];
const isPublic = (pathname: string) =>
  publicPages.some((page) => pathname.startsWith(page));

export async function authMiddleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname, origin } = nextUrl;

  const token = await getToken({
    req: request,
  });

  const url = request.nextUrl.clone();
  if (!isPublic(pathname) && !token) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  } else if (isPublic(pathname) && token) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
