import MainLayout from "@/layouts/MainLayout";
import Header from "@/components/Header";
import Movie from "@/components/Movie";

const Home = ({ movie, apiKey, cart }) => {
    return (
        <MainLayout title="Home">
            <div className="max-w-screen-xl mx-auto">
                <Header items={movie} apiKey={apiKey} cart={cart} />
                <Movie items={movie} />
            </div>
        </MainLayout>
    )
}

export default Home;