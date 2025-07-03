import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   authorization: {
    //     params: {
    //       prompt: "consent",
    //       access_type: "offline",
    //       response_type: "code",
    //       redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/google"
    //     }
    //   }
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    //   authorization: {
    //     params: {
    //       redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/facebook"
    //     }
    //   }
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "checkbox" }
      },
      async authorize(credentials) {
        console.log("Authorization attempt with credentials:", credentials);
        // Hardcoded user for development
        // if (
        //   credentials.username === "zyanhere" &&
        //   credentials.password === "zyanhere"
        // ) {
        //   return {
        //     id: "dev-user",
        //     name: "Zyan",
        //     // phone: "6001234567",
        //     email: "zyan@local.com",
        //     role: "admin"
        //   };
        // }

        // if (!credentials.email && !credentials.phone) {
        //   throw new Error("Email or phone is required");
        // }
        // if (credentials.email && credentials.phone) {
        //   throw new Error("Use either email or phone, not both");
        // }


        try {
          const res = await axios.post(
            "https://lmd-user-2ky8.onrender.com/lmd/api/v1/auth/customer/login",
            {
              // phone: credentials.phone,
              email: credentials.email,
              password: credentials.password,
            },

            //{ withCredentials: true }
          );
          console.log("Response from login API:", res.data);

          const { user } = res.data;
          if (!user || !user.token) {
            throw new Error("Login failed: no token returned");
          }

          // Return a flat object including the token:
          return {
            id: user.id || user.user_id,
            name: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role || "user",
            token: user.token,
            rememberMe: credentials.rememberMe === "on",
          };
          // return res.data.user ?? null;
        } catch (error) {
          let errorMessage = "Authentication failed";

          if (error.response) {
            // Server responded with non-2xx status
            errorMessage = error.response.data?.message ||
              `Server error: ${error.response.status}`;
          } else if (error.request) {
            // Request was made but no response
            errorMessage = "No response from server";
          } else {
            // Other errors
            errorMessage = error.message;
          }

          console.error("Authentication error:", errorMessage);
          throw new Error(errorMessage);
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  //   callbacks: {
  //     async jwt({ token, user, account }) {
  //       // Handle OAuth providers
  //       if (account?.provider === "google" || account?.provider === "facebook") {
  //         try {
  //           // Call your backend to handle OAuth user creation/login
  //           const response = await axios.post(
  //             `http://localhost:4000/lmd/api/v1/auth/${account.provider}/callback`,
  //             {
  //               token: account.access_token,
  //               email: token.email,
  //               name: token.name
  //             }
  //           );
  //           console.log("🔍 [login response] res.data =", JSON.stringify(res.data, null, 2));

  //           if (response.data?.user) {
  //             token.user = {
  //               id: response.data.user.id,
  //               name: response.data.user.name,
  //               email: response.data.user.email,
  //               phone: response.data.user.phone,
  //               role: response.data.user.role || "user",
  //               token: response.data.token  // Store token from backend
  //             };
  //           }
  //         } catch (error) {
  //           console.error(`Error during ${account.provider} authentication:`, error);
  //           return null;
  //         }
  //       } else if (user) {
  //         token.user = {
  //           id: user.id,
  //           name: user.name,
  //           email: user.email,
  //           phone: user.phone,
  //           role: user.role || "user",
  //           token: user.token  // Preserve token
  //         };
  //         // Implement rememberMe functionality
  //         if (user.rememberMe) {
  //           token.exp = Math.floor(Date.now()/1000) + 30 * 24 * 60 * 60; // 30 days
  //         }
  //       }
  //       return token;
  //     },

  //     async session({ session, token }) {
  //       if (token) {
  //         session.user = token.user;
  //       }
  //       return session;
  //     }
  //   },
  //   pages: {
  //     signIn: "/auth/signin",
  //   },
  //   secret: process.env.NEXTAUTH_SECRET,
  // });

  callbacks: {
    /** 
     * @param token  — existing token (from previous call or initial),
     * @param user   — user object returned from `authorize` or OAuth sign-in,
     * @param account — info about the OAuth provider (only on first sign-in)
     */

    async jwt({ token, user }) {
      // On initial sign-in (credentials or OAuth), `user` will be defined.
      if (user) {
        token.accessToken = user.token;
        token.role = user.role;
        
        if (user.rememberMe) {
          token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
        }
      }
      return token;
    },

    /** 
     * @param session — session object sent to the client
     * @param token   — same token returned from `jwt` callback
     */
    
    async session({ session, token }) {
      // Expose token and role on `session.user`
      session.user.token = token.accessToken;
      session.user.role = token.role;
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

