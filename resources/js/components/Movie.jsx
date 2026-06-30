import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./ui/Card";

const Movie = ({ items }) => {
    return (
        <div className="text-white py-4">
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
                {!items ? (
                    <div className="py-3 flex justify-center">
                        <span className="loading loading-dots loading-xl"></span>
                    </div>
                ) : (
                    items?.map((i) => {
                        return (
                            <SwiperSlide key={i.id}>
                                <Card item={i} link="movie.show" date={i.release_date} title={i.title} />
                            </SwiperSlide>
                        );
                    })
                )}
            </Swiper>
        </div>
    )
}

export default Movie;