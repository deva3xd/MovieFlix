import "swiper/css";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Header = ({ data }) => {
    const query = useRef("");
    const result = useRef([]);
    const loading = useRef(false);
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const imgURL = import.meta.env.VITE_IMGURL;
    const [expanded, setExpanded] = useState(false);

    const KEY = import.meta.env.VITE_API_KEY;

    const BASE_URL = "https://api.themoviedb.org/3/search/movie";

    useEffect(() => {
        if (!query) return;

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const timeoutId = setTimeout(async () => {
            loading.current = true;
            try {
                const response = await axios.get(BASE_URL, {
                    params: {
                        api_key: KEY,
                        query: query,
                        language: "en-US",
                        page: 1,
                    },
                });
                result.current = response.data.results;
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                loading.current = false;
            }
        }, 500);

        setDebounceTimeout(timeoutId);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [query]);

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
                                    <button className="flex items-center gap-1 bg-white text-black px-4 py-2 rounded-md font-medium">
                                        <svg
                                            width="12px"
                                            viewBox="-0.5 0 7 7"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            fill="#000000"
                                        >
                                            <g
                                                id="SVGRepo_bgCarrier"
                                                strokeWidth="0"
                                            ></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                {" "}
                                                <title>play [#1003]</title>{" "}
                                                <desc>
                                                    Created with Sketch.
                                                </desc>{" "}
                                                <defs> </defs>{" "}
                                                <g
                                                    id="Page-1"
                                                    stroke="none"
                                                    strokeWidth="1"
                                                    fill="none"
                                                    fillRule="evenodd"
                                                >
                                                    {" "}
                                                    <g
                                                        id="Dribbble-Light-Preview"
                                                        transform="translate(-347.000000, -3766.000000)"
                                                        fill="#000000"
                                                    >
                                                        {" "}
                                                        <g
                                                            id="icons"
                                                            transform="translate(56.000000, 160.000000)"
                                                        >
                                                            {" "}
                                                            <path
                                                                d="M296.494737,3608.57322 L292.500752,3606.14219 C291.83208,3605.73542 291,3606.25002 291,3607.06891 L291,3611.93095 C291,3612.7509 291.83208,3613.26444 292.500752,3612.85767 L296.494737,3610.42771 C297.168421,3610.01774 297.168421,3608.98319 296.494737,3608.57322"
                                                                id="play-[#1003]"
                                                            >
                                                                {" "}
                                                            </path>{" "}
                                                        </g>{" "}
                                                    </g>{" "}
                                                </g>{" "}
                                            </g>
                                        </svg>
                                        Trailer
                                    </button>
                                    <button className="flex items-center gap-1 bg-custom-secondary text-white px-4 py-2 rounded-md font-medium">
                                        <svg width="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
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
