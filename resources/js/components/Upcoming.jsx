import 'swiper/css';
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from '@inertiajs/react';
import { get } from "@/api/apiClient";

const Upcoming = () => {
    const imgURL = import.meta.env.VITE_IMGURL;
    const [list, setList] = useState([]);

    useEffect(() => {
        get(`/upcoming`)
            .then(res => { setList(res.data.results) })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="bg-gray-200 text-black px-10 py-7">
            <h2 className="text-3xl mb-2 font-bold">Upcoming</h2>
            <Swiper
                slidesPerView={6}
                spaceBetween={0}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 0,
                    },
                }}
            >
                {list.length == 0 ? (
                    <p className="py-3 text-xl">No Movie Available</p>
                ) : (
                    list.map(list => {
                        return (
                            <SwiperSlide key={list.id}>
                                <Link href={route('detail', { id: list.id, ongoing: false })}>
                                    <div className="card w-44 bg-white shadow-xl rounded-none">
                                        <figure><img src={`${imgURL}/w500/${list.poster_path}`} alt={list.title} /></figure>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )
                    })
                )}
            </Swiper>
        </div>
    )
}

export default Upcoming;