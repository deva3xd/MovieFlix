import { Link } from "@inertiajs/react";
import { useState } from "react";
import { parseISO, format } from 'date-fns';

const Card = ({ item, link, title, date }) => {
    const [loaded, setLoaded] = useState(false);
    const formattedDate = format(parseISO(date), "dd MMM, yyyy");

    return (
        <Link href={route(link, { id: item.id })}>
            <figure>
                {!loaded && (
                    <div className="rounded-md aspect-[2/3] absolute inset-0 animate-pulse bg-gray-300" />
                )}

                <img
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt="poster image"
                    className={`rounded-md aspect-[2/3] ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                />
            </figure>
            <div className="flex flex-col my-1">
                <span className="font-medium text-sm sm:text-base line-clamp-1" title={title}>{title}</span>
                <span className="font-light text-gray-500 text-xs sm:text-sm">
                    {formattedDate ? formattedDate : "undefined"}
                </span>
            </div>
        </Link>
    )
}

export default Card;