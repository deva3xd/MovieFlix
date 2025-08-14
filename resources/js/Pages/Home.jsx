import MainLayout from "@/layouts/MainLayout";
import Header from "@/components/Header";
import Ongoing from "@/components/Ongoing";
import Upcoming from "@/components/Upcoming";
import GenreList from "@/components/GenreList";

const Home = ({  upcoming, ongoing, genres, url, apiKey }) => {
    return (
        <MainLayout title='Home'>
            <Header items={ongoing} url={url} apiKey={apiKey} />
            <Ongoing items={ongoing} />
            <Upcoming items={upcoming} />
            <GenreList items={genres} />
        </MainLayout>
    )
}

export default Home;