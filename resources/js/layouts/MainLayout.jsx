import { Head } from "@inertiajs/react";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({ children, title, user }) {
    return (
        <>
            <Navbar user={user} />
            <div className="max-w-screen-2xl mx-auto bg-white">
                <Head title={title} />
                <main className="pt-[64px]">{children}</main>
                <Footer />
                <Toaster />
            </div>
        </>
    );
}
