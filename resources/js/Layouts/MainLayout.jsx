import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function MainLayout({ children, title, user }) {	
	return (
		<div className="container mx-auto">
			<Head title={title} />
			<Navbar user={user} />
			<main className="pt-16">{children}</main>
			<Footer />
			{/* <div className="toast toast-start">
				<div className="alert alert-info">
					<span>New mail arrived.</span>
				</div>
			</div> */}
		</div>
	)
}