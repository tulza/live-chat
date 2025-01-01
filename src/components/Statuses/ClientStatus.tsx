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
            <p className=" w-[220px] whitespace-nowrap truncate">
                ClientID: {chatSocket.clientId}
            </p>
        </SectionBox>
    );
};

export default ClientStatus;
