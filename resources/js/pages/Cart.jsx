import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { Trash2, Star, Calendar } from "lucide-react";
import { Link } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";
import DeleteModal from "@/components/ui/DeleteModal";

const Cart = ({ carts, cartCount }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // delete modal
    const openModal = (itemId) => {
        setItemToDelete(itemId);
        setModalOpen(true);
    };

    // confirm delete
    const confirmDelete = () => {
        if (itemToDelete) {
            router.delete(route("cart.destroy", itemToDelete), {
                onSuccess: () => toast.success("Item deleted")
            });
            setModalOpen(false);
            setItemToDelete(null);
        }
    };

    return (
        <MainLayout title="Cart">
            <div className="min-h-screen max-w-7xl px-4 mx-auto mt-24">
                <div className="flex justify-between mb-2">
                    <h2 className="text-xl text-white sm:text-3xl font-medium">
                        <span className="text-primary me-2">|</span>Watchlist
                    </h2>
                </div>
                {carts.length == 0 ? (
                    <div className="bg-zinc-900/50 border border-white/20 p-2">
                        <p className="font-semibold text-xl text-center">No Items Available</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {carts.map((item) => (
                            <div className="bg-zinc-900/50 border border-white/20 rounded-md hover:text-primary" key={item.id}>
                                <div className="flex">
                                    <Link href={route("movie.show", { id: item.id })}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                            className="h-40 rounded-s-md"
                                            alt="Poster Image"
                                        />
                                    </Link>
                                    <div className="flex flex-col justify-between w-full p-2">
                                        <div>
                                            <p className="font-bold text-base lg:text-xl">{item.title}</p>
                                            <div className="flex gap-2">
                                                <div className="text-sm text-white my-2 flex items-center gap-1">
                                                    <Star size={18} className="fill-primary text-primary" /> {typeof item.vote_average === "number" ? item.vote_average.toFixed(1) : "N/A"}
                                                </div>
                                                <div className="text-sm text-white my-2 flex items-center gap-1">
                                                    <Calendar size={16} className="text-primary" /> {new Date(item.release_date).getFullYear()}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 hidden sm:flex">{item.overview}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="flex flex-wrap items-center gap-2 text-gray-500 text-sm">
                                                {item.genres.map((genre) => genre.name).join(' · ')}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => openModal(item.id)} className="text-sm text-white hover:text-red-500">
                                                    <Trash2 size={22} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </MainLayout>
    )
}

export default Cart;
