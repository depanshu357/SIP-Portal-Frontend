import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import axios from "axios";
import bcrypt from "bcryptjs";
import {cookies} from 'next/headers'

export const { auth, signIn, signOut, handlers } = NextAuth({
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        // console.log("credentials", credentials);
        // const user = getUserByEmail(credentials?.email as string);
        // console.log("user", user);
        // if (user) {
        //   const isMatch = user?.Password === credentials.password;

        //   if (isMatch) {
        //     return user;
        //   } else {
        //     console.log("Email or Password is not correct");
        //     return null;
        //     throw new Error("Email or Password is not correct");
        //   }
        // } else {
        //   console.log("User not found");
        //   return null;
        //   throw new Error("User not found");
        // }
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_KEY}/log-in`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );
          const setCookieHeader = response.headers['set-cookie'];
          if (!setCookieHeader) {
            throw new Error("Failed to get authorization token from headers");
          }
          // Parse the set-cookie header to get the Authorization token
          const authorizationToken = parseAndGetCookie(setCookieHeader);
          cookies().set("Authorization", authorizationToken)
          const user = await response.data.user;  
          // console.log("user", response.data.user);
          if (user ) {
            const isMatch = bcrypt.compare(
              credentials.password as string,
              user.Password
            );
            if (!!isMatch) {
              return user;
            } else {
              throw new Error("Email or Password is not correct");
            }
          }else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(error as string);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});

const parseAndGetCookie = (cookies: string[]) => {
  let authorizationToken:string = '';
  if (cookies && cookies.length > 0) {
    cookies.forEach((cookie) => {
      if (cookie.startsWith("Authorization=")) {
        authorizationToken = cookie.split(";")[0].split("=")[1]; // First split by ";" then by "="
      }
    });
  }
  return authorizationToken;
};