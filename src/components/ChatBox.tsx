import { ChatContextType } from "@/context/ChatSocket";
import React, { useEffect, useRef } from "react";
import { BasicContainer, Label } from "./common";

const ChatBox = ({ ...chatSocket }: ChatContextType) => {
    const chatBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatSocket.chat]);

    return (
        <div className="flex-grow flex flex-col overflow-hidden">
            <Label>Chat</Label>
            <BasicContainer
                className="h-full flex-col overflow-y-auto"
                ref={chatBoxRef}
            >
                <p className="text-primary/50">
                    here lies the beginning of the chat...
                </p>
                {chatSocket?.chat?.map((message, index) => (
                    <p key={index}>
                        {message.name.slice(0, 6)}: {message.message}
                    </p>
                ))}
            </BasicContainer>
        </div>
    );
};

export default ChatBox;
