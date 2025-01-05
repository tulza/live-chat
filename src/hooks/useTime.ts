"use client";

import React, { useEffect } from "react";

const useTime = () => {
    const [time, setTime] = React.useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(id);
    }, []);

    return time;
};

export default useTime;
