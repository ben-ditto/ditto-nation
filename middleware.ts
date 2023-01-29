import { NextRequest, NextResponse } from "next/server";

import { verifyAuth } from "src/lib/auth";

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

  const url = req.url;

  if (req.url.includes("/login") && verifiedToken) {
    return NextResponse.redirect(new URL("/admin", url));
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", url));
  }
}

export const config = {
  matcher: ["/admin", "/login"],
};
