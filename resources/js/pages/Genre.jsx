import React from "react";
import MainLayout from "@/layouts/MainLayout";

const Genre = ({ movies }) => {
  return (
    <MainLayout title="Genre">
      <div className="grid grid-cols-3 sm:grid-cols-5 justify-center p-8 gap-4 bg-custom-primary">
        {movies.map((movie) => (
          <div className="card rounded-sm">
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="rounded-sm"
              />
            </figure>
            <div className="flex flex-col my-1">
              <p className="font-medium text-sm sm:text-base">
                {movie.title}
              </p>
              <p className="font-light text-gray-500 text-xs sm:text-sm">{new Date(movie.release_date).getFullYear()}</p>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}

export default Genre;