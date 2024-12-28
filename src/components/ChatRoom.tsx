"use client";

import React from "react";
import { useChatSocket } from "../context/ChatSocket";
import StatusBox from "./StatusBox";
import ChatBox from "./ChatBox";
import MessageBox from "./MessageBox";
import AccountBox from "./AccountBox";
import { User } from "@/libs/server/user";

const ChatRoom = ({ user }: { user: User | null }) => {
    const chatSocket = useChatSocket();
    return (
        <>
            <div className="grid grid-cols-2 gap-2 h-min">
                <StatusBox {...chatSocket} />
                <AccountBox {...chatSocket} user={user} />
            </div>
            <ChatBox {...chatSocket} />
            <MessageBox {...chatSocket} user={user} />
        </>
    );
};

export default ChatRoom;
