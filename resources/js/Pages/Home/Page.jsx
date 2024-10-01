import MainLayout from "@/layouts/MainLayout";
import Header from "@/components/Header";
import Ongoing from "@/components/Ongoing";
import Upcoming from "@/components/Upcoming";

const Page = ({ auth, upcoming, ongoing }) => {
    return (
        <MainLayout title='Home' user={auth.user}>
            <Header />
            <Ongoing data={ongoing} />
            <Upcoming data={upcoming} />
        </MainLayout>
    )
}

export default Page;