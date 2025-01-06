import React from "react";
import SectionBox from "../common/SectionBox";
import { Label } from "../common";
import { changelogData } from "@/data/changelogs.data";
import { Dialog, DialogTrigger } from "../ui/Dialog";
import ChangelogDialog from "./changelog/ChangelogDialog";

const ChangeLogStatus = async () => {
    const latestLog = changelogData[0];

    return (
        <SectionBox label="Change log" labelVariants={{ color: "gray" }}>
            <p>v-{latestLog.version} </p>
            <ul className="list-outside pl-4">
                {latestLog.changes.map((change, i) => (
                    <li className="list-disc" key={i}>
                        {change}
                    </li>
                ))}
            </ul>
            <Dialog>
                <DialogTrigger className="w-full my-1 mt-2">
                    <Label variants={{ color: "gray" }}>See full changelog</Label>
                </DialogTrigger>
                <ChangelogDialog />
            </Dialog>
        </SectionBox>
    );
};

export default ChangeLogStatus;
