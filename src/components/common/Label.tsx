import { cn } from "@/libs/utils";
import React, { HTMLAttributes } from "react";
import { tv, VariantProps } from "tailwind-variants";

const label = tv({
    base: "p-1 w-full",
    variants: {
        color: {
            primary: "bg-primary text-background",
            secondary: "border-2 border-primary text-primary bg-none",
        },
    },
    defaultVariants: {
        color: "primary",
    },
});

interface LabelProps extends HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
    variants?: VariantProps<typeof label>;
}

const Label = ({ children, variants, ...props }: LabelProps) => {
    return (
        <p {...props} className={cn(props.className, label({ ...variants }))}>
            {children}
        </p>
    );
};

export default Label;
