export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-between items-center bg-custom-primary">
            {children}
        </div>
    );
}
