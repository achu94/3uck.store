import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { getUserByProviderId, createUser } from "./services/user";
import type { UserInsert } from "./types/public.users";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email || !account?.providerAccountId) return false;

      const dbUser = await getUserByProviderId(account?.providerAccountId);

      if (!dbUser) {
        const newUser: UserInsert = {
          email: user.email,
          name: user.name ?? "No Name",
          image: user.image ?? null,
          provider: account?.provider,
          password: null,
          provider_id: account?.providerAccountId,
        };

        await createUser(newUser);
      }

      return true;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
    async session({ session, token }) {
      if (session.user?.name) {
        session.user.name = token.name;
      }

      return session;
    },
    async jwt({ token, user }) {
      let newUser = { ...user } as any;
      if (newUser.first_name && newUser.last_name) {
        token.name = `${newUser.first_name} ${newUser.last_name}`;
      }
      return token;
    },
  },
});
