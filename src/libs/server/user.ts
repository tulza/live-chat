import { prisma } from "./db";

export async function createUserWithGithub(
    githubId: number,
    username: string
): Promise<User> {
    const user = await prisma.user.create({
        data: { githubId, username },
    });
    if (user === null) {
        throw new Error("Unexpected error");
    }

    return user;
}

export async function getUserFromGitHubId(
    githubId: number
): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: { githubId: githubId },
    });

    if (!user) return null;

    return user;
}

export interface User {
    id: number;
    githubId: number | null;
    googleId: number | null;
    username: string;
}
