import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "@inertiajs/react";

const Movie = ({ items }) => {
    return (
        <div className="bg-custom-primary text-white px-4 pt-4">
            <h2 className="text-xl sm:text-3xl mb-4 font-medium">Movie</h2>
            <Swiper
                slidesPerView={2}
                spaceBetween={10}
                fadeEffect="true"
                grabCursor="true"
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                }}
            >
                {items.length === 0 ? (
                    <span className="py-3 text-lg sm:text-xl text-center">
                        No Movie Available
                    </span>
                ) : (
                    items.map((i) => {
                        return (
                            <SwiperSlide key={i.id}>
                                <Link
                                    href={route("detail", {
                                        id: i.id,
                                        status: "ongoing",
                                    })}
                                >
                                    <div className="mb-5">
                                        <figure>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500/${i.poster_path}`}
                                                alt={i.title}
                                                className="rounded-md"
                                                loading="lazy"
                                            />
                                        </figure>
                                        <div className="flex flex-col my-1">
                                            <p className="font-medium text-sm sm:text-base">
                                                {i.title}
                                            </p>
                                            <p className="font-light text-gray-500 text-xs sm:text-sm">{new Date(i.release_date).getFullYear()}</p>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        );
                    })
                )}
            </Swiper>
        </div>
    );
};

export default Movie;
