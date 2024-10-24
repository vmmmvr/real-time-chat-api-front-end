import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parse } from "cookie";

export function middleware(request: NextRequest) {
  // List of paths that don't require authentication
  const publicPaths = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forget-password",
  ];

  const urlPathname = request.nextUrl.pathname;

  // Allow access to public paths and files in the public folder
  const isPublicPath = publicPaths.includes(urlPathname);
  const isPublicFile =
    urlPathname.startsWith("/public") ||
    urlPathname.startsWith("/_next") ||
    /\.(png|jpg|jpeg|gif|svg|ico|webp|mp4|webm|pdf|docx|txt|css|js|woff2?|ttf|eot)$/i.test(
      urlPathname
    );

  // Parse the cookies from the request
  const cookiesHeader = request.headers.get("cookie");
  const cookies = cookiesHeader ? parse(cookiesHeader) : {};

  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  // If the user has an access token, they should not access public routes
  if (accessToken && isPublicPath) {
    // Redirect authenticated users away from public routes (e.g., to the dashboard)
    return NextResponse.redirect(new URL("/user", request.url)); // Redirect to the homepage or another authenticated page
  }

  // If there's no access token and the user tries to access a protected route, redirect to sign-in
  if (!accessToken && !isPublicPath && !isPublicFile) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url)); // Redirect unauthenticated users to sign-in
  }

  // Allow access to public paths and files
  return NextResponse.next();
}
