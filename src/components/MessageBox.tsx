import { ChatContextType } from "@/context/ChatSocket";
import React, { useRef } from "react";
import Label from "./common/Label";
import { User } from "@/libs/server/user";

interface MessageBoxProps extends ChatContextType {
    user: User | null;
}

const MessageBox = ({ user, ...chatSocket }: MessageBoxProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <Label>Send a message</Label>
            <form
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();

                    if (!inputRef?.current) return;

                    const input = inputRef.current?.value || "";
                    const name =
                        user?.username ||
                        `anon(${chatSocket.clientId.slice(0, 5)})`;
                    chatSocket.sendMessage({
                        name: name,
                        socketId: chatSocket.clientId,
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

export default MessageBox;
