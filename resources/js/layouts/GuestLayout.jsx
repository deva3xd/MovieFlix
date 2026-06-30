import { Head } from "@inertiajs/react";

export default function Guest({ children, title }) {
    return (
        <>
            <Head title={title} />
            <div className="w-screen h-screen flex flex-row justify-center items-center bg-background inria-sans-regular">
                {children}
            </div>
        </>
    );
}
