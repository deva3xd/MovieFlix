import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-custom-primary">
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-black" />
                </Link>
            </div> */}

            <div className="w-full sm:max-w-md px-6 py-4 bg-custom-secondary shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
