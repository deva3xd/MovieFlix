import { Button } from "@/components/ui/Button";
import { useForm } from "@inertiajs/react";
import { Search as SearchIcon } from "lucide-react";
import { useEffect } from "react";
import Input from "@/components/ui/Input";
import MainLayout from "@/layouts/MainLayout";
import Card from "@/components/ui/Card";

const Search = ({ results, queryInput }) => {
    const { data, setData, get } = useForm({
        category: "movie",
        query: queryInput ?? "",
    });

    // set initial category from URL on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlCategory = params.get("category");
        if (urlCategory) {
            setData("category", urlCategory);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.query.trim() || !data.category) return;
        get(route("search"), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCategoryChange = (newCategory) => {
        setData("category", newCategory);
        if (data.query.trim()) {
            get(route("search"), {
                category: newCategory,
                query: data.query,
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    return (
        <MainLayout title="Search">
            <div className="max-w-7xl mx-auto px-4 mt-24">

                {/* search */}
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-end">
                        {/* category toggles */}
                        <div className="flex gap-2">
                            {["movie", "tv"].map((cat) => (
                                <Button
                                    key={cat}
                                    type="button"
                                    onClick={() => handleCategoryChange(cat)}
                                    variant={data.category === cat ? "primary" : "outline"}
                                    className="rounded-md h-12 px-4"

                                >
                                    <span className="flex items-center gap-2">
                                        {cat === "movie" ? "Movies" : "TV Shows"}
                                    </span>
                                </Button>
                            ))}
                        </div>

                        {/* input + button */}
                        <div className="flex flex-1 gap-2 items-center">
                            <Input
                                id="query"
                                name="query"
                                value={data.query}
                                onChange={(e) => setData("query", e.target.value)}
                                placeholder={`Search ${data.category === "movie" ? "movies" : "TV shows"}...`}
                                className="w-full"
                            />
                            <Button
                                type="submit"
                                className="rounded-md h-12 px-4"
                                disabled={!data.query.trim()}
                            >
                                <span className="hidden sm:inline">Search</span>
                            </Button>
                        </div>
                    </div>
                </form>

                {/* results */}
                <div className="mt-8">
                    {results?.length > 0 ? (
                        <>
                            <p className="text-white/50 text-sm mb-4">
                                Found {results.length} result{results.length !== 1 ? "s" : ""}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                {results.map((r, index) => {
                                    const title = r.title || r.name;
                                    const date = r.release_date || r.first_air_date;

                                    return (
                                        <Card key={index} item={r} link={r.title ? "movie.show" : "tv.show"} date={date} title={title} />
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-white/30 text-center gap-3">
                            <div className="bg-white/5 rounded-full p-5">
                                <SearchIcon size={40} />
                            </div>
                            <span className="text-lg font-medium">No results found</span>
                            {data.query && (
                                <span className="text-sm">
                                    Try a different search term or category
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default Search;
