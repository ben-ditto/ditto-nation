import { NextRequest, NextResponse } from "next/server";

import { verifyAuth } from "lib/auth";

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/api/admin");
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err);
    }));

  if (req.nextUrl.pathname.startsWith("/login") && !verifiedToken) {
    return;
  }

  if (isAdminRoute(req.nextUrl.pathname) && !verifiedToken) {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }

  const url = req.url;

  if (req.url.includes("/login") && verifiedToken) {
    return NextResponse.redirect(new URL("/admin", url));
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", url));
  }
}

export const config = {
  matcher: ["/admin", "/login", "/api/admin/:path*"],
};
