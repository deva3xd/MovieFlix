import MainLayout from "@/layouts/MainLayout";
import Header from "@/components/Header";
import Movie from "@/components/Movie";

const Home = ({ ongoing, url, apiKey, carts }) => {
    return (
        <MainLayout title="Home">
            <div className="max-w-screen-xl mx-auto">
                <Header items={ongoing} url={url} apiKey={apiKey} carts={carts} />
                <Movie items={ongoing} />
                <Movie items={ongoing} />
            </div>
        </MainLayout>
    )
}

export default Home;