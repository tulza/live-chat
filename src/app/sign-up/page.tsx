import { BasicContainer, Label } from "@/components/common";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <>
            <div className="grid grid-cols-4">
                <Link href="/login">
                    <Label variants={{ color: "secondary" }}>
                        Back to Login
                    </Label>
                </Link>
                <Label className="col-span-3">Sign-up Page</Label>
            </div>
            <BasicContainer className="grow p-0 flex justify-center items-center">
                <div className="border-r border-primary h-full grow" />
                <div className="w-[clamp(300px,60%,800px)]">
                    <Label>Sign-up Options</Label>
                    <BasicContainer className="border-x-transparent p-0 w-full *:text-left flex flex-col gap-2">
                        <button className="p-1">Sign-up with Google</button>
                        <button className="p-1">Sign-up with Github</button>
                    </BasicContainer>
                </div>
                <div className="border-l border-primary h-full grow" />
            </BasicContainer>
        </>
    );
}
