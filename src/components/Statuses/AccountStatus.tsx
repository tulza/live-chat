import React from "react";
import Link from "next/link";
import { User } from "@/libs/server/user";
import { BasicContainer, Label } from "../common";

interface AccountBoxProps {
    user: User | null;
}

const AccountStatus = ({ user }: AccountBoxProps) => {
    return (
        <div className="flex flex-col gap-1">
            <div className="w-full grid grid-cols-3">
                <Label variants={{ color: "red" }} className="col-span-2">
                    Account
                </Label>
                {user ? (
                    <Link href="/sign-out">
                        <Label variants={{ color: "gray" }}>Sign out</Label>
                    </Link>
                ) : (
                    <Link href="/login">
                        <Label variants={{ color: "gray" }}>Login</Label>
                    </Link>
                )}
            </div>
            <BasicContainer className="grow">
                {user ? "Logged in as " + user.username : "Not logged in"}
            </BasicContainer>
        </div>
    );
};

export default AccountStatus;
