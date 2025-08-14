import "swiper/css";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Play, Plus } from "lucide-react";

const Header = ({ items, url, apiKey }) => {
    const [expanded, setExpanded] = useState(false);
    const imgURL = import.meta.env.VITE_IMGURL;

const handleTrailer = async (id) => {
    try {
        const res = await fetch(
            `${url}/movie/${id}/videos?language=en-US&api_key=${apiKey}`
        );
        const data = await res.json();

        if (data.results && data.results.length > 0) {
            const trailer = data.results.find(v => v.type === "Trailer");
            const trailerKey = trailer ? trailer.key : data.results[0].key;

            window.open(`https://www.youtube.com/watch?v=${trailerKey}`);
        }
    } catch (err) {
        console.error(err);
    }
};

    return (
        <Swiper loop="true" className="mySwiper">
            {items.map((item) => (
                <SwiperSlide key={item.id}>
                    <img
                        src={`${imgURL}/original/${item.backdrop_path}`}
                        className="object-cover h-[33rem] w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-custom-primary">
                        <div className="flex flex-col sm:flex-row px-8 items-center h-full justify-end sm:justify-start">
                            <div className="w-full sm:w-1/2 my-2">
                                <h1 className="text-2xl sm:text-4xl font-semibold text-white">
                                    {item.title}
                                </h1>
                                <p className={`text-base text-justify ${expanded ? "" : "line-clamp-3"}`}>{item.overview}</p>
                                <button onClick={() => setExpanded(true)} className="hover:underline" hidden={expanded}>{expanded ? "" : "Read More..."}</button>
                                <div className="flex gap-2 my-2">
                                    <button onClick={() => handleTrailer(item.id)} className="flex items-center gap-1 bg-white text-black px-4 py-2 rounded-md font-medium">
                                        <Play size={20} fill="true" />
                                        Trailer
                                    </button>
                                    <form>
                                        <button className="flex items-center gap-1 bg-custom-secondary text-white px-4 py-2 rounded-md font-medium">
                                            <Plus size={20} />
                                            Add to Cart
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Header;
