"use client";

import { useChatSocket } from "@/context/ChatSocket";
import React from "react";
import SectionBox from "../common/SectionBox";

const ClientStatus = () => {
    const chatSocket = useChatSocket();

    return (
        <SectionBox label="Client" labelVariants={{ color: "green" }}>
            <p>
                Status: {chatSocket.isConnected ? "connected" : "disconnected"}
            </p>
            <p>Client Id: {chatSocket.clientId}</p>
        </SectionBox>
    );
};

export default ClientStatus;
