import {
    deleteSessionTokenCookie,
    getCurrentSession,
    invalidateSession,
} from "@/libs/server/session";

export async function GET(): Promise<Response> {
    const session = await getCurrentSession();
    if (!session.session) {
        return new Response(null, { status: 302 });
    }

    invalidateSession(session.session.id);
    deleteSessionTokenCookie();

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/",
        },
    });
}
