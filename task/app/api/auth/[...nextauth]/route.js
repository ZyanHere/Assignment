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
        username: { label: "Username", type: "text" },
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
              userName: credentials.username,
              password: credentials.password,
            },
            
            { withCredentials: true }
          );
          console.log("Response from login API:", res.data);
          // // return res.data.user ?? null;
          // if (res.data.status === "success") {
          //   const user = {
          //     id: res.data.data.user._id,
          //     name: res.data.data.user.userName,
          //     email: res.data.data.user.email,
          //     token: res.data.data.token,
          //     rememberMe: credentials.rememberMe
          //   };
          //   console.log("Authentication successful, returning user:", user);
          //   return user;
          // }
          // // Handle API error responses
          // const errorMsg = res.data.message || "Login failed";
          // throw new Error(errorMsg);

          return res.data.user ?? null;
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
              role: response.data.user.role || "user",
              token: response.data.token  // Store token from backend
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
          role: user.role || "user",
          token: user.token  // Preserve token
        };
        // Implement rememberMe functionality
        if (user.rememberMe) {
          token.exp = Math.floor(Date.now()/1000) + 30 * 24 * 60 * 60; // 30 days
        }
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