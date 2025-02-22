import { useState, useEffect } from "react";
import Banner from "@/assets/images/banner.png";

const Header = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    const KEY = import.meta.env.VITE_API_KEY;

    const BASE_URL = "https://api.themoviedb.org/3/search/movie";

    useEffect(() => {
        if (!query) return;

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const timeoutId = setTimeout(async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(BASE_URL, {
                    params: {
                        api_key: KEY,
                        query: query,
                        language: "en-US",
                        page: 1,
                    },
                });
                setResults(response.data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setIsLoading(false);
            }
        }, 500);

        setDebounceTimeout(timeoutId);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [query]);

    return (
        <div className="relative text-white">
            <img src={Banner} className="object-cover h-96 w-full" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-custom-primary">
                <div className="flex flex-col sm:flex-row px-8 items-center h-full justify-center sm:justify-between">
                    <div className="w-full sm:w-1/2">
                        <h1 className="text-2xl sm:text-5xl font-semibold">Welcome,</h1>
                        <p className="text-lg sm:text-2xl">
                            Best website to order cinema ticket
                        </p>
                    </div>
                    <div className="w-full sm:w-2/5 relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search Movie"
                            className="bg-white text-black border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none"
                        />

                        {isLoading && (
                            <div className="absolute top-full left-0 bg-white text-black px-4 py-2 rounded-md-md shadow-md w-full">
                                Loading...
                            </div>
                        )}

                        {query && !isLoading && (
                            <ul className="absolute top-full left-0 bg-white text-black border border-gray-300 rounded-md shadow-md w-full max-h-60 overflow-y-auto z-10">
                                {results.length > 0 ? (
                                    results.slice(0, 4).map((movie) => (
                                        <li
                                            key={movie.id}
                                            className="px-4 py-2 border-b border-gray-200 last:border-none hover:bg-gray-100 cursor-pointer"
                                        >
                                            {movie.title}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-4 py-2 text-gray-500">
                                        No results found
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
