import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import Hero from "@/components/Hero";
import CardList from "@/components/CardList";
import useAutoReload from "@/hooks/useAutoReload";

const Home = ({ data }) => {
    useAutoReload("data", data);
    const [popular, setPopular] = useState("movies");
    const [topRated, setTopRated] = useState("movies");

    return (
        <MainLayout title="Home" withScrollBehavior>
            <Hero items={data.movie.now_playing} />
            <div className="max-w-7xl mx-auto my-[74px] flex flex-col gap-12 px-4">

                {/* ongoing movie */}
                <div>
                    <div className="flex justify-between">
                        <h2 className="text-xl text-white sm:text-3xl font-medium"><span className="text-primary me-2">|</span>Ongoing Movie</h2>
                    </div>
                    <CardList items={data.movie.now_playing} />
                </div>

                {/* today's tv */}
                <div>
                    <div className="flex justify-between">
                        <h2 className="text-xl text-white sm:text-3xl font-medium"><span className="text-primary me-2">|</span>Today's Tv</h2>
                    </div>
                    <CardList items={data.tv.airing_today} />
                </div>

                {/* top rated */}
                <div>
                    <div className="flex justify-between">
                        <h2 className="text-xl text-white sm:text-3xl font-medium"><span className="text-primary me-2">|</span>Top Rated</h2>
                        <div className="flex gap-4">
                            {["movies", "series"].map((t) => (
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
                    {topRated === "movies" ? <CardList items={data.movie.top_rated} /> : <CardList items={data.tv.top_rated} />}
                </div>

                {/* popular */}
                <div>
                    <div className="flex justify-between">
                        <h2 className="text-xl text-white sm:text-3xl font-medium"><span className="text-primary me-2">|</span>Popular</h2>
                        <div className="flex gap-4">
                            {["movies", "series"].map((p) => (
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
                    {popular === "movies" ? <CardList items={data.movie.popular} /> : <CardList items={data.tv.popular} />}
                </div>

            </div>
        </MainLayout>
    )
}

export default Home;
