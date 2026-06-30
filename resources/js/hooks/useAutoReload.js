import { router } from "@inertiajs/react";
import { useEffect, useRef } from "react";

const hasPendingValue = (value) => {
    if (value == null) {
        return true;
    }

    if (Array.isArray(value)) {
        return false;
    }

    if (typeof value === "object") {
        return Object.values(value).some(hasPendingValue);
    }

    return false;
};

const useAutoReload = (propName, value, interval = 3000) => {
    const isReloadingRef = useRef(false);

    useEffect(() => {
        if (!hasPendingValue(value)) {
            return undefined;
        }

        const poll = () => {
            if (isReloadingRef.current) {
                return;
            }

            isReloadingRef.current = true;

            router.reload({
                only: [propName],
                preserveState: true,
                preserveScroll: true,
                onFinish: () => {
                    isReloadingRef.current = false;
                },
            });
        };

        const timer = window.setInterval(poll, interval);

        return () => {
            window.clearInterval(timer);
        };
    }, [interval, propName, value]);
};

export default useAutoReload;