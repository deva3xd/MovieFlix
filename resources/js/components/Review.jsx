import { get } from "@/api/apiClient";
import { useState, useEffect } from "react";
import Profile from "@/assets/images/profile.png";
import Star from "@/assets/images/star.png";

const Review = ({ id }) => {
    const imgURL = import.meta.env.VITE_IMGURL;
    const [list, setList] = useState([]);

    useEffect(() => {
        get(`/${id}/reviews`)
            .then(res => { setList(res.data.results) })
            .catch(err => console.log(err));
    }, []);

    const limitList = list.slice(0, 3);

    return (
        <div className="flex flex-wrap justify-between gap-2 py-1">
            {limitList.map((list) => (
                <div className="card bg-gray-300 w-80 shadow-xl">
                    <figure className="h-36">
                        <img
                            src={Profile}
                            alt={list.author}
                            className="rounded-full w-32" />
                    </figure>
                    <div className="card-body text-black py-2">
                        <h2 className="card-title justify-center truncate">{list.author}!</h2>
                        <p className="truncate">{list.content}</p>
                        <div className="flex justify-center items-center">
                            <h5 className="font-bold text-xl">{list.author_details.rating}</h5><img src={Star} className="h-6" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Review;