import { BasicContainer, Label } from "@/components/common";
import Link from "next/link";

export default async function LoginPage() {
    return (
        <div className="flex flex-col h-full justify-center gap-4">
            <div className="grid grid-cols-4">
                <Link href="/">
                    <Label variants={{ color: "ghost" }}>Back to chat</Label>
                </Link>
                <Label className="col-span-3" variants={{ color: "red" }}>
                    Login Page
                </Label>
            </div>
            <BasicContainer className="p-0 flex-col flex">
                <Link href="/login/github" className="px-2 hover:bg-gray">
                    Login with Github
                </Link>
                <Link href="/login/google" className="px-2 hover:bg-gray">
                    Login with Google
                </Link>
            </BasicContainer>
        </div>
    );
}
