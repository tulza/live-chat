"use client";

import React, { useRef } from "react";
import { useChatSocket } from "../context/ChatSocket";

const ChatRoom = () => {
    const chatSocket = useChatSocket();
    const inputRef = useRef<HTMLInputElement>(null);
    const chatBoxRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatSocket.chat]);

    return (
        <div className="p-4 text-primary h-dvh flex flex-col">
            {/* Status */}
            <p className="p-1 bg-primary text-background">Status</p>
            <div className="border p-2 border-primary">
                <p>
                    Status:{" "}
                    {chatSocket.isConnected ? "connected" : "disconnected"}
                </p>
                <p>Transport: {chatSocket.transport}</p>
                <p>client: {chatSocket.clientId}</p>
            </div>
            <p className="p-1 bg-primary text-background mt-4">Chat</p>
            {/* Chat */}
            <div
                className="border p-2 border-primary flex flex-grow flex-col overflow-y-auto"
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
            </div>
            {/* Message */}
            <p className="p-1 bg-primary text-background mt-4">
                Send a message
            </p>
            <form
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();

                    if (!inputRef?.current) return;

                    const input = inputRef.current?.value || "";
                    chatSocket.sendMessage({
                        name: chatSocket.clientId,
                        message: input,
                        time: new Date().toLocaleTimeString(),
                    });
                    inputRef.current!.value = "";
                }}
            >
                <div className="border p-2 whitespace-pre border-primary flex">
                    &gt;{" "}
                    <input
                        ref={inputRef}
                        required
                        autoFocus
                        type="text"
                        className=" bg-transparent placeholder:text-primary/50 outline-none whitespace-nowrap w-full"
                        placeholder="send your message by pressing enter..."
                    />
                </div>
            </form>
        </div>
    );
};

export default ChatRoom;
