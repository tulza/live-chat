import { generateSessionToken, createSession, setSessionTokenCookie } from "@/libs/server/session";
import { cookies } from "next/headers";

import type { OAuth2Tokens } from "arctic";
import { createUserWithGithub, getUserFromGitHubId } from "@/libs/server/user";
import { github } from "@/libs/server/oauth";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // get callback code and state from query
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    // get state from cookie
    const cookieStore = await cookies();
    const storedState = cookieStore.get("github_oauth_state")?.value ?? null;

    // check if all value exist
    if (code === null || state === null || storedState === null) {
        return new Response(null, {
            status: 400,
        });
    }

    let tokens: OAuth2Tokens;
    try {
        // validate code
        tokens = await github.validateAuthorizationCode(code);
    } catch {
        // invalidate code or client credentials
        return new Response(null, {
            status: 400,
        });
    }

    const githubUserResponse = await fetch("https://api.github.com/user", {
        mode: "cors",
        headers: {
            Authorization: `Bearer ${tokens.accessToken()}`,
        },
    });

    console.log(githubUserResponse);

    const githubUser = await githubUserResponse.json();
    const githubUserId = githubUser.id;
    const githubUsername = githubUser.login;

    // check if user is already in db
    const existingUser = await getUserFromGitHubId(githubUserId);

    // generate session token
    if (existingUser !== null) {
        const sessionToken = await generateSessionToken();
        const session = await createSession(sessionToken, existingUser.id);
        await setSessionTokenCookie(sessionToken, session.expiresAt);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/",
            },
        });
    }

    const user = await createUserWithGithub(githubUserId, githubUsername);

    const sessionToken = await generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/",
        },
    });
}
