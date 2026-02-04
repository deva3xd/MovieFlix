import "swiper/css";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Play, Clapperboard } from "lucide-react";
import { Link } from "@inertiajs/react";

const Header = ({ items, source }) => {
    const [expanded, setExpanded] = useState(false);
    const handleTrailer = async (id) => {
        try {
            const res = await fetch(`/movies/${id}/videos`);
            const data = await res.json();

            if (data.results && data.results.length > 0) {
                const trailer = data.results.find(v => v.type === "Trailer");
                const trailerKey = trailer ? trailer.key : data.results[0].key;

                window.open(`https://www.youtube.com/watch?v=${trailerKey}`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Swiper loop={true} className="mySwiper min-w-0">
                {items.map((i) => (
                    <SwiperSlide key={i.id}>
                        <div className="relative h-[33rem] w-full">
                            <img
                                src={`https://image.tmdb.org/t/p/original/${i.backdrop_path}`}
                                className="object-cover h-full w-full"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-end p-4 sm:justify-start justify-end">
                                <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg w-full sm:w-1/2">
                                    <h1 className="text-2xl sm:text-4xl font-semibold text-white">
                                        {i.title}
                                    </h1>
                                    <p className={`text-base text-justify text-white ${expanded ? "" : "line-clamp-3"}`}>
                                        {i.overview}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setExpanded(true)}
                                        className="hover:underline text-white"
                                        hidden={expanded}
                                    >
                                        Read More...
                                    </button>

                                    <div className="flex gap-2 my-2">
                                        <Link
                                            href={route("detail", {
                                                id: i.id
                                            })}
                                            data={{ source: source }}
                                            className="flex items-center gap-1 bg-primary hover:bg-primary/85 text-black px-8 py-2 rounded-md font-semibold"
                                        >
                                            <Play size={20} fill="true" />
                                            Play
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => handleTrailer(i.id)}
                                            className="flex items-center gap-1 bg-white hover:bg-white/85 text-black px-8 py-2 rounded-md font-semibold"
                                        >
                                            <Clapperboard size={20} />
                                            Trailer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Header;
