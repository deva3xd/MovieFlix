import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./ui/Card";

const CardList = ({ items }) => {
    return (
        <div className="text-white my-4">
            <Swiper
                slidesPerView={2.2}
                spaceBetween={10}
                fadeEffect="true"
                grabCursor="true"
                breakpoints={{
                    640: {
                        slidesPerView: 3.2,
                    },
                    768: {
                        slidesPerView: 4.2,
                    },
                    1024: {
                        slidesPerView: 6.2,
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
                                <Card item={i} link={i.title ? "movie.show" : "tv.show"} date={i.release_date ? i.release_date : i.first_air_date} title={i.title ? i.title : i.name} />
                            </SwiperSlide>
                        );
                    })
                )}
            </Swiper>
        </div>
    )
}

export default CardList;