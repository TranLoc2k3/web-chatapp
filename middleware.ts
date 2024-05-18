import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith("/auth/sign-in") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard/messages", req.url));
  }

  const authMiddleware = await withAuth({
    pages: {
      signIn: `/auth/sign-in`,
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/sign-in"],
};
