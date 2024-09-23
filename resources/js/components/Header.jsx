import Banner from "@/assets/images/banner.png";

const Header = () => {
    return (
        <div className="relative text-white">
            <img src={Banner} className="object-cover h-96 w-full" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-custom-primary">
                <div className="flex px-8 items-center h-full">
                    <div className="w-1/2">
                        <h1 className="text-5xl font-semibold">Welcome,</h1>
                        <p className="text-2xl">Best website to order cinema ticket</p>
                    </div>
                    <div className="w-1/2">
                        <div className="form-control flex flex-row">
                            <input type="text" placeholder="Search Ongoing Movie" className="bg-white text-black input input-bordered w-full" />
                            <button className="btn ms-1">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;