import { Link, usePage } from "@inertiajs/react";
import { Compass, Search, Film, Tv, ShoppingCart, UserPen, LogOut } from "lucide-react";

const menu = [
    {
        name: "BROWSE",
        icon: <Compass size={20} />,
        href: "/",
        isActive: (url) => url === "/",
    },
    {
        name: "SEARCH",
        icon: <Search size={20} />,
        href: "/search",
        isActive: (url) => url.startsWith("/search"),
    },
    {
        name: "MOVIES",
        icon: <Film size={20} />,
        href: "/movies",
        isActive: (url) => url.startsWith("/movies"),
    },
    {
        name: "TV SHOWS",
        icon: <Tv size={20} />,
        href: "/tv-shows",
        isActive: (url) => url.startsWith("/tv-shows"),
    },
    {
        name: "CART",
        icon: <ShoppingCart size={20} />,
        href: "/cart",
        isActive: (url) => url.startsWith("/cart"),
    },
    {
        name: "PROFILE",
        icon: <UserPen size={20} />,
        href: "/profile",
        isActive: (url) => url.startsWith("/profile"),
    },
]

const Sidebar = () => {
    const { url } = usePage();

    return (
        <div className="w-64">
            <div className="px-6 pt-5 text-gray-500">Menu</div>
            <ul className="menu grow">
                {menu.slice(0, 4).map((m, i) => {
                    const isActive = m.isActive(url);

                    return (
                        <li key={i}>
                            <Link href={m.href} className={`group flex items-center justify-between w-full ${isActive ? 'bg-primary text-background pointer-events-none' : 'text-white'}`}>
                                {m.name}{m.icon}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <div className="px-6 pt-5 text-gray-500">Account</div>
            <ul className="menu grow">
                {menu.slice(4, 6).map((m, i) => {
                    const isActive = m.isActive(url);

                    return (
                        <li key={i}>
                            <Link href={m.href} className={`group flex items-center justify-between w-full ${isActive ? 'bg-primary text-background pointer-events-none' : 'text-white'}`}>
                                {m.name}{m.icon}
                            </Link>
                        </li>
                    );
                })}
                
                {/* logout */}
                <li>
                    <Link href={route("logout")} method="POST" as="button" className={`group flex items-center justify-between w-full text-white`}>
                        LOGOUT<LogOut size={20} />
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;
