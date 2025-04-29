import { useState, useEffect } from "react";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { toast, Toaster } from "sonner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Cast from "@/components/Cast";
import Review from "@/components/Review";

const Detail = ({ auth, id, items, ongoing, detail }) => {
    const imgURL = import.meta.env.VITE_IMGURL;
    const { flash } = usePage().props;
    const [cast, setCast] = useState(true);
    const voteAverage =
        typeof detail.vote_average === "number"
            ? detail.vote_average.toFixed(1)
            : "N/A";
    const originalLanguage =
        typeof detail.original_language === "string"
            ? detail.original_language
            : "N/A";

    const { data } = useForm({
        user_id: auth.user.id,
        movie_id: id,
        price: 20000,
        count: 1,
    });

    const [isLoading, setIsLoading] = useState(false);
    console.log("success");
    const onSubmit = (e) => {
        e.preventDefault();

        if (isLoading) return;
        setIsLoading(true);

        setTimeout(() => {
            console.log("Button Clicked!");
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
        <div className="max-w-screen-2xl mx-auto">
            <Toaster />
            <Head title="Detail" />
            <Navbar user={auth.user} />
            <div className="pt-[64px]">
                <div className="relative">
                    <img
                        src={`${imgURL}/w1280/${detail.backdrop_path}`}
                        className="w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-custom-primary via-transparent to-transparent">
                        <div className="flex text-white px-3 sm:px-32 pt-56 pb-3 sm:pt-72">
                            <div className="card w-1/5 rounded-none">
                                <figure>
                                    <img
                                        src={`${imgURL}/w500/${detail.poster_path}`}
                                        alt="Poster"
                                    />
                                </figure>
                                <div className="flex my-2 justify-center">
                                    {ongoing == "true" && (
                                        <>
                                            <form onSubmit={onSubmit}>
                                                {!item && (
                                                    <button
                                                        className="border bg-white border-white text-custom-primary rounded-sm font-bold px-2 py-1 text-center me-1 text-xs sm:text-base"
                                                        disabled={isLoading}
                                                    >
                                                        CART
                                                    </button>
                                                )}
                                                <button className="border border-white rounded-sm font-bold px-2 py-1 my-1 text-center text-xs sm:text-base">
                                                    ORDER
                                                </button>
                                            </form>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="w-full sm:w-4/5 ps-4">
                                <div className="flex items-center">
                                    <span className="bg-red-600 rounded-sm font-bold px-3 py-1 text-xs sm:text-base me-1">
                                        {voteAverage}
                                    </span>
                                    <span className="bg-blue-600 rounded-sm font-bold px-3 py-1 text-xs sm:text-base">
                                        {originalLanguage}
                                    </span>
                                </div>
                                <h3 className="font-bold text-xl sm:text-3xl">
                                    {detail.title}
                                </h3>
                                <div className="text-xs sm:text-base">
                                    <span className="me-2">
                                        Release: {detail.release_date},
                                    </span>
                                    <span className="me-2">
                                        Genre:
                                        {detail.genres &&
                                            detail.genres.map((genre) => {
                                                return " " + genre.name + ",";
                                            })}
                                    </span>
                                    <span>Popularity: {detail.popularity}</span>
                                </div>
                                <div className="mt-5">
                                    <h3 className="text-xl sm:text-3xl font-bold">
                                        Overview
                                    </h3>
                                    <p className="text-justify font-light text-xs sm:text-base">
                                        {detail.overview}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="font-bold flex justify-center w-full bg-custom-primary text-base sm:text-xl">
                            <div className="w-1/2 flex justify-center">
                                <button
                                    className={
                                        cast
                                            ? "border-b-2 border-white text-white"
                                            : ""
                                    }
                                    onClick={() => setCast(true)}
                                >
                                    Cast
                                </button>
                            </div>
                            <div className="w-1/2 flex justify-center">
                                <button
                                    className={
                                        !cast
                                            ? "border-b-2 border-white text-white"
                                            : ""
                                    }
                                    onClick={() => setCast(false)}
                                >
                                    Review
                                </button>
                            </div>
                        </div>
                        <div className="bg-custom-primary flex flex-wrap justify-center items-center px-2 sm:px-10 py-1">
                            {cast ? <Cast id={id} /> : <Review id={id} />}
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
