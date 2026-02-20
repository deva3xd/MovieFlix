import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "@inertiajs/react";

const Movie = ({ items, source }) => {
    return (
        <div className="bg-custom-primary text-white p-4">
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
                        slidesPerView: 6,
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
                                    })}
                                    data={{ source: source }}
                                >
                                    <figure>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${i.poster_path}`}
                                            alt="poster image"
                                            className="rounded-md aspect-[2/3]"
                                            loading="lazy"
                                        />
                                    </figure>
                                    <div className="flex flex-col my-1">
                                        <span className="font-medium text-sm sm:text-base line-clamp-1" title={i.title}>{i.title}</span>
                                        <span className="font-light text-gray-500 text-xs sm:text-sm">
                                            {i.release_date ? new Date(i.release_date).getFullYear() : "undefined"}
                                        </span>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        );
                    })
                )}
            </Swiper>
        </div>
    )
}

export default Movie;