import { Link, usePage } from "@inertiajs/react";
import { Compass, Search, Film, Tv, ShoppingCart, UserPen, LogOut } from "lucide-react";

const menu = [
    {
        name: "BROWSE",
        icon: <Compass size={20} />,
        href: "/"
    },
    {
        name: "SEARCH",
        icon: <Search size={20} />,
        href: "/search"
    },
    {
        name: "MOVIES",
        icon: <Film size={20} />,
        href: "/movies"
    },
    {
        name: "TV SHOWS",
        icon: <Tv size={20} />,
        href: "/tv-shows"
    },
    {
        name: "CART",
        icon: <ShoppingCart size={20} />,
        href: "/cart"
    },
    {
        name: "PROFILE",
        icon: <UserPen size={20} />,
        href: "/profile"
    },
]

const Sidebar = () => {
    const { url } = usePage();

    return (
        <div className="w-64">
            <div className="px-6 pt-5 text-gray-500">Menu</div>
            <ul className="menu grow">
                {menu.slice(0, 4).map((m, index) => {
                    const isActive =
                        m.href === '/'
                            ? url === '/'
                            : url.startsWith(m.href);
                    return (
                        <li key={index}>
                            <Link href={m.href} className={`group flex items-center justify-between w-full ${isActive ? 'bg-primary text-background pointer-events-none' : 'text-white'}`}>
                                {m.name}{m.icon}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <div className="px-6 pt-5 text-gray-500">Account</div>
            <ul className="menu grow">
                {menu.slice(4, 6).map((m, index) => (
                    <li key={index}>
                        <Link href={m.href} className={`group flex items-center justify-between w-full ${url.startsWith(m.href) ? 'bg-primary text-background pointer-events-none' : 'text-white'}`}>
                            {m.name}{m.icon}
                        </Link>
                    </li>
                ))}
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