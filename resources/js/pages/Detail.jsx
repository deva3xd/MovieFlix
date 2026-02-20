import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const Detail = ({ cart, detail, credits, videos, source }) => {
    const { auth } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const isActive = source === "now_playing";

    const voteAverage =
        typeof detail.vote_average === "number"
            ? detail.vote_average.toFixed(1)
            : "N/A";
    const originalLanguage =
        typeof detail.original_language === "string"
            ? detail.original_language
            : "N/A";

    const { post } = useForm({
        user_id: auth.user.id,
        movie_id: detail.id,
        price: 20000,
        count: 1,
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (isLoading) return;
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        post(route('cart.store', ), {
            onSuccess: () => {
                toast.success("Item added");
            }
        })
    };

    return (
        <MainLayout title='Home'>
            <div className="bg-background max-w-screen-xl mx-auto">
                <div className="relative">
                    <img
                        src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
                        className="w-full object-cover"
                        alt="Backdrop Image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>

                <div className="px-4 md:px-20 -mt-24 sm:-mt-48">
                    <div className="flex flex-col sm:flex-row gap-2 text-white z-10 relative">
                        <div className="card w-full sm:w-1/5 rounded-none">
                            <figure>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${detail.poster_path}`}
                                    alt="poster image"
                                    className="h-64 sm:h-full rounded-md"
                                />
                            </figure>
                            <div className="flex flex-col my-2">
                                {isActive ? (
                                    <form onSubmit={onSubmit}>
                                        {!cart ? (
                                            <button
                                                className="flex items-center justify-center gap-2 border bg-white border-white text-background rounded-md font-bold px-2 py-1 text-center text-xs sm:text-base w-full hover:bg-opacity-85"
                                                disabled={isLoading}
                                            >
                                                <ShoppingCart size={20} />
                                            </button>
                                        ) : (
                                            <button
                                                className="flex items-center justify-center gap-2 border bg-white border-white text-background rounded-md font-bold px-2 py-1 text-center text-xs sm:text-base w-full disabled:opacity-50"
                                                disabled
                                            >
                                                <ShoppingCart size={20} />
                                            </button>
                                        )}
                                    </form>
                                ) : (
                                    <div
                                        className="flex items-center justify-center gap-2 border border-white/50 text-white/50 rounded-md font-bold px-2 py-1 text-center text-xs sm:text-base w-full disabled:opacity-50"
                                        disabled
                                    >
                                        Not Available
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full sm:w-4/5">
                            <div className="flex items-center">
                                <span className="bg-red-600 rounded-md font-semibold px-3 py-1 text-xs sm:text-base me-1">
                                    {voteAverage}
                                </span>
                                <span className="bg-blue-600 rounded-md font-semibold px-3 py-1 text-xs sm:text-base uppercase">
                                    {originalLanguage}
                                </span>
                            </div>
                            <h3 className="font-bold text-xl sm:text-3xl">
                                {detail.title}
                            </h3>
                            <div className="text-xs sm:text-base flex flex-row sm:flex-col md:flex-row items-start md:items-center gap-2">
                                Release: {detail.release_date},
                                <div className="flex items-center gap-1">
                                    Genre:
                                    {detail.genres.map((genre) =>
                                        <span key={genre.id} className="bg-white px-2 rounded-md text-black font-semibold">{genre.name}</span>
                                    )}
                                </div>
                            </div>
                            <div className="my-2">
                                <h3 className="text-lg sm:text-2xl font-bold">
                                    Overview
                                </h3>
                                <p className="text-justify font-light text-xs sm:text-base">
                                    {detail.overview}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 border-t border-white/10">
                        <div className="flex items-center justify-between mt-2 text-white">
                            <h3 className="text-lg sm:text-2xl font-bold">
                                Cast
                            </h3>
                            <button className="underline hover:opacity-85">More</button>
                        </div>
                        <div className="flex gap-2 overflow-x-scroll w-full py-2">
                            {credits.cast.slice(0, 10).map((c, i) => (
                                <div key={i} className="w-32 flex-none">
                                    <div className="aspect-[2/3] w-full overflow-hidden rounded-md bg-[#e1e1e1] flex items-center">
                                        <img
                                            src={c.profile_path ? `https://image.tmdb.org/t/p/original/${c.profile_path}` : `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`}
                                            className="rounded-md"
                                            alt={c.name}
                                        />
                                    </div>
                                    <p className="font-bold text-base text-white">{c.name}</p>
                                    <p className="font-light text-xs">{c.character?.replace(' (voice)', '')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-2">
                        <h3 className="text-lg sm:text-2xl font-bold text-white">Trailer</h3>
                        <div className="w-full flex flex-col sm:flex-row gap-2 my-2 overflow-x-scroll py-2">
                            {videos.results.filter(v => v.site === 'YouTube' && v.type === 'Trailer').map((v, i) => (
                                <iframe key={i} width="360" height="200" className="flex-none" src={`https://www.youtube-nocookie.com/embed/${v.key}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Detail;
