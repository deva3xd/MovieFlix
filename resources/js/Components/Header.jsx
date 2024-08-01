import Banner from "@/images/banner.jpg";

const Header = () => {
    return (
        <div className="relative">
            <img src={Banner} className="object-cover h-96 w-full" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-custom-primary">
                <div className="flex items-center h-full">
                    <div className="px-8">
                        <h1 className="text-5xl font-semibold">Welcome,</h1>
                        <p className="text-2xl">Best website to order cinema ticket</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;