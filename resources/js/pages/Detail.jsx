import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Plus, Play, Star, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { parseISO, format } from "date-fns";

const Detail = ({ cart, detail, credits, videos }) => {
    const { auth } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);

    const voteAverage = typeof detail.vote_average === "number" ? detail.vote_average.toFixed(1) : "N/A";
    const originalLanguage = typeof detail.original_language === "string" ? detail.original_language : "N/A";
    const formattedDate = format(parseISO(detail.release_date || detail.first_air_date), "dd MMM, yyyy");

    const { post } = useForm({
        user_id: auth.user.id,
        movie_id: detail.id,
        price: 20000,
        count: 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLoading) return;
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        post(route('cart.store',), {
            onSuccess: () => {
                toast.success("Item added");
            }
        })
    };

    return (
        <MainLayout title={detail.title || detail.name}>
            <div className="relative">

                {/* gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <img
                    src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
                    className="object-cover w-full h-[85vh]"
                    alt="Backdrop Image"
                />
            </div>

            <div className="max-w-7xl mx-auto inset-0 flex px-4">
                <div className="w-full flex flex-col gap-3">

                    {/* information */}
                    <div className="absolute max-w-7xl top-[33rem] flex flex-col sm:flex-row gap-4 text-white">
                        <div className="w-1/2 flex flex-col gap-3">
                            <div className="flex items-center gap-1 my-2 text-gray-400 text-sm">
                                {detail.genres.map((genre) => genre.name).join(' · ')}
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                                {detail.title || detail.name}
                            </h1>
                            <p className="font-light text-base sm:text-lg text-gray-400">
                                {detail.overview}
                            </p>
                            <div className="text-gray-400 flex items-center gap-2 text-sm">
                                <Star size={18} className="fill-primary text-primary" />
                                <span className="text-white/80 text-lg font-bold">
                                    {voteAverage}
                                </span>
                                · {formattedDate} · {originalLanguage.toUpperCase()}
                            </div>

                            <div className="flex gap-3 mt-1">
                                <Button as="a" href={`https://www.vidking.net/embed/movie/${detail.id}?color=e50914`} target="_blank">
                                    <Play size={20} fill="white" /> Play
                                </Button>
                                <Button onClick={handleSubmit} variant="outline" href={route("movie.show", { id: detail.id })} disabled={isLoading || cart}>
                                    {cart ? <Check size={20} /> : <Plus size={20} />} Watchlist
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* cast */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg sm:text-3xl font-bold text-white">Cast</h3>
                        <Link href={route('cast', { media: detail.title ? "movies" : "tv-shows", id: detail.id })} className="text-gray-400 hover:underline">
                            View All
                        </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-2 overflow-x-scroll w-full my-2">
                        {credits.cast.length > 0 ? (
                            <>
                                {credits.cast.slice(0, 9).map((c, i) => (
                                    <div key={i} className="flex gap-2 bg-zinc-900/50 backdrop-blur-sm border border-white/20 rounded-md">
                                        <img
                                            src={c.profile_path ? `https://image.tmdb.org/t/p/original/${c.profile_path}` : `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`}
                                            className="rounded-s-md w-16"
                                            alt={c.name}
                                        />
                                        <div className="flex flex-col justify-center">
                                            <p className="font-bold text-xl text-white">{c.name}</p>
                                            <p className="font-light text-gray-400">{c.character?.replace(' (voice)', '')}</p>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <span className="col-span-3 text-lg sm:text-xl text-center block w-full">
                                No Cast Available
                            </span>
                        )}
                    </div>

                    {/* trailer */}
                    <div className="mt-2">
                        <h3 className="text-lg sm:text-3xl font-bold text-white">Trailer</h3>
                        <div className="grid grid-cols-3 gap-2 overflow-x-scroll w-full my-2">
                            {videos.results.length > 0 ? (
                                videos.results.filter(v => v.site === 'YouTube' && v.type === 'Trailer').map((v, i) => (
                                    <iframe key={i} width="360" height="200" className="flex-none rounded-md border border-white/20" src={`https://www.youtube-nocookie.com/embed/${v.key}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                ))
                            ) : (
                                <span className="col-span-4 text-lg sm:text-xl text-center block w-full">
                                    No Trailer Available
                                </span>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    )
}

export default Detail;
