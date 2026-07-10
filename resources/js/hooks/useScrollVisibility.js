import { useEffect, useState } from "react";

const useScrollVisibility = (enabled) => {
    const [atTop, setAtTop] = useState(true);

    useEffect(() => {
        if (!enabled) return;

        const handleScroll = () => setAtTop(window.scrollY <= window.innerHeight);
        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [enabled]);

    return enabled ? atTop : false;
}

export default useScrollVisibility;