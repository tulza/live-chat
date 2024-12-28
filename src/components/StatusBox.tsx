import { ChatContextType } from "@/context/ChatSocket";
import React from "react";
import { Label, BasicContainer } from "./common";

const StatusBox = ({ ...chatSocket }: ChatContextType) => {
    return (
        <div>
            <Label>Status</Label>
            <BasicContainer>
                <p>
                    Status:{" "}
                    {chatSocket.isConnected ? "connected" : "disconnected"}
                </p>
                <p>Transport: {chatSocket.transport}</p>
                <p>client: {chatSocket.clientId}</p>
            </BasicContainer>
        </div>
    );
};

export default StatusBox;
