"use server";

import { prisma } from "@/libs/server/db";
import {
    encodeBase32LowerCaseNoPadding,
    encodeHexLowerCase,
} from "@oslojs/encoding";
import { cookies } from "next/headers";
import { Session } from "@prisma/client";
import { cache } from "react";
import { User } from "./user";
// import type { User, Session } from "@prisma/client";

export async function generateSessionToken(): Promise<string> {
    console.log("generating session token");

    // generate random bytes
    const byte = new Uint8Array(24);
    crypto.getRandomValues(byte);

    // encode to base32
    const token = encodeBase32LowerCaseNoPadding(byte);
    return token;
}

export async function createSession(
    token: string,
    userId: number
): Promise<Session> {
    const sessionId = encodeHexLowerCase(new TextEncoder().encode(token));
    // session expires in 30 days
    const session: Session = {
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    };

    await prisma.session.create({ data: session });
    return session;
}

export async function validateSessionToken(
    token: string
): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(new TextEncoder().encode(token));
    const result = await prisma.session.findUnique({
        // ^?
        where: { id: sessionId },
        include: { user: true },
    });

    if (!result) return { session: null, user: null };

    const { user, ...session } = result;
    //      ^?

    // for typescript
    if (!session) return { session: null, user: null };
    // check if session is expired
    if (Date.now() >= session.expiresAt.getTime()) {
        await prisma.session.delete({ where: { id: sessionId } });
        return { session: null, user: null };
    }
    // renew session if 15 days left
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session!.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await prisma.session.update({
            where: {
                id: session.id,
            },
            data: {
                expiresAt: session.expiresAt,
            },
        });
    }
    return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
    await prisma.session.delete({ where: { id: sessionId } });
}

export async function setSessionTokenCookie(
    token: string,
    expiresAt: Date
): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        path: "/",
    });
}

export async function deleteSessionTokenCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set("session", "", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/",
    });
}

export const getCurrentSession = cache(
    async (): Promise<SessionValidationResult> => {
        const cookieStore = await cookies();
        const token = cookieStore.get("session")?.value ?? null;
        if (token === null) {
            return { session: null, user: null };
        }
        const result = await validateSessionToken(token);
        return result;
    }
);

export type SessionValidationResult =
    | { session: Session; user: User }
    | { session: null; user: null };
