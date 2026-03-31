import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./ui/Card";

const Tv = ({ items }) => {
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
                {!items ? (
                    <div className="py-3 flex justify-center">
                        <span className="loading loading-dots loading-xl"></span>
                    </div>
                ) : (
                    items?.map((i) => {
                        return (
                            <SwiperSlide key={i.id}>
                                <Card item={i} link="tv.show" date={i.first_air_date} title={i.name} />
                            </SwiperSlide>
                        );
                    })
                )}
            </Swiper>
        </div>
    )
}

export default Tv;