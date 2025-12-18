import MainLayout from "@/layouts/MainLayout";
import Tv from "@/components/Tv";

const TvShows = ({ airingToday, onTheAir, popular, topRated }) => {
    return (
        <MainLayout title="Movies">
            <div className="max-w-screen-xl mx-auto flex flex-col gap-4">
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Popular</h2>
                    <Tv items={popular} />
                </div>
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Airing Today</h2>
                    <Tv items={airingToday} />
                </div>
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">On The Air</h2>
                    <Tv items={onTheAir} />
                </div>
                <div>
                    <h2 className="text-xl text-white sm:text-3xl font-medium px-4">Top Rated</h2>
                    <Tv items={topRated} />
                </div>
            </div>
        </MainLayout>
    )
}

export default TvShows;