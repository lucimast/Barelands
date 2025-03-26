import NextAuth, { DefaultSession, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// Add static export configuration
export const dynamic = 'force-static';

// Extend the built-in types
declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"]
  }
  interface User {
    role?: string;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        // For debugging, log the credentials
        console.log('Login attempt:', {
          username: credentials?.username,
          expectedUsername: 'admin@barelands.vip'
        });

        if (!credentials?.username || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        // Simple password check for now
        if (credentials.username === 'admin@barelands.vip' && credentials.password === 'Lm!19421983') {
          console.log('Login successful');
          return {
            id: "1",
            name: "Admin",
            email: "admin@barelands.vip",
            role: "admin"
          };
        }

        console.log('Invalid credentials');
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug logs
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 