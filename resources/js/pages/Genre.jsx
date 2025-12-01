import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { Link } from "@inertiajs/react";

const Genre = ({ movies }) => {
    const imgURL = import.meta.env.VITE_IMGURL;
    return (
        <MainLayout title='Genre'>
            <div className="grid grid-cols-3 sm:grid-cols-5 justify-center p-8 gap-4 bg-custom-primary">
                {movies.map((movie) => {
                    const year = new Date(movie.release_date).getFullYear();

                    return (
                        <Link
                            href={route("movie.detail", {
                                id: movie.id,
                                status: "ongoing",
                            })}
                            key={movie.id}
                        >
                            <div className="card rounded-sm">
                                <figure>
                                    <img
                                        src={`${imgURL}/w500/${movie.poster_path}`}
                                        alt={movie.title}
                                        className="rounded-sm"
                                    />
                                </figure>
                                <div className="flex flex-col my-1">
                                    <p className="font-medium text-sm sm:text-base">
                                        {movie.title}
                                    </p>
                                    <p className="font-light text-gray-500 text-xs sm:text-sm">{year}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </MainLayout>
    );
};

export default Genre;
