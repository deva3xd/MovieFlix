import axios from "axios";
import 'swiper/css';
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from '@inertiajs/react';

const Ongoing = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const baseURL = import.meta.env.VITE_BASEURL;
    const imgURL = import.meta.env.VITE_IMGURL;
    const url = `${baseURL}/movie/now_playing?api_key=${apiKey}`;
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then(res => { setList(res.data.results) })
            .catch(err => console.log(err));
    });

    return (
        <div className="bg-custom-primary px-10 py-7">
            <h2 className="text-3xl text-white mb-2 font-bold">Ongoing</h2>
            <Swiper
                spaceBetween={1}
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

export default Ongoing;