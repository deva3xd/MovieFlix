import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { Link } from "@inertiajs/react";

const Genre = ({ movies }) => {
     const imgURL = import.meta.env.VITE_IMGURL;
    return (
        <MainLayout title='Genre'>
            <div className="flex flex-wrap justify-center p-8 gap-5">
            {movies.map((movie) => (
                <Link
                    href={route("detail", {
                        id: movie.id,
                        status: "ongoing",
                    })}
                    key={movie.id}
                    >
                    <div className="card w-64 shadow-xl rounded-lg">
                        <figure>
                            <img
                                src={`${imgURL}/w500/${movie.poster_path}`}
                                alt={movie.title}
                                className="rounded-lg"
                            />
                        </figure>
                    </div>
                </Link>
            ))}
            </div>
        </MainLayout>
    );
};

export default Genre;
