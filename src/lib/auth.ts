import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import prisma from "./prisma";

export const {
  handlers,
  signIn,
  signOut,
  auth: baseAuth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          access_type: "offline",
          response_type: "code",
          scope:
            "openid email profile https://www.googleapis.com/auth/drive.file",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.accessToken = token.accessToken as string;
      }

      if (session.user?.email) {
        await prisma.user.update({
          where: { email: session.user.email },
          data: { lastLogin: new Date() },
        });
      }

      return session;
    },
    async signIn({ profile }) {
      return profile?.email === process.env.ADMIN_EMAIL;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
