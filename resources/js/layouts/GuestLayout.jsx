export default function Guest({ children }) {
    return (
        <div className="max-w-screen-2xl mx-auto h-screen flex flex-col justify-between items-center">
            {children}
        </div>
    );
}
