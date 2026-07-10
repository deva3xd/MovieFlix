import { useEffect, useState, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { Button } from "@/components/ui/Button";
import { Film, Tv, Star, Loader2, Search as SearchIcon } from "lucide-react";
import Input from "@/components/ui/Input";

const Search = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("movie");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    // focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        } else {
            setQuery("");
            setResults([]);
        }
    }, [isOpen]);

    // disable scroll when search is active
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // fetch results from controller
    const performSearch = (searchQuery = query, searchCategory = category) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }
        setLoading(true);
        fetch(`/search?category=${searchCategory}&query=${encodeURIComponent(searchQuery)}&json=true`)
            .then((res) => res.json())
            .then((data) => {
                setResults(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Search failed:", err);
                setLoading(false);
            });
    };

    // debounced search on type
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            performSearch(query, category);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query, category]);

    // don't render the overlay if we are on the actual search page or if closed
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        performSearch(query, category);
    };

    return (
        <div
            onClick={handleOverlayClick}
            className="h-screen w-screen bg-black/75 backdrop-blur-sm fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 cursor-pointer"
        >
            <div className="bg-zinc-950 w-full max-w-2xl rounded-md flex flex-col max-h-[75vh] cursor-default border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-zinc-900/40 border-b border-white/10 items-center">
                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            performSearch(query, e.target.value);
                        }}
                        className="bg-zinc-800 text-white border border-white/10 focus:outline-none focus:border-primary rounded-md px-3 h-12 text-sm font-semibold cursor-pointer"
                    >
                        <option value="movie">Movies</option>
                        <option value="tv">TV Shows</option>
                    </select>

                    <div className="flex-1 relative flex items-center">
                        <Input
                            ref={inputRef}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full text-white pr-10"
                            placeholder={`Search ${category === "movie" ? "movies" : "TV shows"}...`}
                        />
                    </div>

                    <Button className="rounded-md h-12" size="sm">Search</Button>
                </form>

                {/* results */}
                <div className="overflow-y-auto p-4 flex-1 scrollbar-thin scrollbar-thumb-zinc-850">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-white/50 gap-3">
                            <Loader2 className="animate-spin text-primary" size={32} />
                            <span className="text-sm">Searching...</span>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {results.map((result) => {
                                const title = result.title || result.name;
                                const date = result.release_date || result.first_air_date;
                                const year = date ? date.split("-")[0] : null;
                                const rating = typeof result.vote_average === "number" ? result.vote_average.toFixed(1) : "N/A";
                                const routeName = category === "movie" ? "movie.show" : "tv.show";

                                return (
                                    <Link
                                        key={result.id}
                                        href={route(routeName, { id: result.id })}
                                        onClick={onClose}
                                        className="flex gap-4 p-2 rounded-md hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-200 group"
                                    >
                                        {/* poster thumbnail */}
                                        <div className="w-12 h-18 bg-zinc-800 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center border border-white/5">
                                            {result.poster_path ? (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w92/${result.poster_path}`}
                                                    alt={title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                    loading="lazy"
                                                />
                                            ) : category === "movie" ? (
                                                <Film className="text-white/20" size={24} />
                                            ) : (
                                                <Tv className="text-white/20" size={24} />
                                            )}
                                        </div>

                                        {/* meta details */}
                                        <div className="flex-1 flex flex-col justify-center min-w-0">
                                            <h4 className="text-white font-medium text-sm sm:text-base group-hover:text-primary transition-colors truncate">
                                                {title}
                                            </h4>
                                            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/50 mt-1">
                                                {year && <span>{year}</span>}
                                                {year && <span>•</span>}
                                                <div className="flex items-center gap-1">
                                                    <Star className="text-amber-500 fill-amber-500" size={12} />
                                                    <span>{rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : query.trim() ? (
                        <div className="flex flex-col items-center justify-center py-16 text-white/40 text-center">
                            <span className="text-sm font-medium">No results found for "{query}"</span>
                            <span className="text-xs mt-1">Try checking for typos or searching a different category</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-white/30 text-center gap-3">
                            <div className="bg-white/5 rounded-full p-4">
                                <SearchIcon size={32} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">Search MovieFlix</span>
                                <span className="text-xs mt-1">Find your favorite movies, TV shows, and series instantly</span>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Search;