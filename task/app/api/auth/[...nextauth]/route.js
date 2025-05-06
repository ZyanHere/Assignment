import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/google"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/facebook"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", optional: true },
        phone: { label: "Phone", type: "text", optional: true },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Hardcoded user for development
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
          );

          const csrfToken = csrfResponse.data.token;

          // Prepare the login payload based on what was provided
          const loginPayload = {
            password: credentials.password,
          };
          if (credentials.email) {
            loginPayload.email = credentials.email;
          } else {
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
            }
          );
          // Return the user data if login was successful
          if (res.data?.success && res.data.user) {
            return res.data.user;
          }
          // Return null if login failed
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
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Handle OAuth providers
      if (account?.provider === "google" || account?.provider === "facebook") {
        try {
          // Call your backend to handle OAuth user creation/login
          const response = await axios.post(
            `http://localhost:4000/lmd/api/v1/auth/${account.provider}/callback`,
            {
              token: account.access_token,
              email: token.email,
              name: token.name
            }
          );

          if (response.data?.user) {
            token.user = {
              id: response.data.user.id,
              name: response.data.user.name,
              email: response.data.user.email,
              phone: response.data.user.phone,
              role: response.data.user.role || "user"
            };
          }
        } catch (error) {
          console.error(`Error during ${account.provider} authentication:`, error);
          return null;
        }
      } else if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role || "user"
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

// callbacks: {
//     async jwt({ token, user, account }) {
//         //store provider account info in token
//         if (account) {
//             token.provider = account.provider;
//         }
//         if (user) {
//             token.user = {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 phone: user.phone,
//                 role: user.role || "user",
//             };
//         }
//         return token;
//     },
//     async session({ session, token }) {
//         if (token) {
//             session.user = token.user;
//         }
//         return session;
//     }
// },

// async signIn({account, profile}) {
//     if(account.provider === "google") {
//         try {
//             const response = await axios.get(
//                 "http://localhost:4000/lmd/api/v1/auth/google/callback",
//                 {
//                     params: {
//                         code: account.id_token,
//                         email: profile.email,
//                     }
//                 }
//             );
//             return true;
//         } catch (error) {
//             console.error("Error during Google sign-in:", error);
//             return false;
//         }
//     }
//     if(account.provider === "facebook") {
//         try {
//             const response = await axios.get(
//                 "http://localhost:4000/lmd/api/v1/auth/facebook/callback",
//                 {
//                     params: {
//                         code: account.id_token,
//                         email: profile.email,
//                     }
//                 }
//             );
//             return true;
//         } catch (error) {
//             console.error("Error during Google sign-in:", error);
//             return false;
//         }
//     }
    

// },