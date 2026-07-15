import MainLayout from "@/layouts/MainLayout";
import CardList from "@/components/CardList";
import useAutoReload from "@/hooks/useAutoReload";

const TvShows = ({ data }) => {
    useAutoReload("data", data);

    return (
        <MainLayout title="Movies">
            <div className="max-w-7xl mx-auto px-4 mt-24">
                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="text-xl text-white sm:text-3xl font-medium">
                            <span className="text-primary me-2">|</span>On The Air
                        </h2>
                        <CardList items={data.tv.on_the_air} source="now_playing" />
                    </div>
                    <div>
                        <h2 className="text-xl text-white sm:text-3xl font-medium">
                            <span className="text-primary me-2">|</span>Airing Today
                        </h2>
                        <CardList items={data.tv.airing_today} source="now_playing" />
                    </div>
                    <div>
                        <h2 className="text-xl text-white sm:text-3xl font-medium">
                            <span className="text-primary me-2">|</span>Popular
                        </h2>
                        <CardList items={data.tv.popular} source="now_playing" />
                    </div>
                    <div>
                        <h2 className="text-xl text-white sm:text-3xl font-medium">
                            <span className="text-primary me-2">|</span>Top Rated
                        </h2>
                        <CardList items={data.tv.top_rated} source="now_playing" />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default TvShows;
