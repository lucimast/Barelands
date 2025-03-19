import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

// In a production environment, these credentials would be stored in a database
// This is just a temporary solution
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@barelands.vip";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "$2b$10$vQcjA2ldvcvUU7.QW9HXMObUJa3SyDQg/I8pZtkWMkN0GhZO6gpNO"; // hashed version of "changeme123" - you should change this

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        try {
          // In a real world scenario, you would fetch this from your database
          if (credentials.email === ADMIN_EMAIL) {
            const passwordMatch = await compare(credentials.password, ADMIN_PASSWORD_HASH);
            
            if (passwordMatch) {
              return {
                id: "1",
                email: ADMIN_EMAIL,
                name: "Admin",
              };
            }
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: "/admin",
    error: "/admin",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST }; 