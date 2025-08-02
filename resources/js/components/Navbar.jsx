import { Link } from "@inertiajs/react";
import Profile from "@/assets/images/profile.png";

const Navbar = () => {
    return (
        <div className="bg-black text-white fixed top-0 left-0 w-screen sm:w-full z-50 px-8">
            <div className="navbar max-w-screen-2xl mx-auto px-0">
                <div className="flex-1">
                    <Link href="#" className="p-0 font-extrabold me-4 text-xl">
                        MovieFlix
                    </Link>
                    <Link
                        href={route("movie")}
                        className="font-light hover:opacity-70 text-md pb-1 me-4"
                    >
                        Movies
                    </Link>
                    <Link
                        href={route("movie")}
                        className="font-light hover:opacity-70 text-md pb-1 me-4"
                    >
                        TV
                    </Link>
                </div>
                <div className="flex-1 justify-end">
                    <input
                        type="text"
                        placeholder="Search Movie"
                        className="input input-sm rounded-full focus:outline-none bg-custom-primary"
                    />
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex="0"
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-9 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={Profile}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex="0"
                            className="menu menu-sm dropdown-content z-[1] p-2 shadow rounded-tr-none rounded-box w-52 bg-black border border-custom-primary"
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
