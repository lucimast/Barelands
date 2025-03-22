import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

// IMPORTANT: Adding static export config to make it work with GitHub Pages
export const dynamic = 'force-static';
export const revalidate = false;

// Generate static params for all possible auth routes
export function generateStaticParams() {
  return [
    { nextauth: ['signin'] },
    { nextauth: ['signout'] },
    { nextauth: ['callback'] },
    { nextauth: ['session'] },
    { nextauth: ['csrf'] },
    { nextauth: ['providers'] },
    { nextauth: ['signin', 'credentials'] },
  ];
}

// In a production environment, these credentials would be stored in a database
// This is just a temporary solution
const ADMIN_EMAIL = "admin@barelands.vip";
// Direct password for static sites
const ADMIN_PASSWORD = "Lm19421983";

// Debug logs
console.log('Auth Config - Email:', ADMIN_EMAIL);

// Define the auth options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }
        
        try {
          // For static site, use direct password comparison
          if (credentials.email === ADMIN_EMAIL && 
              credentials.password === ADMIN_PASSWORD) {
            console.log('Authentication successful');
            return {
              id: "1",
              email: ADMIN_EMAIL,
              name: "Admin",
            };
          }
          
          console.log('Authentication failed');
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
  // Ensure cookies are properly configured for cross-site usage
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};

// Create the auth handler
const handler = NextAuth(authOptions);

// Export the handler functions
export { handler as GET, handler as POST }; 