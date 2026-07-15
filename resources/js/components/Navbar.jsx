import { useEffect, useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { UserPen, Plus, LogIn, LogOut, Search as SearchIcon } from "lucide-react";
import Profile from "@/assets/images/profile.png";
import useScrollVisibility from "@/hooks/useScrollVisibility";
import Search from "./Search";

const Navbar = ({ withScrollBehavior = false }) => {
    const { url, props } = usePage();
    const isLoggedIn = !!props.auth?.user;
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const atTop = useScrollVisibility(withScrollBehavior);
    const dropdownRef = useRef(null);

    const navMenu = [
        { id: 1, name: "Browse", href: "/", isActive: (u) => u === "/" },
        { id: 2, name: "Movies", href: "/movies", isActive: (u) => u.startsWith("/movies") },
        { id: 3, name: "Tv Shows", href: "/tv-shows", isActive: (u) => u.startsWith("/tv-shows") },
    ];

    const profileMenu = [
        { id: 1, name: "Profile", href: "/profile", icon: <UserPen size={16} /> },
        { id: 2, name: "Watchlist", href: "/watchlist", icon: <Plus size={16} /> },
    ];

    // close dropdown when clicking outside
    useEffect(() => {
        if (!menuOpen) return;

        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleOutsideClick);
        return () => document.removeEventListener("pointerdown", handleOutsideClick);
    }, [menuOpen]);

    // lock / unlock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <nav className={`max-w-[1380px] rounded-full mx-auto z-50 p-3 transition-[transform,background-color,position] duration-300 ${
            atTop
                ? "absolute top-2 left-0 right-0 bg-transparent"
                : "fixed top-2 left-0 right-0 bg-black/80 shadow-lg border border-white/20 backdrop-blur-sm"
        }`}>
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
                <div className="flex gap-8">
                    {navMenu.map((m) => {
                        const isActive = m.isActive(url);

                        return (
                            <Link
                                key={m.id}
                                href={m.href}
                                className={`text-lg font-semibold transition-colors ${isActive
                                    ? "underline underline-offset-8 decoration-2 decoration-red-600 text-white"
                                    : "text-white/50 hover:text-white/60"
                                    }`}
                            >
                                {m.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="flex gap-4 items-center">
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="bg-white/20 flex justify-center items-center rounded-full size-10 hover:bg-white/30 transition-colors text-white hover:text-red-600"
                    >
                        <SearchIcon size={24} />
                    </button>

                    {/* dropdown / login */}
                    {isLoggedIn ? (
                    <div ref={dropdownRef} className="relative">
                        <button
                            id="profile-menu-btn"
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="flex justify-center items-center rounded-full size-10 ring-2 ring-transparent hover:ring-white/50 transition-all duration-200"
                            aria-haspopup="true"
                            aria-expanded={menuOpen}
                            aria-controls="profile-dropdown"
                        >
                            <img src={Profile} className="rounded-full size-10 object-cover" alt="Profile" />
                        </button>

                        {/* dropdown panel */}
                        <div
                            id="profile-dropdown"
                            role="menu"
                            aria-label="Profile menu"
                            className={`
                                absolute top-12 right-0 w-52
                                bg-black border border-white/20
                                rounded-xl rounded-tr-none shadow-2xl overflow-hidden
                                transition-all duration-200 origin-top-right
                                ${menuOpen
                                    ? "opacity-100 scale-100 pointer-events-auto"
                                    : "opacity-0 scale-95 pointer-events-none"
                                }
                            `}
                        >
                            <div className="px-4 py-3 border-b border-white/10">
                                <p className="text-xs text-white uppercase tracking-widest font-medium">Account</p>
                            </div>

                            {/* menu items */}
                            <ul className="py-1">
                                {profileMenu.map((item) => (
                                    <li key={item.id} role="menuitem">
                                        <Link
                                            href={item.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 text-sm text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                                        >
                                            <span className="text-white/50">{item.icon}</span>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}

                                {/* divider */}
                                <li role="separator" className="border-t border-white/10 my-1" />

                                <li role="menuitem">
                                    <Link
                                        href={route("logout")}
                                        method="POST"
                                        as="button"
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                    >
                                        <LogOut size={16} /> Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    ) : (
                        <Link
                            href={route("login")}
                            className="flex justify-center items-center gap-2 px-4 py-2 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary/85 transition-colors"
                        >
                            <LogIn size={18} />
                            <span>Login</span>
                        </Link>
                    )}
                </div>
            </div>
            <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </nav>
    )
}

export default Navbar;