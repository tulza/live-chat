"use client";

import React, { useEffect, useState } from "react";
import { socket } from "@/socket";
import SectionBox from "../common/SectionBox";

const ServerStatus = () => {
    const [userCount, setUserCount] = useState<string | number>("N/A");

    const handleSetCount = (count: number) => {
        setUserCount(count);
    };

    useEffect(() => {
        socket.on("numberOfUsers", handleSetCount);
        return () => {
            socket.off("numberOfUsers", handleSetCount);
        };
    }, []);

    return (
        <SectionBox label="Server" labelVariants={{ color: "blue" }}>
            <p>users online: {userCount}</p>
        </SectionBox>
    );
};

export default ServerStatus;
