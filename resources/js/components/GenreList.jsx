import React from "react";
import { Link } from "@inertiajs/react";
import { ChevronDown, Film, Ghost, Heart, Rocket } from "lucide-react";

const Genre = ({ items }) => {
    return (
        <div className="bg-custom-primary text-white px-8 py-5">
            <div className="mb-4 flex items-center">
                <h2 className="text-xl sm:text-3xl font-medium">Genres</h2>
                <div className="ms-2 hover:underline dropdown dropdown-start">
                    <div tabIndex="0" role="button">
                        <ChevronDown />
                    </div>
                    <div
                        tabIndex="0"
                        className="menu menu-sm dropdown-content z-[1] p-2 shadow rounded-tl-none rounded-md bg-custom-primary border border-custom-secondary w-[16rem] md:w-[50rem] "
                    >
                        <div className="flex flex-wrap mx-2">
                            {items.map((item) => {
                                return (
                                    <Link
                                        key={item.id}
                                        className="w-1/2 sm:w-1/6 hover:underline my-1"
                                        href={route("movie.genre", {
                                            id: item.id,
                                        })}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Link
                    className="bg-custom-secondary flex flex-col justify-center items-center text-white rounded-lg w-full hover:bg-opacity-70 h-14 sm:h-24"
                    href={route("movie.genre", { id: 28 })}
                >
                    <div className="flex flex-col items-center">
                        <Film />
                        <p className="text-xs md:text-md">
                            Action
                        </p>
                    </div>
                </Link>
                <Link
                    className="bg-custom-secondary flex flex-col justify-center items-center text-white rounded-lg w-full hover:bg-opacity-70 h-14 sm:h-24"
                    href={route("movie.genre", { id: 10749 })}
                >
                    <div className="flex flex-col items-center">
                        <Heart />
                        <p className="text-xs md:text-md">
                            Romance
                        </p>
                    </div>
                </Link>
                <Link
                    className="bg-custom-secondary flex flex-col justify-center items-center text-white rounded-lg w-full hover:bg-opacity-70 h-14 sm:h-24"
                    href={route("movie.genre", { id: 27 })}
                >
                    <div className="flex flex-col items-center">
                        <Ghost />
                        <p className="text-xs md:text-md">
                            Horror
                        </p>
                    </div>
                </Link>
                <Link
                    className="bg-custom-secondary flex flex-col justify-center items-center text-white rounded-lg w-full hover:bg-opacity-70 h-14 sm:h-24"
                    href={route("movie.genre", { id: 878 })}
                >
                    <div className="flex flex-col items-center">
                        <Rocket />
                        <p className="text-xs md:text-md">
                            Sci-Fi
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Genre;
