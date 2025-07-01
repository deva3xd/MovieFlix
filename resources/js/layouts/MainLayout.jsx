import { Head } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({ children, title }) {
    return (
        <>
            <Navbar />
            <div className="max-w-screen-2xl mx-auto">
                <Head title={title} />
                <main className="pt-[64px]">{children}</main>
                <Footer />
            </div>
        </>
    );
}
