import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/auth/sign-up/identify"];
const publicRoutes = ["/auth/sign-up"];
const allow_origins = ["http://localhost:3000"];

export default function middleware(req: NextRequest) {
  if (
    protectedRoutes.includes(req.nextUrl.pathname) &&
    !req.nextUrl.search.includes("verified")
  ) {
    const absoluteURL = new URL("/auth/sign-up", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
