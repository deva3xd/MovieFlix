import MainLayout from "@/layouts/MainLayout";
import Header from "@/components/Header";
import Ongoing from "@/components/Ongoing";
import Upcoming from "@/components/Upcoming";

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