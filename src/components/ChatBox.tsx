"use client";

import { useChatSocket } from "@/context/ChatSocket";
import React, { useEffect, useRef } from "react";

const ChatBox = () => {
    const chatSocket = useChatSocket();
    const chatBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatSocket.chat]);

    return (
        <div className="flex-grow flex flex-col overflow-hidden">
            <p className="text-gray">here lies the beginning of the chat...</p>
            {chatSocket?.chat?.map((message, index) => (
                <p key={index}>
                    {message.name}: {message.message}
                </p>
            ))}
        </div>
    );
};

export default ChatBox;
