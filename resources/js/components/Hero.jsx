import "swiper/css";
import { Play } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "./ui/Button";
import { Search, Plus } from "lucide-react";
import Profile from "../assets/images/profile.png";
import { Star } from "lucide-react";

const Hero = ({ items, source }) => {
    const { url } = usePage();
    const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
    const item = randomItem(items);
    const releaseDate = new Date(item.release_date);

    const menu = [
        { id: 1, name: "Browse", href: "/", isActive: (url) => url === "/" },
        { id: 2, name: "Movies", href: "/movies", isActive: (url) => url.startsWith("/movies") },
        { id: 3, name: "Tv Shows", href: "/tv-shows", isActive: (url) => url.startsWith("/tv-shows") },
    ]

    return (
        <>
            {!items ? (
                <div className="h-96 inset-0 animate-pulse bg-gray-300" />
            ) : (
                <div className="relative">

                    {/* navbar */}
                    <nav className="absolute flex justify-between items-center max-w-7xl mx-auto inset-x-0 z-50 pt-4">
                        <div className="flex gap-8">
                            {menu.map((m) => {
                                const isActive = m.isActive(url);

                                return (
                                    <Link
                                        key={m.id}
                                        href={m.href}
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
                    </nav>

                    <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    <img
                        src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                        alt="backdrop image"
                        className="object-cover w-full h-[85vh]"
                        loading="lazy"
                    />
                    <div className="absolute max-w-7xl mx-auto inset-0 flex items-end pb-4">
                        <div className="w-1/2 flex flex-col gap-2">
                            <h1 className="text-5xl font-semibold text-white">
                                {item.title}
                            </h1>
                            <p className="text-xl text-white/75">
                                {item.overview}
                            </p>
                            <div className="text-white/50 flex items-center gap-2 text-sm">
                                <Star size={20} className="fill-primary text-primary" />
                                <span className="text-white/75 text-xl">{item.vote_average.toFixed(1)}</span> · {releaseDate.getFullYear()}
                            </div>

                            <div className="flex gap-4 my-2">
                                <Link href={route("movie.show", { id: item.id })} data={{ source: source }}>
                                    <Button tag="span" variant="primary" size="md">
                                        <Play size={20} fill="white" />
                                        PLAY
                                    </Button>
                                </Link>
                                <Link href={route("movie.show", { id: item.id })} data={{ source: source }}>
                                    <Button tag="span" variant="outline" size="md">
                                        <Plus size={20} fill="white" />
                                        WATCHLIST
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Hero;
