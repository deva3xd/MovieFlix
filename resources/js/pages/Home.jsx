import MainLayout from "@/layouts/MainLayout";
import Hero from "@/components/Hero";
import Movie from "@/components/Movie";
import Tv from "@/components/Tv";
import useAutoReload from "@/hooks/useAutoReload";
import { useState } from "react";

const Home = ({ data }) => {
    useAutoReload("data", data);
    const [popular, setPopular] = useState("movie");
    const [topRated, setTopRated] = useState("movie");

    return (
        <MainLayout title="Home">
            <Hero items={data.movie.now_playing} />
            <div className="max-w-7xl mx-auto my-12 flex flex-col gap-12">

                {/* ongoing movie */}
                <div>
                    <div className="flex justify-between">
                        <h2 className="text-xl text-white sm:text-3xl font-medium"><span className="text-primary me-2">|</span>Ongoing Movie</h2>
                    </div>
                    <Movie items={data.movie.upcoming} />
                </div>

                {/* ongoing movie */}
                <div>
                    <div className="flex justify-between">
                        <h2 className="text-xl text-white sm:text-3xl font-medium"><span className="text-primary me-2">|</span>Today's Tv</h2>
                    </div>
                    <Tv items={data.tv.airing_today} />
                </div>

                {/* top rated */}
                <div>
                    <div className="flex justify-between">
                        <h2 className="text-xl text-white sm:text-3xl font-medium"><span className="text-primary me-2">|</span>Top Rated</h2>
                        <div className="flex gap-4">
                            {["movie", "series"].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTopRated(t)}
                                    className={`text-xl sm:text-xl capitalize ${topRated === t
                                        ? "text-white underline underline-offset-8 decoration-2 decoration-primary pointer-events-none"
                                        : "text-white/50"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    {topRated === "movie" ? <Movie items={data.movie.top_rated} /> : <Tv items={data.tv.top_rated} />}
                </div>

                {/* popular */}
                <div>
                    <div className="flex justify-between">
                        <h2 className="text-xl text-white sm:text-3xl font-medium"><span className="text-primary me-2">|</span>Popular</h2>
                        <div className="flex gap-4">
                            {["movie", "series"].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPopular(p)}
                                    className={`text-xl sm:text-xl capitalize ${popular === p
                                        ? "text-white underline underline-offset-8 decoration-2 decoration-primary pointer-events-none"
                                        : "text-white/50"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    {popular === "movie" ? <Movie items={data.movie.popular} /> : <Tv items={data.tv.popular} />}
                </div>

            </div>
        </MainLayout>
    )
}

export default Home;
