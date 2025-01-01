import { cn } from "@/libs/utils";
import React, { HTMLAttributes } from "react";
import { tv, VariantProps } from "tailwind-variants";

export const label = tv({
    base: "px-2 w-full border-2 border-black/20",
    variants: {
        color: {
            ghost: "border-gray",
            green: "bg-green",
            blue: "bg-blue",
            red: "bg-red",
            gray: "bg-gray",
        },
    },
    defaultVariants: {
        color: "ghost",
    },
});

interface LabelProps extends HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
    variants?: VariantProps<typeof label>;
}

const Label = ({ children, variants, ...props }: LabelProps) => {
    return (
        <p
            {...props}
            className={cn(
                "whitespace-nowrap",
                props.className,
                label({ ...variants })
            )}
        >
            {children}
        </p>
    );
};

export default Label;
