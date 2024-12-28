"use client";

import React from "react";
import { useChatSocket } from "../context/ChatSocket";
import StatusBox from "./StatusBox";
import ChatBox from "./ChatBox";
import MessageBox from "./MessageBox";
import AccountBox from "./AccountBox";

const ChatRoom = () => {
    const chatSocket = useChatSocket();

    return (
        <>
            <div className="grid grid-cols-2 gap-2 h-min">
                <StatusBox {...chatSocket} />
                <AccountBox />
            </div>
            <ChatBox {...chatSocket} />
            <MessageBox {...chatSocket} />
        </>
    );
};

export default ChatRoom;
