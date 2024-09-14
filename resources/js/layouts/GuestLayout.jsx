export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-custom-primary">
            <div className="w-full sm:max-w-md px-6 py-4">
                {children}
            </div>
        </div>
    );
}
