import React from "react";
import ClientStatus from "./Statuses/ClientStatus";
import MessageBox from "./MessageBox";
import { User } from "@/libs/server/user";
import { Label } from "./common";
import ServerStatus from "./Statuses/ServerStatus";
import AccountStatus from "./Statuses/AccountStatus";
import ChangeLogStatus from "./Statuses/ChangeLogStatus";
import DirectMessageStatus from "./Statuses/DirectMessageStatus";
import ChatBox from "./ChatBox";

const ChatRoom = ({ user }: { user: User | null }) => {
    return (
        <div className="flex w-[clamp(600px,100%,1440px)] px-8 h-full gap-4 ">
            <div className="w-[250px] flex flex-col gap-4 ">
                <Label>Status</Label>
                <ClientStatus />
                <ServerStatus />
                <AccountStatus user={user} />
                <DirectMessageStatus />
                <ChangeLogStatus />
            </div>
            <div className="w-min grow flex flex-col gap-4">
                <Label>Public chat room</Label>
                <ChatBox />
                <MessageBox user={user} />
            </div>
        </div>
    );
};

export default ChatRoom;
