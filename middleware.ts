import { NextResponse, type NextRequest } from "next/server";

// Gates /spin-wheel behind a password so only you can view it. Doesn't
// touch any other route on the site. See app/spin-wheel/login for the
// password form and setup instructions.
export function middleware(request: NextRequest) {
  const secret = process.env.SPIN_WHEEL_COOKIE_SECRET;
  const cookie = request.cookies.get("spin_wheel_access")?.value;

  if (secret && cookie === secret) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/spin-wheel/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/spin-wheel"],
};
