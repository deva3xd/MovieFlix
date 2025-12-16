import MainLayout from "@/layouts/MainLayout";
import Movie from "@/components/Movie";

const Movies = ({ nowPlaying, upcoming, topRated, popular }) => {
    return (
        <MainLayout title="Movies">
            <div className="max-w-screen-xl mx-auto flex flex-col gap-4">
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Popular</h2>
                    <Movie items={popular} />
                </div>
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Now Playing</h2>
                    <Movie items={nowPlaying} />
                </div>
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Upcoming</h2>
                    <Movie items={upcoming} />
                </div>
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Top Rated</h2>
                    <Movie items={topRated} />
                </div>
            </div>
        </MainLayout>
    )
}

export default Movies;