import { useState, useEffect } from "react";
import { Link } from '@inertiajs/react';
import { get } from "@/api/apiClient";
import MainLayout from "@/Layouts/MainLayout";

const Detail = ({ id, auth }) => {
    const user = auth ? auth.user : null;

    const imgURL = import.meta.env.VITE_IMGURL;
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        get(`/${id}`)
            .then(res => { setDetail(res.data) })
            .catch(err => console.log(err));
    }, []);

    const voteAverage = typeof detail.vote_average === 'number' ? detail.vote_average.toFixed(1) : 'N/A';
    const originalLanguage = typeof detail.original_language === 'string' ? detail.original_language : 'N/A';
    const genres = detail.genres;

    return (
        <MainLayout title="Detail" user={user}>
            <div className="h-screen bg-custom-primary">
                <div className="relative h-3/4">
                    <img src={`${imgURL}/w1280/${detail.backdrop_path}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-custom-primary via-transparent to-transparent">
                        <div className="flex text-white px-32 pt-72">
                            <div className="card w-52 rounded-none">
                                <figure>
                                    <img
                                        src={`${imgURL}/w500/${detail.poster_path}`}
                                        alt="Poster"
                                    />
                                </figure>
                                <Link href={route('cart')} className="bg-white text-black rounded-sm font-bold px-4 py-1 text-lg ms-1 text-center mt-2">CART</Link>
                            </div>
                            <div className="w-full ps-4">
                                <div className="flex items-center">
                                    <span className="bg-red-600 rounded-sm font-bold px-4 py-1 text-lg me-1">{voteAverage}</span>
                                    <span className="bg-blue-600 rounded-sm font-bold px-4 py-1 text-lg">{originalLanguage}</span>
                                </div>
                                <h3 className="font-bold text-5xl">{detail.title}</h3>
                                <div className="text-base">
                                    <span className="me-2">Release: {detail.release_date},</span>
                                    <span className="me-2">Genre:
                                        {!genres ? '' : 
                                            genres.map(genre => {
                                                return ' '+genre.name+','
                                            })
                                        }
                                    </span>
                                    <span>Popularity: {detail.popularity}</span>
                                </div>
                                <div className="mt-5">
                                    <h3 className="text-2xl font-bold">Overview</h3>
                                    <p className="text-justify font-light text-base">{detail.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Detail;