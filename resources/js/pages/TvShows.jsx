import MainLayout from "@/layouts/MainLayout";
import Tv from "@/components/Tv";
import useAutoReload from "@/hooks/useAutoReload";

const TvShows = ({ data }) => {
    useAutoReload("data", data);

    return (
        <MainLayout title="Movies">
            <div className="max-w-screen-xl mx-auto flex flex-col gap-4">
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Popular</h2>
                    <Tv items={data.tv.popular} />
                </div>
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Airing Today</h2>
                    <Tv items={data.tv.airing_today} />
                </div>
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">On The Air</h2>
                    <Tv items={data.tv.on_the_air} />
                </div>
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Top Rated</h2>
                    <Tv items={data.tv.top_rated} />
                </div>
            </div>
        </MainLayout>
    )
}

export default TvShows;
