"use client";

import { useDialog } from "@/components/ui/Dialog";
import { changelogData } from "@/data/changelogs.data";
import { easeOutExpo } from "@/libs/ease";
import { AnimatePresence, motion, type Variants } from "motion/react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const ChangelogDialog = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { isOpen, handleClose } = useDialog();

    useEffect(() => {
        if (!ref.current) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Element)) {
                handleClose();
            }
        };

        ref.current.focus({ preventScroll: true });
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    });

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="exit"
                    variants={modalVariants}
                    className="z-50 fixed inset-0 w-dvw h-dvh flex justify-center items-center "
                >
                    <motion.div
                        ref={ref}
                        variants={conVariants}
                        className="p-4 bg-background origin-center overflow-y-scroll tiny-scrollbar border-4 border-gray overflow-hidden"
                    >
                        <h3 className="text-xl">Changelog</h3>
                        <hr className="border-gray my-2" />

                        {changelogData.map((log, i) => (
                            <motion.div variants={labelVariants} key={i}>
                                <h4 className="text-lg">{log.version}</h4>
                                <ul className="list-outside pl-4">
                                    {log.changes.map((change, i) => (
                                        <li className="list-disc" key={i}>
                                            {change}
                                        </li>
                                    ))}
                                </ul>
                                {log.image && (
                                    <div className="w-full relative mt-2 aspect-video">
                                        <Image
                                            fill
                                            src={log.image.src}
                                            alt={log.image.alt}
                                        />
                                    </div>
                                )}
                                <hr className="border-gray my-2" />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const labelVariants: Variants = {
    closed: {
        opacity: 0,
        y: 16,
    },
    open: {
        opacity: 1,
        y: 0,
        transition: { delay: 0.75, duration: 0.5, ease: easeOutExpo },
    },
    exit: {
        opacity: 0,
        y: 16,
    },
};

const conVariants: Variants = {
    closed: {
        padding: "0px",
        width: "0px",
        borderWidth: "0px",
    },
    open: {
        borderWidth: ["0px", "2px", "4px"],
        width: ["0px", "300px", "300px"],
        height: ["0px", "0px", "400px"],
        padding: ["0px", "0px", "16px"],
        transition: { duration: 0.75, ease: easeOutExpo },
    },
    exit: {
        borderWidth: ["4px", "2px", "0px"],
        padding: ["16px", "0px", "0px"],
        height: ["400px", "0px", "0px"],
        width: ["300px", "300px", "0px"],
        transition: { duration: 0.75, delay: 0.05, ease: easeOutExpo },
    },
};
const modalVariants: Variants = {
    closed: {
        background: "#0000",
    },
    open: {
        background: "#0008",
    },
    exit: {
        background: "#0000",
    },
};

export default ChangelogDialog;
