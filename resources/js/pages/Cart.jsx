import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { Trash2, Star, Calendar, Clock } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import DeleteModal from "@/components/ui/DeleteModal";

const Cart = ({ carts, cartCount }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [selected, setSelected] = useState([]);

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

    const handleChange = (id, checked) => {
        if (checked) {
            setSelected((prev) => [...prev, id]);
        } else {
            setSelected((prev) => prev.filter((item) => item !== id));
        }
    }

    return (
        <MainLayout title="Home">
            <div className="min-h-screen px-4 flex flex-col-reverse lg:flex-row gap-1 text-white max-w-screen-xl mx-auto mb-4">
                <div className="w-full">
                    <div className="flex justify-between mb-1">
                        <span className="py-2 font-light text-xl lg:text-2xl">Total Items : {cartCount}</span>
                        <button className="w-36 text-background bg-primary border border-primary hover:bg-primary/90 text-lg h-12 rounded-md px-4">Checkout ({selected.length})</button>
                    </div>
                    {carts.length == 0 ? (
                        <div className="bg-foreground p-2">
                            <p className="font-semibold text-xl text-center">No Items Available</p>
                        </div>
                    ) : (
                        carts.map((item) => (
                            <div className="bg-foreground border border-primary/25 rounded-md p-2 mb-1" key={item.id}>
                                <div className="flex">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                        className="h-40 rounded-md"
                                        alt="Poster Image"
                                    />
                                    <div className="pl-2 w-full">
                                        <div className="flex flex-col justify-between h-full">
                                            <div>
                                                <p className="font-bold text-base lg:text-xl">{item.title}</p>
                                                <div className="flex gap-2">
                                                    <div className="text-sm text-white my-2 flex items-center gap-1"><Star size={16} color={"yellow"} fill={"yellow"} /> {typeof item.vote_average === "number" ? item.vote_average.toFixed(1) : "N/A"}</div>
                                                    <div className="text-sm text-white my-2 flex items-center gap-1"><Calendar size={16} color={"red"} /> {new Date(item.release_date).getFullYear()}</div>
                                                    <div className="text-sm text-white my-2 flex items-center gap-1"><Clock size={16} color={"white"} /> {item.runtime}</div>
                                                </div>
                                                <p className="text-sm text-gray-500 hidden sm:flex">{item.overview}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="flex flex-wrap items-center gap-2 text-gray-500 text-sm">
                                                    {item.genres.map((genre) => <p key={genre.id}>{genre.name} | </p>)}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <input type="checkbox" onChange={(e) => handleChange(item.id, e.target.checked)} className="checkbox checkbox-sm rounded-full border-white" />
                                                    <button onClick={() => openModal(item.id)} className="text-sm text-white hover:text-red-500">
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
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
