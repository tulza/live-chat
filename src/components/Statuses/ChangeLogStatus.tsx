import React from "react";
import SectionBox from "../common/SectionBox";

const ChangeLogStatus = () => {
    return (
        <SectionBox label="Change log" labelVariants={{ color: "gray" }}>
            <p>version - 0.1.2 </p>
            <ul>
                <li>- Complete UI overhaul</li>
                <li>- Added github login</li>
            </ul>
        </SectionBox>
    );
};

export default ChangeLogStatus;
