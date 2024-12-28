import React from "react";
import Label from "./common/Label";
import { BasicContainer } from "./common";
import Link from "next/link";

const AccountBox = () => {
    return (
        <div className="flex flex-col">
            <div className="w-full grid grid-cols-3">
                <Label className="col-span-2">Account</Label>
                <Link href="/login">
                    <Label variants={{ color: "secondary" }}>Login</Label>
                </Link>
            </div>
            <BasicContainer className="grow">Account</BasicContainer>
        </div>
    );
};

export default AccountBox;
