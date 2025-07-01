import MainLayout from "@/layouts/MainLayout";
import Header from "@/components/Header";
import Ongoing from "@/components/Ongoing";
import Upcoming from "@/components/Upcoming";
import GenreList from "@/components/GenreList";

const Home = ({  upcoming, ongoing, genres }) => {
    return (
        <MainLayout title='Home'>
            <Header data={ongoing} />
            <Ongoing data={ongoing} />
            <Upcoming data={upcoming} />
            <GenreList data={genres} />
        </MainLayout>
    )
}

export default Home;