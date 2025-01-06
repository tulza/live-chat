"use server";

import { prisma } from "@/libs/server/db";

const DBfetchMessage = async () => {
    const messages = await prisma.message.findMany({
        include: {
            author: {
                select: {
                    username: true,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
        take: 50,
    });

    return messages.map((message) => ({
        name: message.username || "Anonymous",
        time: message.createdAt.toISOString(),
        message: message.message,
    }));
};

export default DBfetchMessage;
