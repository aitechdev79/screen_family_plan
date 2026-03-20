import { NextResponse } from "next/server";
import { auth } from "./src/auth";

export default auth((req) => {
  const { nextUrl } = req;
  if (/^\/en(\/|$)/.test(nextUrl.pathname)) {
    const redirected = new URL(nextUrl.pathname.replace(/^\/en(?=\/|$)/, "/vi"), nextUrl.origin);
    redirected.search = nextUrl.search;
    return NextResponse.redirect(redirected);
  }

  const isDashboardRoute = /^\/vi\/dashboard(\/.*)?$/.test(nextUrl.pathname);
  const isPlanApiRoute = /^\/api\/plans(\/.*)?$/.test(nextUrl.pathname);

  if (req.auth || (!isDashboardRoute && !isPlanApiRoute)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/vi/auth/login", nextUrl.origin);
  loginUrl.searchParams.set("callbackUrl", `${nextUrl.pathname}${nextUrl.search}`);

  return NextResponse.redirect(loginUrl);
});

export const config = {
  matcher: ["/((?!_next|.*\\..*|api/auth).*)", "/api/plans/:path*"],
};
