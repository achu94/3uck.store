import { signOut } from "next-auth/react";

export async function GET() {
    await signOut({ redirectTo: "/" })
}
