import Navbar from "@/Components/Navbar";
import Header from "@/Components/Header";
import { Head } from "@inertiajs/react";
import Ongoing from "@/Components/Ongoing";
import Upcoming from "@/Components/Upcoming";
import Footer from "@/Components/Footer";

const Index = ({auth}) => {
    let user;
    console.log(auth ? user = auth.user : user = null);
    return (
        <>
            <Head title="Home" />
            <Navbar user={user} />
            <Header />
            <Ongoing />
            <Upcoming />
            <Footer />
        </>
    )
}

export default Index;