import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "Phone", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                //hardcode user
                if (
                    credentials.phone === "6001234" &&
                    credentials.password === "zyanhere"
                  ) {
                    return {
                      id: "dev-user",
                      name: "Zyan",
                      phone: "6001234",
                      email: "zyan@local.com",
                      role: "admin"
                    };
                  }

                  try {
                    const res = await axios.post(
                      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                      credentials,
                      {withCredentials: true}
                    );

                    const user = res.data.user;

                    if(res.data.success && user){
                        return user;
                    }
                    return null;
                  }
                    catch (error) {
                        console.error("Error during authorization:", error);
                        return null;
                    }
            }

        })
    ],
    session: {
        strategy: "jwt",
        // maxAge: 90 * 24 * 60 * 60, 
    },
    callbacks: {
        async jwt ({token, user}) {
            if(user) {
                token.user = user;
                return token;
            }
        },
        async session({session, token}) {
            if(token) {
                session.user = token.user;
                return session;
            }
        }
    },
    pages: {
        signIn: "/auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };