import MainLayout from "@/layouts/MainLayout";
import Movie from "@/components/Movie";
import useAutoReloadWhenPending from "@/hooks/useAutoReloadWhenPending";

const Movies = ({ data }) => {
    useAutoReloadWhenPending("data", data);

    return (
        <MainLayout title="Movies">
            <div className="max-w-screen-xl mx-auto flex flex-col gap-4">
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Now Playing</h2>
                    <Movie items={data.movie.now_playing} source="now_playing" />
                </div>
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Upcoming</h2>
                    <Movie items={data.movie.upcoming} source="upcoming" />
                </div>
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Popular</h2>
                    <Movie items={data.movie.popular} source="popular" />
                </div>
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Top Rated</h2>
                    <Movie items={data.movie.top_rated} source="top_rated" />
                </div>
            </div>
        </MainLayout>
    )
}

export default Movies;
