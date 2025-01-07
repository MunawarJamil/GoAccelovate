import { NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/addTopic", "/editTopic/:path*"],
};

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    console.log("No token found, redirecting to login.");
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}
