import MainLayout from "@/layouts/MainLayout";
import Header from "@/components/Header";
import Movie from "@/components/Movie";
import Tv from "@/components/Tv";
import useAutoReloadWhenPending from "@/hooks/useAutoReloadWhenPending";

const Home = ({ data }) => {
    useAutoReloadWhenPending("data", data);

    return (
        <MainLayout title="Home">
            <div className="max-w-screen-xl mx-auto">
                <Header items={data.movie.now_playing} />
                <div className="flex flex-col gap-4 mt-4">
                    <div>
                        <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Movies</h2>
                        <Movie items={data.movie.now_playing} />
                    </div>
                    <div>
                        <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Today's TV</h2>
                        <Tv items={data.tv.airing_today} />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home;
