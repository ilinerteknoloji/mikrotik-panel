import { env } from "@/lib/schema/env";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const privatePages = ["/dashboard"];
const isPrivate = (pathname: string) =>
  privatePages.some((page) => pathname.startsWith(page));

const authPages = ["/sign-in", "/sign-up", "/forgot-password"];
const isAuthPage = (pathname: string) =>
  authPages.some((page) => pathname.startsWith(page));

const adminPages = ["/admin"];
const isAdminPage = (pathname: string) =>
  adminPages.some((page) => pathname.startsWith(page));

export async function authMiddleware(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname } = nextUrl;
  const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();
  if ((isPrivate(pathname) || isAdminPage(pathname)) && !token) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  } else if (token && isAuthPage(pathname)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  } else if (token?.user.role !== "admin" && isAdminPage(pathname)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
