"use client";

import { useChatSocket } from "@/context/ChatSocket";
import React from "react";
import SectionBox from "../common/SectionBox";
import useTime from "@/hooks/useTime";

const ClientStatus = () => {
    const chatSocket = useChatSocket();
    const time = useTime();

    return (
        <SectionBox label="Client" labelVariants={{ color: "green" }}>
            <div className="w-full *:whitespace-nowrap *:truncate">
                <p>Status: {chatSocket.isConnected ? "connected" : "disconnected"}</p>
                <p>ClientID: {chatSocket.clientId}</p>
                <p suppressHydrationWarning>Time: {time.toLocaleString()}</p>
            </div>
        </SectionBox>
    );
};

export default ClientStatus;
