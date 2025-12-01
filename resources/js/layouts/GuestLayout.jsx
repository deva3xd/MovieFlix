export default function Guest({ children }) {
    return (
        <div className="w-screen h-screen flex flex-row justify-center items-center bg-background inria-sans-regular">
            {children}
        </div>
    );
}
