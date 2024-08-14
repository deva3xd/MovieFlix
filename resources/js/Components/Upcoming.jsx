import axios from "axios";
import 'swiper/css';
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from '@inertiajs/react';

const Upcoming = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const baseURL = import.meta.env.VITE_BASEURL;
    const imgURL = import.meta.env.VITE_IMGURL;
    const url = `${baseURL}/movie/upcoming?api_key=${apiKey}`;
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then(res => { setList(res.data.results) })
            .catch(err => console.log(err));
    });

    return (
        <div className="bg-gray-200 px-10 py-7">
            <h2 className="text-3xl text-black mb-2 font-bold">Upcoming</h2>
            <Swiper
                spaceBetween={100}
                slidesPerView={6}
                onSlideChange={() => console.log('slide change')}
            >
                {list.map(list => {
                    return (
                        <SwiperSlide key={list.id}>
                            <Link href={route('detail', {id: list.id})}>
                                <div className="card w-44 bg-white shadow-xl rounded-none">
                                    <figure><img src={`${imgURL}/w500/${list.poster_path}`} alt={list.title} /></figure>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default Upcoming;