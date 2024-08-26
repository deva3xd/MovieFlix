import MainLayout from "@/Layouts/MainLayout";
import Header from "@/Components/Header";
import Ongoing from "@/Components/Ongoing";
import Upcoming from "@/Components/Upcoming";

const Page = ({ auth }) => {
    return (
        <MainLayout title='Home' user={auth.user}>
            <Header />
            <Ongoing />
            <Upcoming />
        </MainLayout>
    )
}

export default Page;