import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", optional: true },
                phone: { label: "Phone", type: "text", optional: true },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // const { phone, password } = credentials;
                //hardcode user
                if (
                    credentials.phone === "6001234567" &&
                    credentials.password === "zyanhere"
                ) {
                    return {
                        id: "dev-user",
                        name: "Zyan",
                        phone: "6001234567",
                        email: "zyan@local.com",
                        role: "admin"
                    };
                }

                if (!credentials.email && !credentials.phone) {
                    throw new Error("Email or phone is required");
                }
                if (credentials.email && credentials.phone) {
                    throw new Error("Use either email or phone, not both");
                }

                try {
                    const csrfResponse = await axios.get(
                        "http://localhost:4000/lmd/api/v1/auth/csrf-token"
                    )

                    const csrfToken = csrfResponse.data.token;

                    // Prepare the login payload based on what was provided
                    const loginPayload = {
                        password: credentials.password,
                    };
                    if (credentials.email) {
                        loginPayload.email = credentials.email;
                    }else {
                        loginPayload.phone = credentials.phone;
                    }

                    const res = await axios.post(
                        "http://localhost:4000/lmd/api/v1/auth/user/login",
                        loginPayload,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "X-CSRF-Token": csrfToken,
                            },
                            // withCredentials: true,
                        }
                    );

                    const user = res.data.user;

                    // if (res.data?.success && user) {
                    //     return user;
                    // }
                    // return null;
                    return loginResponse.data.user || null;
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
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                  };
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = token.user;
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };