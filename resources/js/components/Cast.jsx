import { get } from "@/api/apiClient";
import { useState, useEffect } from "react";

const Cast = ({ id }) => {
    const imgURL = import.meta.env.VITE_IMGURL;
    const [list, setList] = useState([]);

    useEffect(() => {
        get(`/${id}/credits`)
            .then(res => { setList(res.data.cast) })
            .catch(err => console.log(err));
    }, []);

    const limitList = list.slice(0, 4);

    return (
        <div className="bg-gray-300">
            <div className="flex flex-wrap p-1">
                {limitList.map((list) => (
                    <div className="w-1/2 flex my-1">
                        <div className="avatar">
                            <div className="w-32 rounded">
                                <img src={`${imgURL}/w500/${list.profile_path}`} alt="Profile" />
                            </div>
                        </div>
                        <div className="flex items-center mx-3">
                            <div className="text-black">
                                <h5 className="text-2xl font-bold">{list.name}</h5>
                                <p className="font-extralight">{list.character}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cast;