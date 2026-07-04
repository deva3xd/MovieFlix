import { Head } from "@inertiajs/react";

export default function Guest({ children, title }) {
    return (
        <div className="bg-gradient-to-r from-black to-red-600/15">
            <Head title={title} />
            <main className="max-w-7xl h-screen mx-auto flex justify-center items-center inria-sans-regular px-4">
                {children}
            </main>
        </div>
    )
}
