import "swiper/css";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Play, Plus } from "lucide-react";

const Header = ({ data }) => {
    const [expanded, setExpanded] = useState(false);
    const imgURL = import.meta.env.VITE_IMGURL;

    const handleTrailer = (id) => {
        // const videoTMDB = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${KEY}`;

        // const videoURL = `https://www.youtube.com/watch?v=`
        // window.open(videoURL)
    }

    return (
        <Swiper loop="true" className="mySwiper">
            {data.map((item) => (
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
                                    <button className="flex items-center gap-1 bg-custom-secondary text-white px-4 py-2 rounded-md font-medium">
                                        <Plus size={20} />
                                        Add to Cart
                                    </button>
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
