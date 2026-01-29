import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/store"];

export default async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const isProtected = protectedPaths.some((path) =>
        pathname.startsWith(path),
    );

    if (isProtected) {
        const session = await auth();

        if (!session) {
            return NextResponse.redirect(new URL("/auth/signin", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
