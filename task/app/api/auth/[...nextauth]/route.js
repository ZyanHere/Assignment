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
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "checkbox" }
      },
      async authorize(credentials) {
        console.log("Authorization attempt with credentials:", credentials);
        
        // Hardcoded test user for development
        if (credentials.email === "test@example.com" && credentials.password === "password") {
          return {
            id: "test-user-1",
            name: "Test User",
            email: "test@example.com",
            phone: "1234567890",
            role: "CUSTOMER",
            token: "test-token-12345",
            rememberMe: credentials.rememberMe === "on",
          };
        }

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/auth/customer/login`, 
            {
              email: credentials.email,
              password: credentials.password,
            }
          );
          console.log("Response from login API:", res.data);

          const { user } = res.data;
          if (!user || !user.token) {
            throw new Error("Login failed: no token returned");
          }

                  // Return a flat object including the token:
        return {
          id: user.id || user.user_id,
          name: user.username || user.name,
          email: user.email,
          phone: user.phone,
          role: user.role || "user",
          token: user.token,
          profileImage: user.profileImage,
          rememberMe: credentials.rememberMe === "on",
        };
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
          console.log("=== OAuth Authentication Started ===");
          console.log("Provider:", account.provider);
          console.log("Token data:", { 
            sub: token.sub, 
            email: token.email, 
            name: token.name,
            picture: token.picture 
          });
          
          const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/auth/${account.provider}/callback`;
          const requestData = {
            token: account.access_token,
            email: token.email,
            name: token.name,
            picture: token.picture,
            sub: token.sub // Pass the Google/Facebook ID
          };
          
          console.log("Calling backend URL:", backendUrl);
          console.log("Request data:", requestData);
          
          // Call your backend to handle OAuth user creation/login
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/auth/${account.provider}/callback`,
            requestData,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              timeout: 10000, // 10 second timeout
            }
          );
          
          console.log("Backend response status:", response.status);
          console.log("Backend response data:", response.data);
          
          if (response.data?.user) {
            token.user = {
              id: response.data.user.id || response.data.user._id,
              name: response.data.user.name || response.data.user.userName,
              email: response.data.user.email,
              phone: response.data.user.phone,
              role: response.data.user.role || "CUSTOMER",
              token: response.data.token || response.data.user.token,
              profileImage: response.data.user.profileImage || token.picture
            };
            console.log("User data set in token:", token.user);
          } else {
            console.warn("No user data in backend response");
            throw new Error("Backend did not return user data");
          }
        } catch (error) {
          console.error("=== OAuth Authentication Error ===");
          console.error("Error type:", error.constructor.name);
          
          if (error.response) {
            // Server responded with non-2xx status
            console.error("Response status:", error.response.status);
            console.error("Response data:", error.response.data);
            console.error("Response headers:", error.response.headers);
          } else if (error.request) {
            // Request was made but no response
            console.error("No response received from backend");
            console.error("Request details:", error.request);
          } else {
            // Other errors
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
          }
          
          // Fallback: create basic user data from OAuth token
          console.log("Using fallback OAuth data");
          token.user = {
            id: token.sub,
            name: token.name,
            email: token.email,
            role: "CUSTOMER",
            profileImage: token.picture
          };
        }
      } else if (user) {
        // Handle credentials login
        console.log("Handling credentials login for user:", user.email);
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role || "CUSTOMER",
          token: user.token,
          profileImage: user.profileImage
        };
        
        // Implement rememberMe functionality
        if (user.rememberMe) {
          token.exp = Math.floor(Date.now()/1000) + 30 * 24 * 60 * 60; // 30 days
        }
      }
      return token;
    },

    async session({ session, token }) {
      console.log("=== NextAuth Session Callback ===");
      console.log("Token:", token);
      console.log("Token.user:", token.user);
      console.log("Session before:", session);
      
      if (token.user) {
        session.user = token.user;
        console.log("✅ Session after setting user:", session);
      } else {
        console.warn("⚠️ No token.user found in session callback");
        console.log("Token keys:", Object.keys(token));
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-development-secret-key-change-in-production',
});

export { handler as GET, handler as POST };

