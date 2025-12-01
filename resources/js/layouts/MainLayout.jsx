import { Head } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function MainLayout({ children, title }) {
    return (
        <>
            <Head title={title} />
            <div className="drawer lg:drawer-open bg-background">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Navbar />
                    <div className="mt-16">
                        {children}
                    </div>
                    <Footer />
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible z-[999]">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start is-drawer-close:w-14 is-drawer-open:w-64 bg-foreground border-r border-primary/25">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </>
    );
}