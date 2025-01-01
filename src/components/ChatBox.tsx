"use client";

import { useChatSocket } from "@/context/ChatSocket";
import React, { useEffect, useRef } from "react";
import { BasicContainer } from "./common";

const ChatBox = () => {
    const chatSocket = useChatSocket();
    const chatBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatSocket.chat]);

    return (
        <BasicContainer
            ref={chatBoxRef}
            className="grow overflow-hidden overflow-y-scroll"
        >
            <p className="text-gray min-w-full">
                here lies the beginning of the chat...
            </p>
            {chatSocket?.chat?.map((message, index) => (
                <div className="flex break-all" key={index}>
                    <p>
                        {message.name}: {message.message}
                    </p>
                </div>
            ))}
        </BasicContainer>
    );
};

export default ChatBox;
