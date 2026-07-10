import MainLayout from "@/layouts/MainLayout";

const Cast = ({ detail, cast }) => {
    return (
        <MainLayout title="Cast">
            <div className="relative">

                {/* gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <img
                    src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
                    alt="backdrop image"
                    className="object-cover w-full h-[17vh]"
                    loading="lazy"
                />
                <div className="max-w-7xl mx-auto px-4 text-white text-lg">
                    <span className="absolute top-24">
                        <div className="text-4xl sm:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                            {detail.name || detail.title}
                        </div>
                    </span>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-xl text-white sm:text-3xl font-medium">
                    <span className="text-primary me-2">|</span>Cast
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-4">
                    {cast.cast.map((d) => (
                        <div key={d.id} className="flex gap-2 bg-zinc-900/50 backdrop-blur-sm border border-white/20 rounded-md">
                            <img
                                src={d.profile_path ? `https://image.tmdb.org/t/p/original/${d.profile_path}` : `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`}
                                className="rounded-s-md w-28"
                                alt={d.name}
                            />
                            <div className="flex flex-col justify-center">
                                <p className="font-bold text-xl text-white">{d.name}</p>
                                <p className="font-light text-gray-400">{d.character?.replace(' (voice)', '')}</p>
                                <p className="font-light text-gray-400">Popularity: {d.popularity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}

export default Cast;