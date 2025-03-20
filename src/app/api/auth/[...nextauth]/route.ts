import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { AuthOptions } from "next-auth";

// In a production environment, these credentials would be stored in a database
// This is just a temporary solution
const ADMIN_EMAIL = "admin@barelands.vip";
// HARDCODED PASSWORD HASH for 'secure123' - bypassing environment variable issues
const ADMIN_PASSWORD_HASH = "$2b$10$LwtmZiBql13DJYx6Qez5yuKj7IpVFeswMi79IcLXLBJhSk6Kmxb.2";

// Debug logs
console.log('Auth Config - Email:', ADMIN_EMAIL);
console.log('Auth Config - Full Hash:', ADMIN_PASSWORD_HASH);

export const authOptions: AuthOptions = {
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
          // In a real world scenario, you would fetch this from your database
          console.log('Login attempt - Email:', credentials.email);
          
          if (credentials.email === ADMIN_EMAIL) {
            console.log('Email matched, checking password...');
            console.log('Password provided:', credentials.password);
            
            try {
              const passwordMatch = await compare(credentials.password, ADMIN_PASSWORD_HASH);
              console.log('Password match result:', passwordMatch);
              
              if (passwordMatch) {
                console.log('Authentication successful');
                return {
                  id: "1",
                  email: ADMIN_EMAIL,
                  name: "Admin",
                };
              }
            } catch (bcryptError) {
              console.error("Bcrypt error:", bcryptError);
              return null;
            }
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 