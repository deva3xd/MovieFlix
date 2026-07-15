import MainLayout from "@/layouts/MainLayout";
import CardList from "@/components/CardList";
import useAutoReload from "@/hooks/useAutoReload";

const Movies = ({ data }) => {
    useAutoReload("data", data);

    return (
        <MainLayout title="Movies">
            <div className="max-w-7xl mx-auto px-4 mt-24">
                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="text-xl text-white sm:text-3xl font-medium">
                            <span className="text-primary me-2">|</span>Ongoing
                        </h2>
                        <CardList items={data.movie.now_playing} source="now_playing" />
                    </div>
                    <div>
                        <h2 className="text-xl text-white sm:text-3xl font-medium">
                            <span className="text-primary me-2">|</span>Upcoming
                        </h2>
                        <CardList items={data.movie.upcoming} source="upcoming" />
                    </div>
                    <div>
                        <h2 className="text-xl text-white sm:text-3xl font-medium">
                            <span className="text-primary me-2">|</span>Popular
                        </h2>
                        <CardList items={data.movie.popular} source="popular" />
                    </div>
                    <div>
                        <h2 className="text-xl text-white sm:text-3xl font-medium">
                            <span className="text-primary me-2">|</span>Top Rated
                        </h2>
                        <CardList items={data.movie.top_rated} source="top_rated" />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Movies;
