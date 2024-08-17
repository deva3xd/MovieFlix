import Banner from "@/images/banner.png";

const Header = () => {
    return (
        <div className="relative text-white">
            <img src={Banner} className="object-cover h-96 w-full" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-custom-primary">
                <div className="flex items-center h-full">
                    <div className="px-8">
                        <h1 className="text-5xl font-semibold">Welcome,</h1>
                        <p className="text-2xl">Best website to order cinema ticket</p>
                    </div>
                    <div className="form-control w-2/5 ms-40">
                        <input type="text" placeholder="Search Movie" className="bg-white text-black input input-bordered w-24 md:w-auto" />
                    </div>
                    <button className="btn ms-2">Button</button>
                </div>
            </div>
        </div>
    )
}

export default Header;