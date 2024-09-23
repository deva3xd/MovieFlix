import 'swiper/css';
import 'swiper/css/pagination';
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from '@inertiajs/react';
import { Pagination } from 'swiper/modules';
import { get } from "@/api/apiClient";

const Ongoing = () => {
    const imgURL = import.meta.env.VITE_IMGURL;
    const [list, setList] = useState([]);

    useEffect(() => {
        get(`/now_playing`)
            .then(res => { setList(res.data.results) })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="bg-custom-primary text-white px-10 py-7">
            <h2 className="text-3xl mb-2 font-bold">Ongoing</h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop='true'
                centeredSlides='true'
                fadeEffect='true'
                grabCursor='true'
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    1024: {
                        slidesPerView: 4,
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
                                <Link href={route('detail', { id: list.id, ongoing: true })}>
                                    <div className="card w-60 bg-white shadow-xl rounded-none mb-9">
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

export default Ongoing;