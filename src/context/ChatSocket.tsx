"use client";

import { useCallback, useEffect, useState } from "react";
import { socket } from "../socket";
import React, { createContext, useContext } from "react";
import SOCKET from "@/shared/socketEnum";
import DBfetchMessage from "@/actions/fetchMessage";
import DBsendMessage from "@/actions/sendMessage.ts";
import { Filter } from "bad-words";

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
    socketId?: string;
};

const ChatContext = createContext<ChatContextType>({} as ChatContextType);
const filter = new Filter();

export const useChatSocket = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChatSocket must be used within a ChatSocketProvider");
    }
    return context;
};

const ChatSocket = ({ children }: { children: React.ReactNode }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    const [clientId, setServerId] = useState("N/A");
    const [chat, setChat] = useState<Message[]>([]);

    const sendMessage = (message: Message) => {
        message.message = filter.clean(message.message);

        setChat((prev) => [...prev, message]);
        DBsendMessage(message);
        AddMessage(message);
        socket.emit(SOCKET.MESSAGE, message);
    };

    const AddMessage = useCallback(
        (message: Message) => {
            if (!message || message.socketId === clientId) return;
            setChat((prev) => [...prev, message]);
        },
        [clientId]
    );

    const onConnect = useCallback(async () => {
        setIsConnected(true);
        setServerId(socket.io.engine.id);
        setTransport(socket.io.engine.transport.name);

        const messages = await DBfetchMessage();
        setChat(messages);

        socket.io.engine.on("upgrade", (transport) => {
            setTransport(transport.name);
        });
    }, []);

    const onDisconnect = useCallback(() => {
        setIsConnected(false);
        setTransport("N/A");
    }, []);

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        const handleMessage = (message: Message) => {
            AddMessage(message);
        };

        socket.on(SOCKET.CONNECT, onConnect);
        socket.on(SOCKET.DISCONNECT, onDisconnect);
        socket.on(SOCKET.MESSAGE, handleMessage);

        return () => {
            socket.off(SOCKET.CONNECT, onConnect);
            socket.off(SOCKET.DISCONNECT, onDisconnect);
            socket.off(SOCKET.MESSAGE, handleMessage);
        };
    }, [AddMessage, onConnect, onDisconnect]);

    return (
        <ChatContext.Provider
            value={{
                isConnected,
                transport,
                clientId,
                chat,
                sendMessage,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export default ChatSocket;
