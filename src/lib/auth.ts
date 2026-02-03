import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { getUserByProviderId, createUser } from "@/services/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_AUTH_GOOGLE_SECRET!,
        }),
    ],

    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
    },

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async signIn({ user, account }) {
            if (!account?.providerAccountId || !user?.email) return false;

            let dbUser = await getUserByProviderId(account.providerAccountId);

            if (!dbUser) {
                dbUser = await createUser({
                    email: user.email,
                    name: user.name ?? "No Name",
                    image: user.image ?? null,
                    provider: account.provider,
                    password: null,
                    provider_id: account.providerAccountId,
                });
            }

            // nur temporär, für den nächsten Schritt
            (user as any).dbUserId = dbUser.id;
            (user as any).providerId = account.providerAccountId;

            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                token.userId = (user as any).dbUserId;
                token.providerId = (user as any).providerId;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user && token.userId) {
                session.user.id = token.userId as string;
            }
            return session;
        },

        async redirect({ baseUrl }) {
            return `${baseUrl}/store`;
        },
    },
});
