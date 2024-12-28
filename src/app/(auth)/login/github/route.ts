// app/login/github/route.ts
import { github } from "@/libs/server/oauth";
import { generateState } from "arctic";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
    const state = generateState();
    const url = github.createAuthorizationURL(state, []);

    const cookieStore = await cookies();
    cookieStore.set("github_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
    });

    return new Response(null, {
        status: 302, //redirection FOUND
        headers: { Location: url.toString() },
    });
}
