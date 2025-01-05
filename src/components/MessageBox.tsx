"use client";

import { useChatSocket } from "@/context/ChatSocket";
import React, { useRef } from "react";
import { User } from "@/libs/server/user";

interface MessageBoxProps {
    user: User | null;
}

const MessageBox = ({ user }: MessageBoxProps) => {
    const chatSocket = useChatSocket();
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <form
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();

                    if (!inputRef?.current) return;

                    const input = inputRef.current?.value || "";
                    const name = user?.username || `anon(${chatSocket.clientId.slice(0, 5)})`;
                    chatSocket.sendMessage({
                        name: name,
                        socketId: chatSocket.clientId,
                        message: input,
                        time: new Date().toLocaleTimeString(),
                    });
                    inputRef.current!.value = "";
                }}
            >
                <div className="border-2 px-2 p-1 whitespace-pre border-gray flex">
                    &gt;{" "}
                    <input
                        ref={inputRef}
                        required
                        autoFocus
                        type="text"
                        className=" bg-transparent placeholder:text-gray outline-none whitespace-nowrap w-full"
                        placeholder="send your message by pressing enter..."
                    />
                </div>
            </form>
        </div>
    );
};

export default MessageBox;
