import { useState, useEffect } from "react";
import { Link, Head, router, useForm, usePage } from '@inertiajs/react';
import { get } from "@/api/apiClient";
import { toast, Toaster } from 'sonner';
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";

const Detail = ({ id, auth, items }) => {
    const imgURL = import.meta.env.VITE_IMGURL;
    const { flash } = usePage().props;
    const [detail, setDetail] = useState([]);
    const voteAverage = typeof detail.vote_average === 'number' ? detail.vote_average.toFixed(1) : 'N/A';
    const originalLanguage = typeof detail.original_language === 'string' ? detail.original_language : 'N/A';

    useEffect(() => {
        get(`/${id}`)
            .then(res => { setDetail(res.data) })
            .catch(err => console.log(err));
    }, []);

    const { data } = useForm({
        user_id: auth.user.id,
        movie_id: id,
        price: 20000,
        count: 1,
    });

    const onSubmit = (e) => {
        e.preventDefault();

        router.post("/home/movie-detail/id={id}", data);
    };

    if (flash.message) {
        toast.success(flash.message);
    };
    return (
        <>
            <div className="container mx-auto">
                <Toaster />
                <Head title='Detail' />
                <Navbar user={auth.user} />
                <div className="pt-16">
                    <div className="h-screen bg-custom-primary">
                        <div className="relative h-3/4">
                            <img src={`${imgURL}/w1280/${detail.backdrop_path}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-custom-primary via-transparent to-transparent">
                                <div className="flex text-white px-32 pt-72">
                                    <div className="card w-1/5 rounded-none">
                                        <figure>
                                            <img
                                                src={`${imgURL}/w500/${detail.poster_path}`}
                                                alt="Poster"
                                            />
                                        </figure>
                                        <div className="flex gap-1">
                                            <form onSubmit={onSubmit}>
                                                <button className="bg-white border border-white text-black rounded-sm font-bold px-3 py-1 text-md text-center mt-2 w-full disabled:bg-gray-500 disabled:border-gray-500">CART</button>
                                            </form>
                                            <Link href='#' className="border border-white rounded-sm font-bold px-3 py-1 text-md text-center mt-2 w-full">CHECKOUT</Link>
                                        </div>
                                    </div>
                                    <div className="w-4/5 ps-4">
                                        <div className="flex items-center">
                                            <span className="bg-red-600 rounded-sm font-bold px-4 py-1 text-lg me-1">{voteAverage}</span>
                                            <span className="bg-blue-600 rounded-sm font-bold px-4 py-1 text-lg">{originalLanguage}</span>
                                        </div>
                                        <h3 className="font-bold text-5xl">{detail.title}</h3>
                                        <div className="text-base">
                                            <span className="me-2">Release: {detail.release_date},</span>
                                            <span className="me-2">Genre:
                                                {detail.genres &&
                                                    detail.genres.map(genre => {
                                                        return ' ' + genre.name + ','
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
                                <div className="flex w-full gap-64 px-32">
                                    <div className="font-bold border-b-2 border-white flex justify-center gap-80 pb-2 w-full bg-custom-primary text-2xl">
                                        <p className="border-b-2 border-white">Cast</p>
                                        <p>Review</p>
                                    </div>
                                </div>
                                <div className="bg-custom-primary">
                                    test
                                </div>
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail;