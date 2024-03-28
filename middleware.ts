import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/auth/sign-up/identify",
  "/auth/sign-up/identify/user-info",
];
const publicRoutes = ["/auth/sign-up"];

export default function middleware(req: NextRequest) {
  if (
    protectedRoutes.includes(req.nextUrl.pathname) &&
    !req.nextUrl.search.includes("verified")
  ) {
    const absoluteURL = new URL("/auth/sign-up", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
