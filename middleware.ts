import { NextResponse } from "next/server";
import { auth } from "./src/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isDashboardRoute = /^\/(vi|en)\/dashboard(\/.*)?$/.test(nextUrl.pathname);
  const isPlanApiRoute = /^\/api\/plans(\/.*)?$/.test(nextUrl.pathname);

  if (req.auth || (!isDashboardRoute && !isPlanApiRoute)) {
    return NextResponse.next();
  }

  const localeMatch = nextUrl.pathname.match(/^\/(vi|en)(\/|$)/);
  const locale = localeMatch?.[1] ?? "vi";
  const loginUrl = new URL(`/${locale}/auth/login`, nextUrl.origin);
  loginUrl.searchParams.set("callbackUrl", `${nextUrl.pathname}${nextUrl.search}`);

  return NextResponse.redirect(loginUrl);
});

export const config = {
  matcher: ["/:locale/dashboard/:path*", "/api/plans/:path*"],
};
