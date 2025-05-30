
type AuthConfig = {
  session: {
    strategy: "jwt";
  };
  providers: any[];
  callbacks: {
    jwt: (params: { token: any; user: any }) => any;
    session: (params: { token: any; session: any }) => any;
  };
};

export const authConfig: AuthConfig = {
 providers: [],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log(token, user)
      if (user) {
        token.id = user.ID;
        token.email = user.Email;
        token.isProfileVerified = user.IsProfileVerified;
        token.frozenForEvents = user.FrozenForEvents;
        token.reasonForFreeze = user.ReasonForFreeze;
        token.verifiedForEvents = user.VerifiedForEvents;
        token.hasAdminAccess = user.HasAdminAccess
        token.role = user.Role;
      }
      // console.log("token", token);
      return token;
    },
    async session({ token, session }) {
      // console.log("session is called");
      session.user.email = token.email; // Provide a default value if token.email is null or undefined
      session.user.isProfileVerified = token.isProfileVerified ?? false; // Provide a default value if token.isVerified is null or undefined
      session.user.role = token.role ?? "none"; // Provide a default value if token.role is null or undefined
      session.user.id = token.id?.toString() ?? "";
      session.user.frozenForEvents = token.frozenForEvents;
      session.user.reasonForFreeze = token.reasonForFreeze ?? {};
      session.user.verifiedForEvents = token.verifiedForEvents ?? [];
      session.user.hasAdminAccess = token.hasAdminAccess ?? false;
      // console.log("session", session);
      return session;
    },
  },
};
