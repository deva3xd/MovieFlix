import MainLayout from "@/layouts/MainLayout";
import Header from "@/components/Header";
import Ongoing from "@/components/Ongoing";
import Upcoming from "@/components/Upcoming";
import GenreList from "@/components/GenreList";

const Movie = ({  upcoming, ongoing, genres, url, apiKey, carts }) => {
    return (
        <MainLayout title='Movie'>
            <Header items={ongoing} url={url} apiKey={apiKey} carts={carts} />
            <Ongoing items={ongoing} />
            <Upcoming items={upcoming} />
            <GenreList items={genres} />
        </MainLayout>
    )
}

export default Movie;