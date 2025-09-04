import { useState } from "react";
import { Link } from "@inertiajs/react";
import Profile from "@/assets/images/profile.png";

const Navbar = () => {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const [showList, setShowList] = useState(false);
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
            <div className="navbar max-w-screen-2xl mx-auto px-0">
                <div className="flex-1">
                    <Link href="#" className="p-0 font-extrabold me-4 text-xl">
                        MovieFlix
                    </Link>
                    <Link
                        href={route("movie")}
                        className="font-light hover:opacity-70 text-sm pb-1 me-4"
                    >
                        Movies
                    </Link>
                    <Link
                        href={route("movie")}
                        className="font-light hover:opacity-70 text-sm pb-1 me-4"
                    >
                        TV
                    </Link>
                </div>
                <div className="flex-1 justify-end relative">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            autoComplete="off"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setShowList(true)}
                            onBlur={() => setTimeout(() => setShowList(false), 100)}
                            placeholder="Search Movie"
                            className="input input-sm rounded-full focus:outline-none bg-custom-primary"
                        />
                    </form>
                    {showList && result.length > 0 && (
                        <ul className="absolute px-1 pt-1 top-full mt-2 w-64 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
                            {result.map((item) => {
                                const year = new Date(item.release_date).getFullYear();
                                return (
                                    <li
                                        key={item.id}
                                        className="pb-1 cursor-pointer hover:bg-gray-200 text-black"
                                    >
                                        <Link href={route("movie.detail", {
                                            id: item.id,
                                            status: "ongoing",
                                        })}>
                                            <div className="flex">
                                                <img
                                                    src={item.poster_path ? `${imgURL}/w185/${item.poster_path}` : ""}
                                                    className="w-12 rounded-md text-xs text-center"
                                                    alt="poster"
                                                />
                                                <div className="flex flex-col justify-center ms-1">
                                                    <span className="text-base font-medium line-clamp-1" title={item.title}>{item.title} {year ? `(${year})` : ""}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex="0"
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-9 rounded-full">
                                <img
                                    alt="profile"
                                    src={Profile}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex="0"
                            className="menu menu-sm dropdown-content z-[1] p-2 shadow rounded-tr-none rounded-md w-52 bg-black border border-custom-primary"
                        >
                            <li>
                                <Link href={route("profile.edit")}>
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link href={route("cart")}>
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
