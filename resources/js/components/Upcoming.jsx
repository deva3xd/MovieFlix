import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "@inertiajs/react";

const Upcoming = ({ data }) => {
    const imgURL = import.meta.env.VITE_IMGURL;

    return (
        <div className="bg-custom-primary text-white px-8">
            <h2 className="text-xl sm:text-3xl mb-4 font-medium">Upcoming</h2>
            <Swiper
                slidesPerView={3}
                spaceBetween={0}
                breakpoints={{
                    640: {
                        slidesPerView: 4,
                    },
                    768: {
                        slidesPerView: 5,
                    },
                    1024: {
                        slidesPerView: 7,
                    },
                }}
            >
                {data.length == 0 ? (
                    <p className="py-3 text-lg sm:text-xl">
                        No Movie Available
                    </p>
                ) : (
                    data.map((item) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <Link
                                    href={route("detail", {
                                        id: item.id,
                                        status: "upcoming",
                                    })}
                                >
                                    <div className="card w-32 sm:w-44 shadow-xl rounded-lg">
                                        <figure>
                                            <img
                                                src={`${imgURL}/w500/${item.poster_path}`}
                                                alt={item.title}
                                                className="rounded-lg"
                                            />
                                        </figure>
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

export default Upcoming;
