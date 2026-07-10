import "swiper/css";
import { Play, Plus, Info, Star } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "./ui/Button";
import { parseISO, format } from "date-fns";

const Hero = ({ items, source }) => {
    if (!items || items.length === 0) {
        return <div className="h-[85vh] animate-pulse bg-zinc-800" />;
    }

    const item = items[Math.floor(Math.random() * items.length)];
    const formattedDate = format(parseISO(item.release_date), "dd MMM, yyyy");

    return (
        <div className="relative">

            {/* gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <img
                src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                alt="backdrop image"
                className="object-cover w-full h-[85vh]"
                loading="lazy"
            />

            {/* movie info */}
            <div className="absolute max-w-7xl mx-auto inset-0 flex items-end pb-10 px-4">
                <div className="w-full sm:w-1/2 flex flex-col gap-3">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                        {item.title}
                    </h1>
                    <p className="font-light text-base sm:text-lg text-gray-400">
                        {item.overview}
                    </p>
                    <div className="text-gray-400 flex items-center gap-2 text-sm">
                        <Star size={18} className="fill-primary text-primary" />
                        <span className="text-white/80 text-lg font-bold">
                            {item.vote_average.toFixed(1)}
                        </span>
                        · {formattedDate} · {item.original_language.toUpperCase()}
                    </div>

                    <div className="flex gap-3 mt-1">
                        <Button as={Link} href={route("movie.show", { id: item.id })} data={{ source }}>
                            <Play size={20} fill="white" /> Play
                        </Button>
                        <Button as={Link} variant="outline" href={route("movie.show", { id: item.id })} data={{ source }}>
                            <Info size={20} /> Detail
                        </Button>
                        <Button as={Link} variant="outline" href={route("movie.show", { id: item.id })} data={{ source }}>
                            <Plus size={20} /> Watchlist
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Hero;
