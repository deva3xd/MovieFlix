import { Link } from "@inertiajs/react";
import { useState } from "react";
import { parseISO, format } from 'date-fns';

const Card = ({ item, link, title, date }) => {
    const [loaded, setLoaded] = useState(false);
    const formattedDate = format(parseISO(date), "dd MMM, yyyy");

    return (
        <Link href={route(link, { id: item.id })} className="hover:text-primary">
            <figure>
                <img
                    src={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : "https://blocks.astratic.com/img/general-img-portrait.png"}
                    alt="poster image"
                    className={`rounded-md border border-white/20 object-cover ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                />

            </figure>
            <div className="flex flex-col my-1">
                <span className="font-medium text-sm sm:text-base line-clamp-1" title={title}>{title}</span>
                <span className="font-light text-gray-400 text-xs sm:text-sm">
                    {formattedDate ? formattedDate : "undefined"}
                </span>
            </div>
        </Link>
    )
}

export default Card;