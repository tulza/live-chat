import { ReactNode } from "react";

type ChangeLog = {
    version: string;
    changes: ReactNode[];
    image?: {
        src: string;
        alt: string;
    };
};

export const changelogData: ChangeLog[] = [
    {
        version: "0.1.3-b",
        changes: ["Display number of users online", "Minor ui fixes"],
    },
    {
        version: "0.1.2-b",
        changes: [
            <p key="0.1.2-b-1" className="rainbow">
                Complete UI overhaul
            </p>,
            "Added github login via lucia auth",
        ],
        image: {
            src: "/image/changelog/oldui.png",
            alt: "v-1.1-b old ui",
        },
    },
    {
        version: "0.1.1-b",
        changes: ["deployed app at on fly.io"],
    },
    {
        version: "0.1.0-b",
        changes: ["initial beta release!"],
    },
];
