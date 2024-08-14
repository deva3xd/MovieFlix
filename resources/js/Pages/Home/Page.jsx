import MainLayout from "@/Layouts/MainLayout";
import Header from "@/Components/Header";
import Ongoing from "@/Components/Ongoing";
import Upcoming from "@/Components/Upcoming";

const Page = ({ auth }) => {
    const user = auth ? auth.user : null;

    return (
        <MainLayout title='Home' user={user}>
            <Header />
            <Ongoing />
            <Upcoming />
        </MainLayout>
    )
}

export default Page;