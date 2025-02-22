import { get } from "@/api/apiClient";
import { useState, useEffect } from "react";

const Cast = ({ id }) => {
    const imgURL = import.meta.env.VITE_IMGURL;
    const [list, setList] = useState([]);

    useEffect(() => {
        get(`movie/${id}/credits`)
            .then(res => { setList(res.data.cast) })
            .catch(err => console.log(err));
    }, []);

    const limitList = list.slice(0, 4);

    return (
        <>
            {
                list.length == 0 ? (
                    <div className="flex rounded-lg">
                        <div className="py-1 text-xl font-medium leading-none text-center text-white rounded-full animate-pulse">
                            loading...
                        </div>
                    </div>
                ) : (
                    limitList.map((list) => (
                        <div className="bg-gray-300 w-1/2 border-2" key={list.id}>
                            <div className="flex">
                                <div className="avatar">
                                    <div className="w-16 sm:w-32 rounded">
                                        <img src={`${imgURL}/w500/${list.profile_path}`} alt="Profile" />
                                    </div>
                                </div>
                                <div className="flex items-center mx-2">
                                    <div className="text-black">
                                        <h5 className="text-sm sm:text-2xl font-bold">{list.name}</h5>
                                        <p className="text-xs sm:text-lg font-extralight">{list.character}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </>
    )
}

export default Cast;