import Navbar from "@/Components/Navbar";
import Header from "@/Components/Header";
import { Head } from "@inertiajs/react";
import OnGoing from "@/Components/OnGoing";
import Upcoming from "@/Components/Upcoming";
import Footer from "@/Components/Footer";

const Home = () => {
    return (
        <>
            <Head title="Home" />
            <Navbar />
            <Header />
            <OnGoing />
            <Upcoming />
            <Footer />
        </>
    )
}

export default Home;