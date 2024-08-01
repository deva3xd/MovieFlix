import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function MainLayout({ children, title, user }) {	
	return (
		<>
			<Head title={title} />
			<Navbar user={user} />
			<main className="pt-16">{children}</main>
			<Footer />
		</>
	)
}