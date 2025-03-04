import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { username, password } = credentials;

        try {
          const { data } = await axios.post(
            "https://resetting-tracker.onrender.com/api/users/login/",
            { username, password },
            { headers: { "Content-Type": "application/json" } }
          );

          if (data.success) {
            return {
              id: data.data.id.toString(),
              username: data.data.username,
              token: data.data.token,
            };
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log("🔹 JWT Callback - User:", user);
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("🔹 Session Callback - Token User:", token.user);
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
