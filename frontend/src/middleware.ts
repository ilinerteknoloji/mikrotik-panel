import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/auth.middleware";

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  let result;

  result = await authMiddleware(request);

  return result;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
