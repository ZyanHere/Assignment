import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
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
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
        const res = await axios.post(
            `${backendUrl}/lmd/api/v1/auth/customer/login`,
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
            name: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role || "user",
            token: user.token,
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

  secret: process.env.NEXTAUTH_SECRET || 'your-development-secret-key-change-in-production',
}; 