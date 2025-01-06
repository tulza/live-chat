"use server";

import { Message } from "@/context/ChatSocket";
import { prisma } from "@/libs/server/db";
import { Prisma } from "@prisma/client";

const DBsendMessage = async (message: Message) => {
    const createdmessage: Prisma.MessageCreateInput = {
        message: message.message,
        username: message.name,
    };

    const messages = await prisma.message.create({ data: createdmessage });
    return messages;
};

export default DBsendMessage;
