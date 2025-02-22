import "swiper/css";
import { get } from "@/api/apiClient";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Profile from "@/assets/images/profile.png";

const Review = ({ id }) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        get(`movie/${id}/reviews`)
            .then((res) => {
                setList(res.data.results);
            })
            .catch((err) => console.log(err));
    }, []);

    const limitList = list.slice(0, 3);

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={0}
            centeredSlides={true} 
            breakpoints={{
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 3,
                }
            }}
        >
            <div className="flex justify-center gap-1">
                {list.length == 0 ? (
                    <div className="flex rounded-lg">
                        <div className="py-5 text-xl font-medium leading-none text-center text-white rounded-full animate-pulse">
                            loading...
                        </div>
                    </div>
                ) : (
                    limitList.map((list) => (
                        <SwiperSlide key={list.id}>
                            {" "}
                            <div className="card card-compact bg-gray-300 w-72 shadow-xl mx-1">
                                <figure className="h-20 py-12">
                                    <img
                                        src={Profile}
                                        alt={list.author}
                                        className="rounded-full w-20"
                                    />
                                </figure>
                                <div
                                    className="card-body text-black flex-none"
                                    style={{ padding: "10px 10px" }}
                                >
                                    <h2 className="card-title text-lg justify-center truncate">
                                        {list.author}!
                                    </h2>
                                    <p className="truncate text-xs">
                                        {list.content}
                                    </p>
                                    <div className="flex justify-center items-center">
                                        <h5 className="font-bold text-lg">
                                            {list.author_details.rating
                                                ? list.author_details.rating
                                                : "0"}
                                            /10
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                )}
            </div>
        </Swiper>
    );
};

export default Review;
