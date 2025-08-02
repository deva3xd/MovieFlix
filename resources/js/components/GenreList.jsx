import React from "react";
import { Link } from "@inertiajs/react";

const Genre = ({ data }) => {
    return (
        <div className="bg-custom-primary text-white px-8 py-5">
            <div className="mb-4 flex items-center">
                <h2 className="text-xl sm:text-3xl font-medium">Genres</h2>
                <div className="ms-2 hover:underline dropdown dropdown-start">
                    <div tabIndex="0" role="button">
                        <svg
                            width="15px"
                            viewBox="0 0 1024 1024"
                            className="icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
                                    fill="#ffffff"
                                ></path>
                            </g>
                        </svg>
                    </div>
                    <div
                        tabIndex="0"
                        className="menu menu-sm dropdown-content z-[1] p-2 shadow rounded-tl-none rounded-box bg-custom-primary border border-custom-secondary w-[16rem] md:w-[50rem] "
                    >
                        <div className="flex flex-wrap mx-2">
                            {data.map((item) => {
                                return (
                                    <Link
                                        key={item.id}
                                        className="w-1/2 sm:w-1/6 hover:underline my-1"
                                        href={route("genre", {
                                            id: item.id,
                                        })}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Link
                    className="bg-custom-secondary flex flex-col justify-center items-center text-white rounded-lg py-3 sm:py-6 w-full hover:bg-opacity-70"
                    href={route("genre", { id: 28 })}
                >
                    <div className="w-6 sm:w-12">
                        <svg
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#ffffff"
                            className="w-full h-auto"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <path fill="var(--ci-primary-color, #ffffff)" d="M136,488H495.985V24H16V488H136ZM408,56h55.985V96H408Zm0,72h55.985v40H408Zm0,72h55.985v40H408Zm0,72h55.985v40H408Zm0,72h55.985v40H408Zm0,72h55.985v40H408ZM136,200V56H375.985V240H136Zm0,216V272H375.985V456H136ZM48,56h56V96H48Zm0,72h56v40H48Zm0,72h56v40H48Zm0,72h56v40H48Zm0,72h56v40H48Zm0,72h56v40H48Z" className="ci-primary"></path>
                        </svg>
                    </div>
                    <p className="text-sm">
                        Action
                    </p>
                </Link>
                <Link
                    className="bg-custom-secondary flex flex-col justify-center items-center text-white rounded-lg py-3 sm:py-6 w-full hover:bg-opacity-70"
                    href={route("genre", { id: 10749 })}
                >
                    <div className="w-6 sm:w-12">
                        <svg
                            fill="#ffffff"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path>
                            </g>
                        </svg>
                    </div>
                    <p className="text-sm">
                        Romance
                    </p>
                </Link>
                <Link
                    className="bg-custom-secondary flex flex-col justify-center items-center text-white rounded-lg py-3 sm:py-6 w-full hover:bg-opacity-70"
                    href={route("genre", { id: 27 })}
                >
                    <div className="w-6 sm:w-12">
                        <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2 6C2 2.68629 4.68629 0 8 0C11.3137 0 14 2.68629 14 6V16H12L10 14L8 16L6 14L4 16H2V6ZM7 6C7 6.55228 6.55228 7 6 7C5.44772 7 5 6.55228 5 6C5 5.44772 5.44772 5 6 5C6.55228 5 7 5.44772 7 6ZM10 7C10.5523 7 11 6.55228 11 6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6C9 6.55228 9.44772 7 10 7Z"
                                    fill="#ffffff"
                                ></path>{" "}
                            </g>
                        </svg>
                    </div>
                    <p className="text-sm">
                        Horror
                    </p>
                </Link>
                <Link
                    className="bg-custom-secondary flex flex-col justify-center items-center text-white rounded-lg py-3 sm:py-6 w-full hover:bg-opacity-70"
                    href={route("genre", { id: 878 })}
                >
                    <div className="w-6 sm:w-12">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                    d="M9.03429 5.96305L6.49114 8.49856C6.02369 8.9646 5.59488 9.3921 5.25624 9.77856C5.03877 10.0267 4.82145 10.2984 4.63737 10.5985L4.61259 10.5738C4.56555 10.5269 4.54201 10.5034 4.51839 10.4805C4.07636 10.0516 3.55641 9.71062 2.98636 9.47575C2.9559 9.4632 2.92498 9.45095 2.86314 9.42645L2.48449 9.27641C1.97153 9.07315 1.83482 8.41279 2.22514 8.02365C3.34535 6.90684 4.69032 5.56594 5.33941 5.29662C5.91185 5.05911 6.53023 4.98008 7.12664 5.06822C7.67311 5.14898 8.19006 5.42968 9.03429 5.96305Z"
                                    fill="#ffffff"
                                ></path>{" "}
                                <path
                                    d="M13.3767 19.3132C13.5816 19.5212 13.7177 19.6681 13.8408 19.8251C14.0031 20.0322 14.1483 20.2523 14.2748 20.4829C14.4172 20.7426 14.5278 21.02 14.749 21.5748C14.929 22.0265 15.5272 22.1459 15.8746 21.7995L15.9586 21.7157C17.0788 20.5988 18.4237 19.2579 18.6938 18.6108C18.9321 18.04 19.0113 17.4235 18.9229 16.8289C18.8419 16.2841 18.5605 15.7688 18.0256 14.9273L15.474 17.4713C14.9959 17.9479 14.5576 18.385 14.1612 18.7273C13.9236 18.9325 13.6637 19.1376 13.3767 19.3132Z"
                                    fill="#ffffff"
                                ></path>{" "}
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.4467 16.3769L20.2935 10.5476C21.1356 9.70811 21.5566 9.28836 21.7783 8.75458C22.0001 8.22081 22.0001 7.62719 22.0001 6.43996V5.87277C22.0001 4.04713 22.0001 3.13431 21.4312 2.56715C20.8624 2 19.9468 2 18.1157 2H17.5468C16.356 2 15.7606 2 15.2252 2.2211C14.6898 2.4422 14.2688 2.86195 13.4268 3.70146L7.57991 9.53078C6.59599 10.5117 5.98591 11.12 5.74966 11.7075C5.67502 11.8931 5.6377 12.0767 5.6377 12.2692C5.6377 13.0713 6.2851 13.7168 7.57991 15.0077L7.75393 15.1812L9.79245 13.1123C10.0832 12.8172 10.558 12.8137 10.8531 13.1044C11.1481 13.3951 11.1516 13.87 10.8609 14.1651L8.8162 16.2403L8.95326 16.3769C10.2481 17.6679 10.8955 18.3133 11.7 18.3133C11.8777 18.3133 12.0478 18.2818 12.2189 18.2188C12.8222 17.9966 13.438 17.3826 14.4467 16.3769ZM17.1935 9.5312C16.435 10.2874 15.2053 10.2874 14.4468 9.5312C13.6883 8.775 13.6883 7.54895 14.4468 6.79274C15.2053 6.03653 16.435 6.03653 17.1935 6.79274C17.952 7.54895 17.952 8.775 17.1935 9.5312Z"
                                    fill="#ffffff"
                                ></path>{" "}
                            </g>
                        </svg>
                    </div>
                    <p className="text-sm">
                        Sci-Fi
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Genre;
