import { useState, useEffect } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { toast, Toaster } from "sonner";
import MainLayout from "@/layouts/MainLayout";

const Detail = ({ auth, id, items, status, detail, credits }) => {
    const imgURL = import.meta.env.VITE_IMGURL;
    const { flash } = usePage().props;
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
    const onSubmit = (e) => {
        e.preventDefault();

        if (isLoading) return;
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        router.post("/movie/{status}/{id}", data);
    };

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash.message]);

    return (
        <MainLayout title='Home'>
            <Toaster />
            <div className="bg-custom-primary">
                <div className="relative">
                    <img
                        src={`${imgURL}/original/${detail.backdrop_path}`}
                        className="w-full object-cover max-h-[80vh]"
                        alt="Backdrop Image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-custom-primary to-transparent"></div>
                </div>

                <div className="flex text-white px-3 sm:px-32 -mt-24 sm:-mt-48 z-10 relative">
                    <div className="card w-1/5 rounded-none">
                        <figure>
                            <img
                                src={`${imgURL}/w500/${detail.poster_path}`}
                                alt={detail.title}
                            />
                        </figure>
                        <div className="flex flex-col my-2">
                            {status == "ongoing" ? (
                                <form onSubmit={onSubmit}>
                                    {items.length < 1 && (
                                        <button
                                            className="border bg-white border-white text-custom-primary rounded-sm font-bold px-2 py-1 text-center me-1 text-xs sm:text-base w-full hover:bg-opacity-80"
                                            disabled={isLoading}
                                        >
                                            CART
                                        </button>
                                    )}
                                    <button className="border bg-custom-primary border-white rounded-sm font-bold px-2 py-1 my-1 text-center text-xs sm:text-base w-full hover:bg-opacity-80">
                                        Checkout
                                    </button>
                                </form>
                            ) : (
                                <div className="border bg-custom-primary border-white rounded-sm font-bold px-2 py-1 my-1 text-center text-xs sm:text-base w-full" disabled>
                                    Not Available
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full sm:w-4/5 ps-4">
                        <div className="flex items-center">
                            <span className="bg-red-600 rounded-sm font-semibold px-3 py-1 text-xs sm:text-base me-1">
                                {voteAverage}
                            </span>
                            <span className="bg-blue-600 rounded-sm font-semibold px-3 py-1 text-xs sm:text-base">
                                {originalLanguage}
                            </span>
                        </div>
                        <h3 className="font-bold text-xl sm:text-3xl">
                            {detail.title}
                        </h3>
                        <div className="text-xs sm:text-base flex items-center">
                            <div className="me-2">
                                Release: {detail.release_date},
                            </div>
                            <div className="flex items-center">
                                Genre:
                                { detail.genres.map( (genre) => 
                                    <span key={genre.id} className="bg-white px-2 ms-1 rounded-sm text-black font-semibold">{genre.name}</span>
                                )}
                            </div>
                        </div>
                        <div className="mt-5">
                            <h3 className="text-xl sm:text-3xl font-bold">
                                Overview
                            </h3>
                            <p className="text-justify font-light text-xs sm:text-base">
                                {detail.overview}
                            </p>
                        </div>
                        <div className="my-5 w-3/4 border-t border-white">
                            <h3 className="text-lg sm:text-2xl font-bold">
                                Cast
                            </h3>
                            <p className="text-justify font-light text-xs sm:text-base">
                                {credits.cast.map((credit) => credit.name)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Detail;
