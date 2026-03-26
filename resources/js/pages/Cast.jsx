import MainLayout from "@/layouts/MainLayout";

const Cast = ({ data }) => {
    console.log(data);
    return (
        <MainLayout title="Cast">
            <div className="bg-background max-w-screen-xl mx-auto px-4">
                <h3 className="text-lg sm:text-2xl font-bold text-white">
                    Cast
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-2">
                    {data.cast.map((d) => (
                        <div key={d.id} className="w-full flex-none">
                            <div className="aspect-[2/3] w-32 rounded-md bg-[#e1e1e1] flex items-center">
                                <img
                                    src={d.profile_path ? `https://image.tmdb.org/t/p/original/${d.profile_path}` : `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`}
                                    className="rounded-md"
                                    alt={d.name}
                                />
                                <div className="flex-none ml-2">
                                    <p className="font-bold text-lg text-white">{d.name}</p>
                                    <p className="font-light text-xs">{d.character?.replace(' (voice)', '')}</p>
                                    <p className="font-light text-xs">Popularity: {d.popularity}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}

export default Cast;