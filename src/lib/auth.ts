import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { getUserByProviderId, createUser, getUserByEmail } from "@/services/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_AUTH_GOOGLE_SECRET!,
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await getUserByEmail(credentials.email as string);
                if (!user || !user.password) {
                    return null;
                }

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image
                };
            }
        })
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
            const u = user as typeof user & { dbUserId?: string; providerId?: string };
            // Credentials login
            if (account?.provider === "credentials") {
                u.dbUserId = user.id;
                u.providerId = "credentials";
                return true;
            }

            // OAuth login
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

            u.dbUserId = dbUser.id;
            u.providerId = account.providerAccountId;

            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                const u = user as typeof user & { dbUserId?: string; providerId?: string };
                token.userId = u.dbUserId;
                token.providerId = u.providerId;
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
            return `${baseUrl}`;
        },
    },
});
