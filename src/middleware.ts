import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/dashboard"];  // Prefixes für Gruppen

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const pathname = req.nextUrl.pathname;

  // Prüfe Prefix für alle Subrouten
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
