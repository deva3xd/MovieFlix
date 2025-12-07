import MainLayout from "@/layouts/MainLayout";
import Header from "@/components/Header";
import Movie from "@/components/Movie";
import Tv from "@/components/Tv";

const Home = ({ movie, tv, cart }) => {
    return (
        <MainLayout title="Home">
            <div className="max-w-screen-xl mx-auto">
                <Header items={movie} cart={cart} />
                <Movie items={movie} />
                <Tv items={tv} />
            </div>
        </MainLayout>
    )
}

export default Home;