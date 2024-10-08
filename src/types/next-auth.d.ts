import "next-auth";

declare module "next-auth" {
  interface User {
    ID?: string;
    Email?: string;
    Role?: string;
    IsVerified?: boolean;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      isVerified: boolean;
    } & DefaultSession["user"];
  }
  interface JWT {
    id?: string;
    email?: string;
    role?: string;
    isVerified?: boolean;
  }
}
