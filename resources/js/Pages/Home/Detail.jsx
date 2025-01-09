import { useState, useEffect } from "react";
import {  Head, router, useForm, usePage } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Cast from "@/components/Cast";
import Review from "@/components/Review";

const Detail = ({ auth, id, items, ongoing, detail }) => {
    const imgURL = import.meta.env.VITE_IMGURL;
    const { flash } = usePage().props;
    const [cast, setCast] = useState(true);
    const voteAverage = typeof detail.vote_average === 'number' ? detail.vote_average.toFixed(1) : 'N/A';
    const originalLanguage = typeof detail.original_language === 'string' ? detail.original_language : 'N/A';

    const { data } = useForm({
        user_id: auth.user.id,
        movie_id: id,
        price: 20000,
        count: 1,
    });
    
    const [isLoading, setIsLoading] = useState(false);
    console.log('success');
    const onSubmit = (e) => {
        e.preventDefault();

        if (isLoading) return;
        setIsLoading(true);

        setTimeout(() => {
            console.log('Button Clicked!');
            setIsLoading(false);
        }, 2000);

        router.post("/home/detail/id={id}", data);
    };

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash.message]);

    const item = items.length > 0;

    return (
        <div className="container mx-auto">
            <Toaster />
            <Head title='Detail' />
            <Navbar user={auth.user} />
            <div className="pt-[73px]">
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
                                    <div className="flex my-2 justify-center">
                                        {ongoing == 'true' && (
                                            <>
                                                <form onSubmit={onSubmit}>
                                                    {!item &&
                                                        <button className="border bg-white border-white text-custom-primary rounded-sm font-bold px-3 py-1 text-md text-center me-1" disabled={isLoading}>CART</button>
                                                    }
                                                        <button className="border border-white rounded-sm font-bold px-3 py-1 text-md text-center">CHECKOUT</button>
                                                </form>
                                            </>
                                        )}
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
                            <div className="flex w-full gap-64">
                                <div className="font-bold flex justify-center gap-80 w-full bg-custom-primary text-2xl">
                                    <button className={cast ? "border-b-2 border-white text-white" : ''} onClick={() => setCast(true)}>Cast</button>
                                    <button className={!cast ? "border-b-2 border-white text-white" : ''} onClick={() => setCast(false)}>Review</button>
                                </div>
                            </div>
                            <div className="bg-custom-primary flex flex-wrap justify-center items-center px-32 py-1 h-[17rem]">
                                {cast ? <Cast id={id} /> : <Review id={id} />}
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;