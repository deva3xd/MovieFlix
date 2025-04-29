import MainLayout from "@/layouts/MainLayout";
import Header from "@/components/Header";
import Ongoing from "@/components/Ongoing";
import Upcoming from "@/components/Upcoming";
import Genre from "@/components/Genre";

const Page = ({ auth, upcoming, ongoing }) => {
    return (
        <MainLayout title='Home' user={auth.user}>
            <Header data={ongoing} />
            <Ongoing data={ongoing} />
            <Upcoming data={upcoming} />
            <Genre />
        </MainLayout>
    )
}

export default Page;