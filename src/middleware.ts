import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// CSRF protection
export async function middleware(request: NextRequest): Promise<NextResponse> {
    if (request.method === "GET") {
        const response = NextResponse.next();

        const token = request.cookies.get("token")?.value ?? null;
        if (token !== null) {
            response.cookies.set("session", token, {
                // HttpOnly: Cookies are only accessible server-side
                // SameSite=Lax: Use Strict for critical websites
                // Secure: Cookies can only be sent over HTTPS (Should be omitted when testing on localhost)
                // Max-Age or Expires: Must be defined to persist cookies
                // Path=/: Cookies can be accessed from all routes

                path: "/",
                maxAge: 60 * 60 * 24 * 30,
                sameSite: "lax",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            });
        }

        return response;
    }

    const originHeader = request.headers.get("Origin");
    const hostHeader = request.headers.get("Host");
    if (originHeader === null || hostHeader === null) {
        return new NextResponse(null, { status: 403 });
    }
    let origin: URL;
    try {
        origin = new URL(originHeader);
    } catch {
        return new NextResponse(null, { status: 403 });
    }

    if (origin.host !== hostHeader) {
        return new NextResponse(null, { status: 403 });
    }

    return NextResponse.next();
}
