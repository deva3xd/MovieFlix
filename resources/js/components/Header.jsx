import "swiper/css";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Play, Plus } from "lucide-react";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import { Check } from "lucide-react";

const Header = ({ items, url, apiKey, cart }) => {
    const [expanded, setExpanded] = useState(false);
    const { flash } = usePage().props;

    const handleTrailer = async (id) => {
        try {
            const res = await fetch(
                `${url}/movie/${id}/videos?language=en-US&api_key=${apiKey}`
            );
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

    const { data } = useForm({
        user_id: 1,
        movie_id: null,
        price: 20000,
        count: 1,
    });

    const handleAddToCart = (e, id) => {
        e.preventDefault();

        router.post("/movie/{status}/{id}", {
            ...data, movie_id: id
        });
    };

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash.message]);

    return (
        <>
            <Toaster />
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
                                        <button
                                            type="button"
                                            onClick={() => handleTrailer(i.id)}
                                            className="flex items-center gap-1 bg-white hover:bg-white/90 text-black px-4 py-2 rounded-md font-medium"
                                        >
                                            <Play size={20} fill="true" />
                                            Trailer
                                        </button>
                                        {!cart.some(cart => cart.movie_id === i.id) ? (
                                            <button
                                                type="button"
                                                onClick={(e) => handleAddToCart(e, i.id)}
                                                className="flex items-center gap-1 bg-foreground hover:bg-foreground/90 text-white px-4 py-2 rounded-md font-medium"
                                            >
                                                <Plus size={20} />
                                                Add to Cart
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                disabled
                                                className="flex items-center gap-1 bg-foreground hover:bg-foreground/90 text-white px-4 py-2 rounded-md font-medium opacity-70"
                                            >
                                                <Check size={20} />
                                                In Cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default Header;
