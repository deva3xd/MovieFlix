import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Menu, X } from "lucide-react";
import ProfilePicture from "@/assets/images/profile.png";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showList, setShowList] = useState(false);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const imgURL = import.meta.env.VITE_IMGURL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/movie/${query}`);
            const data = await res.json();

            setResult(data);
        } catch (err) {
            console.error("Error :", err);
        }
    }

    return (
        <div className="bg-black text-white fixed top-0 left-0 w-screen sm:w-full z-50 px-8">
            <div className="navbar max-w-screen-2xl mx-auto px-0 flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="#" className="p-0 font-extrabold me-4 text-xl">
                        MovieFlix
                    </Link>

                    <div className="hidden sm:flex space-x-4">
                        <Link
                            href={route("movie")}
                            className="font-light hover:opacity-70 text-sm pb-1"
                        >
                            Movies
                        </Link>
                        <Link
                            href={route("movie")}
                            className="font-light hover:opacity-70 text-sm pb-1"
                        >
                            TV
                        </Link>
                    </div>
                </div>

                {/* search bar */}
                <div className="flex items-center relative">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            autoComplete="off"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setShowList(true)}
                            onBlur={() => setTimeout(() => setShowList(false), 200)}
                            placeholder="Search"
                            className="hidden sm:flex input input-sm rounded-md focus:outline-none bg-custom-primary text-white placeholder-gray-300"
                        />
                    </form>

                    {showList && result.length > 0 && (
                        <ul className="absolute px-1 pt-1 top-24 right-0 sm:top-full mt-2 w-64 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
                            {result.map((item) => {
                                const year = new Date(item.release_date).getFullYear();
                                return (
                                    <li
                                        key={item.id}
                                        className="pb-1 cursor-pointer hover:bg-gray-200 text-black"
                                    >
                                        <Link
                                            href={route("movie.detail", {
                                                id: item.id,
                                                status: "search",
                                            })}
                                        >
                                            <div className="flex">
                                                <img
                                                    src={
                                                        item.poster_path
                                                            ? `${imgURL}/w185/${item.poster_path}`
                                                            : ""
                                                    }
                                                    className="w-12 rounded-md text-xs text-center"
                                                    alt="poster"
                                                />
                                                <div className="flex flex-col justify-center ms-1">
                                                    <span
                                                        className="text-base font-medium line-clamp-1"
                                                        title={item.title}
                                                    >
                                                        {item.title} {year ? `(${year})` : ""}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <div className="dropdown dropdown-end ml-1">
                        <div
                            tabIndex="0"
                            role="button"
                            className="hidden sm:flex btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-9 rounded-full">
                                <img alt="Profile Picture" src={ProfilePicture} />
                            </div>
                        </div>
                        <ul
                            tabIndex="0"
                            className="menu menu-sm dropdown-content z-[1] p-2 shadow rounded-tr-none rounded-md w-52 bg-black border border-custom-primary"
                        >
                            <li>
                                <Link href={route("profile.edit")}>Profile</Link>
                            </li>
                            <li>
                                <Link href={route("cart")}>Cart</Link>
                            </li>
                            <li>
                                <Link href={route("logout")} method="post" as="button">
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* menu button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="sm:hidden ml-3 focus:outline-none"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="sm:hidden bg-black border-t border-gray-700 py-3 space-y-2">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            autoComplete="off"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setShowList(true)}
                            onBlur={() => setTimeout(() => setShowList(false), 200)}
                            placeholder="Search"
                            className="w-full input input-sm rounded-md focus:outline-none bg-custom-primary text-white placeholder-gray-300"
                        />
                    </form>
                    <Link
                        href={route("movie")}
                        className="block text-sm font-light hover:opacity-70"
                        onClick={() => setMenuOpen(false)}
                    >
                        Movies
                    </Link>
                    <Link
                        href={route("movie")}
                        className="block text-sm font-light hover:opacity-70"
                        onClick={() => setMenuOpen(false)}
                    >
                        TV
                    </Link>
                    <Link
                        href={route("cart")}
                        className="block text-sm font-light hover:opacity-70"
                        onClick={() => setMenuOpen(false)}
                    >
                        Cart
                    </Link>
                    <Link
                        href={route("profile.edit")}
                        className="block text-sm font-light hover:opacity-70"
                        onClick={() => setMenuOpen(false)}
                    >
                        Profile
                    </Link>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="block text-sm font-light hover:opacity-70"
                        onClick={() => setMenuOpen(false)}
                    >
                        Logout
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
