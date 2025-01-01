import { cn } from "@/libs/utils";
import React, { forwardRef, HTMLAttributes } from "react";

const BasicContainer = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
    return (
        <div
            {...props}
            className={cn(
                "border-2 p-1 px-2 border-gray overflow-hidden",
                props.className
            )}
            ref={ref}
        >
            {props.children}
        </div>
    );
});

BasicContainer.displayName = "BasicContainer";

export default BasicContainer;
