import axios from "axios";
import 'swiper/css';
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import Modal from "@/Components/Modal";
import { Link } from "@inertiajs/react";

const Ongoing = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then(res => { setList(res.data.results) })
            .catch(err => console.log(err));
    });

    const [data, setData] = useState({ title: '', overview: '', poster: '' });
    const openModal = (title, overview, poster) => {
        setData({ title, overview, poster });
        document.getElementById('my_modal_5').showModal();
        console.log(title, overview, poster)
    };

    return (
        <div className="px-10 py-7 bg-custom-primary">
            <h2 className="text-3xl text-white mb-2 font-bold">Ongoing</h2>
            <Swiper
                spaceBetween={1}
                slidesPerView={6}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {list.map(list => {
                    return (
                        <SwiperSlide key={list.id}>
                            <button onClick={() => openModal(list.title, list.overview, list.poster_path)}>
                                <div className="card w-44 bg-white shadow-xl h-80 rounded-none">
                                    <figure><img src={`https://image.tmdb.org/t/p/w500/${list.poster_path}`} alt={list.title} /></figure>
                                    <div className="card-body px-4 py-2">
                                        <h2 className="card-title text-black text-sm h-20">{list.title}</h2>
                                    </div>
                                </div>
                            </button>
                        </SwiperSlide>
                    )
                })}
            </Swiper>

            {/* modal */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl text-center underline">{data.title}</h3>
                    <div className="flex py-4">
                        <img src={`https://image.tmdb.org/t/p/w500/${data.poster}`} alt={data.title} width={170} />
                        <div className="mx-3 text-justify"><p>{data.overview}</p></div>
                    </div>
                    <div className="modal-action m-0">
                        <form method="dialog">
                            <Link className="btn btn-success text-white align-bottom mr-2">Order Now!</Link>
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Ongoing;