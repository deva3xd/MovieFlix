import SearchButton from "@/components/ui/buttons/SearchButton";
import Input from "@/components/ui/Input";
import MainLayout from "@/layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import { SearchIcon } from "lucide-react";

const Search = ({ results }) => {
    const { data, setData, get } = useForm({ category: "", query: "" });

    const handleSubmit = (e) => {
        e.preventDefault();

        get(route('search'), data, {
            preserveState: true,
        });
    };

    return (
        <MainLayout title="Search">
            <div className="p-4 pt-0 text-white max-w-screen-xl mx-auto min-h-screen">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                        {/* category */}
                        <fieldset className="fieldset">
                            <select
                                id="category"
                                name="category"
                                value={data.category}
                                onChange={(e) => setData("category", e.target.value)}
                                className="select bg-primary text-background text-lg outline-none border-none focus:outline-none h-12"
                                required
                            >
                                <option value="" disabled>Category</option>
                                <option value="movie">Movie</option>
                                <option value="tv">TV Show</option>
                            </select>
                        </fieldset>
                        {/* search */}
                        <div className="w-1/2 flex gap-2 items-center">
                            <Input
                                id="query"
                                name="query"
                                value={data.query}
                                onChange={(e) => setData("query", e.target.value)}
                                placeholder="search"
                                className="w-full"
                            />
                            <SearchButton type="submit" children={<SearchIcon size={24} />} />
                        </div>

                    </div>
                </form>

                {/* results */}
                <div className="mt-4 pt-4 border-t border-white/30 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {results?.original.length > 0 ? (
                        results.original.map((r, index) => (
                            <div className="mb-5" key={index}>
                                <figure>
                                    <img
                                        src={`${r.poster_path ? `https://image.tmdb.org/t/p/w500/${r.poster_path}` : 'https://blocks.astratic.com/img/general-img-portrait.png'}`}
                                        alt={r.title}
                                        className="rounded-md h-72"
                                        loading="lazy"
                                    />
                                </figure>
                                <div className="flex flex-col my-1">
                                    <span className="font-medium text-sm sm:text-base line-clamp-1" title={r.title}>{r.title}</span>
                                    <span className="font-light text-gray-500 text-xs sm:text-sm">
                                        {r.release_date ? new Date(r.release_date).getFullYear() : "undefined"}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <span className="text-lg">
                            There's No Results
                        </span>
                    )}
                </div>

            </div>
        </MainLayout >
    )
}

export default Search;