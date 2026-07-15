import { useState, useRef } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Play, Plus, Info, Star, Check } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { Button } from "./ui/Button";
import { parseISO, format } from "date-fns";

const Hero = ({ items }) => {
    const { props } = usePage();
    const isLoggedIn = !!props.auth?.user;
    const [addedIds, setAddedIds] = useState(new Set());
    const [activeIndex, setActiveIndex] = useState(0);
    const [processing, setProcessing] = useState(false);
    const swiperRef = useRef(null);

    if (!items || items.length === 0) {
        return <div className="h-[75vh] max-h-screen animate-pulse bg-zinc-800" />;
    }

    const handleWatchlist = (e, movieId) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoggedIn || processing) return;

        setProcessing(true);

        router.post(
            route("watchlist.store"),
            {
                user_id: props.auth.user.id,
                movie_id: movieId,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setAddedIds((prev) => new Set(prev).add(movieId));
                    toast.success("Added to watchlist");
                },
                onError: (errors) => {
                    toast.error("Failed to add to watchlist");
                    console.error(errors);
                },
                onFinish: () => {
                    setProcessing(false);
                },
            }
        );
    };

    const total = items.length;

    // windowed indicator: show at most 4 dots centered around activeIndex
    const maxDots = 4;
    const half = Math.floor(maxDots / 2);
    let dotStart = Math.max(0, activeIndex - half);
    let dotEnd = Math.min(total, dotStart + maxDots);
    if (dotEnd - dotStart < maxDots) {
        dotStart = Math.max(0, dotEnd - maxDots);
    }
    const visibleDots = items.slice(dotStart, dotEnd);

    return (
        <div className="relative h-[75vh] max-h-screen overflow-hidden">
            {/* gradient overlays — stay on top of swiper */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                loop={total > 1}
                slidesPerView={1}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="h-full w-full"
            >
                {items.map((item, index) => {
                    return (
                        <SwiperSlide key={item.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                                alt="backdrop"
                                className="object-cover w-full h-full"
                                loading={index === 0 ? "eager" : "lazy"}
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* movie info — floats above the swiper */}
            <div className="absolute max-w-7xl mx-auto inset-0 z-20 flex justify-between items-end pb-10 px-4 pointer-events-none">
                <div className="w-full sm:w-1/2 flex flex-col gap-3 pointer-events-auto">
                    {items.map((item, index) => {
                        const formattedDate = item.release_date
                            ? format(parseISO(item.release_date), "dd MMM, yyyy")
                            : null;
                        const isAdded = addedIds.has(item.id);

                        return (
                            <div
                                key={item.id}
                                className={`flex flex-col gap-3 transition-all duration-700 ${index === activeIndex
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4 absolute invisible pointer-events-none"
                                    }`}
                            >
                                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                                    {item.title || item.name}
                                </h1>
                                <p className="font-light text-base sm:text-lg text-gray-300 line-clamp-3">
                                    {item.overview}
                                </p>
                                <div className="text-gray-400 flex items-center gap-2 text-sm">
                                    <Star size={18} className="fill-primary text-primary" />
                                    <span className="text-white/80 text-lg font-bold">
                                        {item.vote_average.toFixed(1)}
                                    </span>
                                    {formattedDate && (
                                        <>
                                            <span>·</span>
                                            <span>{formattedDate}</span>
                                        </>
                                    )}
                                    {item.original_language && (
                                        <>
                                            <span>·</span>
                                            <span>{item.original_language.toUpperCase()}</span>
                                        </>
                                    )}
                                </div>

                                <div className="flex gap-3 mt-1">
                                    <Button
                                        as="a"
                                        href={`https://www.vidking.net/embed/movie/${item.id}?color=e50914`}
                                        target="_blank"
                                    >
                                        <Play size={20} fill="white" /> Play
                                    </Button>
                                    <Button
                                        as={Link}
                                        variant="outline"
                                        href={route(item.title ? "movie.show" : "tv.show", { id: item.id })}
                                    >
                                        <Info size={20} /> Detail
                                    </Button>
                                    {isLoggedIn && (
                                        <Button
                                            onClick={(e) => handleWatchlist(e, item.id)}
                                            variant="outline"
                                            disabled={processing || isAdded}
                                        >
                                            {isAdded ? (
                                                <Check size={20} />
                                            ) : (
                                                <Plus size={20} />
                                            )}{" "}
                                            Watchlist
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* slide indicators — max 4 dots, windowed */}
                {total > 1 && (
                    <div className="flex gap-1.5">
                        {visibleDots.map((item, index) => {
                            const realIndex = dotStart + index;
                            const isActive = realIndex === activeIndex;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => swiperRef.current?.slideTo(realIndex)}
                                    className={`h-1 rounded-full transition-all duration-500 ${isActive
                                            ? "w-8 bg-primary"
                                            : "w-2 bg-white/30 hover:bg-white/60"
                                        }`}
                                    aria-label={`Go to slide ${realIndex + 1}`}
                                />
                            );
                        })}
                    </div>
                )}

            </div>

        </div>
    )
};

export default Hero;
