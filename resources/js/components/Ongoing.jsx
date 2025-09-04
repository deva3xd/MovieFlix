import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "@inertiajs/react";
import { Pagination } from "swiper/modules";

const Ongoing = ({ items }) => {
    const imgURL = import.meta.env.VITE_IMGURL;

    return (
        <div className="bg-custom-primary text-white px-8 py-5">
            <h2 className="text-xl sm:text-3xl mb-4 font-medium">Ongoing</h2>
            <Swiper
                slidesPerView={2}
                spaceBetween={0}
                fadeEffect="true"
                grabCursor="true"
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                }}
            >
                {items.length == 0 ? (
                    <p className="py-3 text-lg sm:text-xl text-center">
                        No Movie Available
                    </p>
                ) : (
                    items.map((item) => {
                        const year = new Date(item.release_date).getFullYear();

                        return (
                            <SwiperSlide key={item.id}>
                                <Link
                                    href={route("movie.detail", {
                                        id: item.id,
                                        status: "ongoing",
                                    })}
                                >
                                    <div className="card w-44 sm:w-60 rounded-sm mb-5">
                                        <figure>
                                            <img
                                                src={`${imgURL}/w500/${item.poster_path}`}
                                                alt={item.title}
                                                className="rounded-sm"
                                            />
                                        </figure>
                                        <div className="flex flex-col my-1">
                                            <p className="font-medium text-sm sm:text-base">
                                                {item.title}
                                            </p>
                                            <p className="font-light text-gray-500 text-xs sm:text-sm">{year}</p>
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

export default Ongoing;
