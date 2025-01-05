"use client";

import React, { createContext, HTMLAttributes, useContext } from "react";

type DialogContextType = {
    isOpen: boolean;
    handleOpen: () => void;
    handleClose: () => void;
};

const DialogContext = createContext({} as DialogContextType);
export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a Dialog");
    }
    return context;
};

export const Dialog = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return <DialogContext.Provider value={{ isOpen, handleOpen, handleClose }}>{children}</DialogContext.Provider>;
};

interface DialogTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const DialogTrigger = ({ children, ...props }: DialogTriggerProps) => {
    const { handleOpen } = useDialog();
    return (
        <button {...props} onClick={handleOpen}>
            {children}
        </button>
    );
};
