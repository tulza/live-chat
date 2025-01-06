import React from "react";
import Label, { label } from "./Label";
import BasicContainer from "./BasicContainer";
import { VariantProps } from "tailwind-variants";
import { cn } from "@/libs/utils";

interface SectionBoxProps {
    label: string;
    children: React.ReactNode;
    labelVariants?: VariantProps<typeof label>;
    fill?: boolean;
}

const SectionBox = ({ label, fill, children, labelVariants }: SectionBoxProps) => {
    return (
        <div className={cn("flex flex-col gap-1", fill && "grow")}>
            <Label variants={labelVariants}>{label}</Label>
            <BasicContainer className={cn(fill && "grow")}>{children}</BasicContainer>
        </div>
    );
};

export default SectionBox;
