import { ChatContextType } from "@/context/ChatSocket";
import React, { useEffect, useState } from "react";
import { Label, BasicContainer } from "./common";
import { socket } from "@/socket";

const StatusBox = ({ ...chatSocket }: ChatContextType) => {
    const [userCount, setUserCount] = useState<string | number>("N/A");

    const handleSetCount = (count: number) => {
        console.log(count);
        setUserCount(count);
    };

    useEffect(() => {
        socket.on("numberOfUsers", handleSetCount);
        return () => {
            socket.off("numberOfUsers", handleSetCount);
        };
    }, []);

    return (
        <div>
            <Label>Status</Label>
            <BasicContainer>
                <p>
                    Status:{" "}
                    {chatSocket.isConnected ? "connected" : "disconnected"}
                </p>
                <p>Client Id: {chatSocket.clientId}</p>
                <p>users online: {userCount}</p>
            </BasicContainer>
        </div>
    );
};

export default StatusBox;
