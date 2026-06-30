import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Search } from "lucide-react";
import Profile from "../assets/images/profile.png";

const Navbar = () => {
    const { url } = usePage();
    const [visible, setVisible] = useState(false);
    
    const menu = [
        { id: 1, name: "Browse", href: "/", isActive: (url) => url === "/" },
        { id: 2, name: "Movies", href: "/movies", isActive: (url) => url.startsWith("/movies") },
        { id: 3, name: "Tv Shows", href: "/tv-shows", isActive: (url) => url.startsWith("/tv-shows") },
    ]

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > window.innerHeight);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`w-full justify-between fixed top-0 z-50 py-4 bg-black/95 transition-transform duration-300 border-b border-white/50 ${visible ? "translate-y-0" : "-translate-y-full"}`}
        >
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex gap-8">
                    {menu.map((m) => {
                        const isActive = m.isActive(url);

                        return (
                            <Link
                                key={m.id}
                                className={`text-xl font-semibold ${isActive ? "underline underline-offset-8 decoration-2 decoration-red-600 text-white" : "font-semibold text-white/50"}`}
                            >
                                {m.name}
                            </Link>
                        )
                    })}
                </div>
                <div className="flex gap-4">
                    <div className="bg-white/50 flex justify-center items-center rounded-full size-10">
                        <Search size={24} color="white" />
                    </div>
                    <img src={Profile} className="rounded-full size-10" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;