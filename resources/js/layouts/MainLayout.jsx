import { Head } from "@inertiajs/react";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({ children, title }) {
    return (
        <>
            <Head title={title} />
            <Navbar />
            {children}
            <Toaster />
            <Footer />
        </>
    );
}