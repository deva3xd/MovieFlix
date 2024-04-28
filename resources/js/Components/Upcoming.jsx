import axios from "axios";
import 'swiper/css';
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

const Upcoming = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then(res => { setList(res.data.results) })
            .catch(err => console.log(err));
    })

    return (
        <div className="bg-gray-200 px-10 py-7">
            <h2 className="text-3xl text-black mb-2 font-bold">Upcoming</h2>
            <Swiper
                spaceBetween={10}
                slidesPerView={6}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                {list.map(list => {
                    return (
                        <SwiperSlide>
                            <a href="#" className="card w-44 bg-white shadow-xl h-80">
                                <figure><img src={`https://image.tmdb.org/t/p/w500/${list.poster_path}`} alt={list.title} /></figure>
                                <div className="card-body px-4 py-2">
                                    <h2 className="card-title text-black text-lg h-20">{list.title}</h2>
                                </div>
                            </a> 
                        </SwiperSlide>
                    )
                })} 
            </Swiper>
        </div>
    )
}

export default Upcoming;