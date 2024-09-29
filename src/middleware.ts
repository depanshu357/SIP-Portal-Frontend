import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_ROUTES, LOGIN, ROOT } from "@/lib/routes";
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname } = nextUrl;
  const session = await auth();
  console.log("session middleware", session);
  const isAuthenticated = !!session?.user;
  const role = await session?.user?.role;
  console.log("isAuthenticated", isAuthenticated, nextUrl.pathname);
  const isPublicRoute =
    PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;
  console.log("isPublicRoute", isPublicRoute);
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  } 
   if (isAuthenticated && isPublicRoute) {
    if (role === "student") {
      return NextResponse.redirect(new URL("/" + role + "/profile", nextUrl));
    } else if (role === "recruiter") {
      return NextResponse.redirect(new URL("/" + role + "/profile", nextUrl));
    } else if (role === "admin" || role === "superadmin") {
      return NextResponse.redirect(new URL("/admin/student", nextUrl));
    }
  }
  if (isAuthenticated) {
    if (role === "student") {
      if (pathname.startsWith("/admin") || pathname.startsWith("/recruiter")) {
        return NextResponse.redirect(new URL("/student/notifications", req.nextUrl));
      }
    } else if (role === "recruiter") {
      if (pathname.startsWith("/admin") || pathname.startsWith("/student")) {
        return NextResponse.redirect(new URL("/recruiter/notifications", req.nextUrl));
      }
    } else if (role === "admin" || role === "superadmin") {
      if (pathname.startsWith("/student") || pathname.startsWith("/recruiter")) {
        return NextResponse.redirect(new URL("/admin/student", req.nextUrl));
      }
    }
  }

  // If no redirect conditions are met, continue as normal
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
