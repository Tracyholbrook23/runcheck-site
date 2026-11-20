import { NextResponse, type NextRequest } from "next/server";

// 1. Sends the bare domain (theruncheck.app) to www.theruncheck.app, except the
//    /.well-known/ files. Android (assetlinks.json) and iPhone
//    (apple-app-site-association) check those files on BOTH domains and do not
//    follow redirects, so run/post/channel links on the bare domain only open
//    the app if those files are served there directly.
// 2. Gates /spin-wheel behind a password so only you can view it. See
//    app/spin-wheel/login for the password form and setup instructions.
export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  const { pathname } = request.nextUrl;

  if (host === "theruncheck.app" && !pathname.startsWith("/.well-known/")) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = "www.theruncheck.app";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/spin-wheel") {
    const secret = process.env.SPIN_WHEEL_COOKIE_SECRET;
    const cookie = request.cookies.get("spin_wheel_access")?.value;
    if (secret && cookie === secret) {
      return NextResponse.next();
    }
    const loginUrl = new URL("/spin-wheel/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Everything except Next's own static files.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
