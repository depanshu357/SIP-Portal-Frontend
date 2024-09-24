import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/users";
import axios from "axios";

type User = {
    FirstName:  string 
	LastName:  string
	Email:     string
	Password:   string 
	IsVerified: boolean
    Role:      string
    Id:        number
    CreateAt:  string
    UpdateAt:  string
    DeletedAt: string
}

export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST },
} = NextAuth({
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials): Promise<any> {
                if (!credentials) return null;
            
                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/log-in`, {
                        email: credentials.email,
                        password: credentials.password,
                    });
            
                    return response.data.user;
                    // const user:User | undefined = getUserByEmail(credentials?.email);
                    // console.log(user);
                    // if (user) {
                    //     const isMatch = user?.password === credentials.password;

                    //     if (isMatch) {
                    //         return user;
                    //     } else {
                    //         throw new Error("Email or Password is not correct");
                    //     }
                    // } else {
                    //     throw new Error("User not found");
                    // }
                } catch (error) {
                    return null;
                }
            }
            
        }),
    ],
    callbacks:{
        async session({session, token}){
            if(token){
                session.user.email = token.email ?? ""; // Provide a default value if token.email is null or undefined
                session.user.isVerified = token.isVerified ?? false; // Provide a default value if token.isVerified is null or undefined
                session.user.role = token.role ?? "none"; // Provide a default value if token.role is null or undefined
                if (typeof token.id === 'string' || typeof token.id === 'number') {
                    session.user.id = token.id.toString();
                } else {
                    session.user.id = ""; // Provide a default value if token.id is not a string or number
                } // Provide a default value if token.id is null or undefined
            }
            return session
        },
        async jwt({token, user}){
            console.log(token, user)
            if(user){
                token.id = user.ID;
                token.email = user.Email;
                token.isVerified = user.IsVerified;
                token.role = user.Role;
            }
            console.log(token)
            return token;
        }
    }
});
