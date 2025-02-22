import { Head } from "@inertiajs/react";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({ children, title, user }) {	
	return (
		<div className="2xl:container mx-auto">
			<Head title={title} />
			<Navbar user={user} />
			<main className="pt-[73px]">{children}</main>
			<Footer />
			<Toaster />
		</div>
	)
}