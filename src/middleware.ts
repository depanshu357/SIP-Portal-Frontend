import {authConfig} from "./auth.config"
import NextAuth from "next-auth"
import { NextRequest } from "next/server"
import { PUBLIC_ROUTES, LOGIN, ROOT } from "@/lib/routes"
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig) 
export default auth(async function middleware(req: NextRequest) {
  const  {nextUrl} = req;
  const session = await auth()
  console.log("session middleware", session)
  const isAuthenticated = !!session?.user;
  console.log("isAuthenticated", nextUrl.pathname, isAuthenticated)


})

export const config = {
  matcher: ["/sign-up","/sign-in","/forgot-password","/student"], 
};
