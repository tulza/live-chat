import { BasicContainer, Label } from "@/components/common";
import Link from "next/link";

export default async function LoginPage() {
    return (
        <>
            <div className="grid grid-cols-4">
                <Link href="/">
                    <Label variants={{ color: "secondary" }}>
                        Back to chat
                    </Label>
                </Link>
                <Label className="col-span-3">Login Page</Label>
            </div>
            <BasicContainer className="grow p-0 flex justify-center items-center">
                <div className="border-r border-primary h-full grow" />
                <div className="w-[clamp(300px,60%,800px)]">
                    <div className="grid grid-cols-3">
                        <Label className="col-span-2">Login Options</Label>
                        {/* <Link href="/sign-up">
                            <Label variants={{ color: "secondary" }}>
                                Sign up
                            </Label>
                        </Link> */}
                    </div>
                    <BasicContainer className="border-x-transparent p-0 w-full *:text-left flex flex-col gap-2">
                        {/* <Link href="/login/google" className="p-1">
                            Login with Google
                        </Link> */}
                        <Link href="/login/github" className="p-1">
                            Login with Github
                        </Link>
                    </BasicContainer>
                </div>
                <div className="border-l border-primary h-full grow" />
            </BasicContainer>
        </>
    );
}
