import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./ui/Card";

const Movie = ({ items }) => {
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
                    <span className="py-3 text-lg sm:text-xl text-center block w-full">
                        No Movie Available
                    </span>
                ) : (
                    items.map((i) => {
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