import { get } from "@/api/apiClient";
import { useState, useEffect } from "react";
import Profile from "@/assets/images/profile.png";

const Review = ({ id }) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        get(`movie/${id}/reviews`)
            .then(res => { setList(res.data.results) })
            .catch(err => console.log(err));
    }, []);

    const limitList = list.slice(0, 3);

    return (
        <>
            {
                list.length == 0 ? (
                    <div className="flex rounded-lg">
                        <div className="py-5 text-xl font-medium leading-none text-center text-white rounded-full animate-pulse">
                            loading...
                        </div>
                    </div>
                ) : (
                    limitList.map((list) => (
                        <div className="card card-compact bg-gray-300 w-72 shadow-xl mx-1" key={list.id}>
                            <figure className="h-28">
                                <img
                                    src={Profile}
                                    alt={list.author}
                                    className="rounded-full w-24"
                                />
                            </figure>
                            <div className="card-body text-black flex-none" style={{ padding: '10px 10px' }}>
                                <h2 className="card-title justify-center truncate">{list.author}!</h2>
                                <p className="truncate">{list.content}</p>
                                <div className="flex justify-center items-center">
                                    <h5 className="font-bold text-xl">{list.author_details.rating}/10</h5>
                                </div>
                            </div>
                        </div>
                    ))
                )}
        </>
    )
}

export default Review;