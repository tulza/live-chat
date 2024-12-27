"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import React, { createContext, useContext } from "react";

export type ChatContextType = {
    isConnected: boolean;
    transport: string;
    clientId: string;
    chat: Message[];
    sendMessage: (message: Message) => void;
};

export type Message = {
    name: string;
    time: string;
    message: string;
};

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const useChatSocket = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error(
            "useChatSocket must be used within a ChatSocketProvider"
        );
    }
    return context;
};

const ChatSocket = ({ children }: { children: React.ReactNode }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    const [clientId, setServerId] = useState("N/A");

    const [chat, setChat] = useState<Message[]>([]);

    const sendMessage = (message: Message) => {
        socket.emit("message", message);
        AddMessage(message);
    };

    const AddMessage = (message: Message) => {
        if (!message) return;
        if (message.name === clientId) return;
        setChat((prev) => [...prev, message]);
    };

    // socket connection
    const onConnect = () => {
        setIsConnected(true);
        setServerId(socket.io.engine.id);
        setTransport(socket.io.engine.transport.name);

        socket.io.engine.on("upgrade", (transport) => {
            setTransport(transport.name);
        });
    };

    function onDisconnect() {
        setIsConnected(false);
        setTransport("N/A");
    }

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("message", (message) => {
            AddMessage(message);
        });

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    return (
        <ChatContext.Provider
            value={{
                isConnected,
                transport,
                clientId: clientId,
                chat,
                sendMessage,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export default ChatSocket;
