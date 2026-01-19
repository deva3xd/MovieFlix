import MainLayout from "@/layouts/MainLayout";
import Header from "@/components/Header";
import Movie from "@/components/Movie";
import Tv from "@/components/Tv";

const Home = ({ nowPlaying, todayTv }) => {
    return (
        <MainLayout title="Home">
            <div className="max-w-screen-xl mx-auto">
                <Header items={nowPlaying} source="now_playing" />
                <div className="flex flex-col gap-4 mt-4">
                    <div>
                        <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Movies</h2>
                        <Movie items={nowPlaying} source="now_playing" />
                    </div>
                    <div>
                        <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Today's TV</h2>
                        <Tv items={todayTv} />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home;