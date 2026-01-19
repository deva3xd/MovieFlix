import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import MainLayout from "@/layouts/MainLayout";
import DeleteModal from "@/components/ui/DeleteModal";
import { Trash2 } from "lucide-react";

const Cart = ({ carts, cartCount }) => {
    const { flash } = usePage().props;
    const { delete: destroy } = useForm();
    const [isModalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [selectId, setSelectId] = useState([]);

    // show toast
    if (flash.message) {
        toast.success(flash.message);
    }

    const [counts, setCounts] = useState(() =>
        carts.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
    );

    const setCount = (id, newCount) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [id]: Math.max(newCount, 1), // ensure the count doesn't go below 1
        }));
    };

    // delete modal
    const openModal = (itemId) => {
        setItemToDelete(itemId);
        setModalOpen(true);
    };

    // confirm delete
    const confirmDelete = () => {
        if (itemToDelete) {
            destroy(route("cart.destroy", itemToDelete));
            setModalOpen(false);
            setItemToDelete(null);
        }
    };

    const handleCheckboxChange = (e) => {
        const checkedId = e.target.value;
        if (e.target.checked) {
            setSelectId([...selectId, checkedId])
        } else {
            setSelectId(selectId.filter(id => id !== checkedId))
        }
    };

    // summary section
    const getSummary = () => {
        let totalItems = 0
        let totalPrice = 0

        selectId.forEach((id) => {
            const qty = counts[id] || 1
            const cartItem = carts.find((item) => item.id == id)
            const price = Number(cartItem?.price) || 25000

            totalItems += qty
            totalPrice += qty * price
        })

        return { totalItems, totalPrice }
    };

    const { totalItems, totalPrice } = getSummary();

    return (
        <MainLayout title="Home">
            <div className="min-h-screen px-4 flex flex-col-reverse lg:flex-row gap-1 text-white max-w-screen-xl mx-auto mb-4">
                <div className="w-full lg:w-4/6">
                    <h2 className="py-2 font-bold text-xl lg:text-2xl">Items</h2>
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
                                                <div className="flex flex-wrap gap-2">
                                                    {item.genres.map((genre) => <p key={genre.id} className="text-gray-500 text-sm">{genre.name}</p>)}
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="flex items-center text-sm lg:text-lg">
                                                    <button
                                                        onClick={() =>
                                                            setCount(item.id, Math.max((counts[item.id] || 1) - 1, 1))
                                                        } // fallback to 1 if undefined
                                                    >
                                                        -
                                                    </button>
                                                    <p className="px-4 underline">
                                                        {counts[item.id]}
                                                    </p>
                                                    <button
                                                        onClick={() =>
                                                            setCount(item.id, Math.min((counts[item.id] || 1) + 1, 5))
                                                        } // fallback to 1 if undefined
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-primary text-sm lg:text-lg">Rp{((counts[item.id] || 1) * (Number(item.price) || 25000)).toLocaleString("id-ID")}</p>
                                                    <input type="checkbox" className="checkbox bg-background border-white" value={item.id} onChange={(e) => handleCheckboxChange(e)} />
                                                    <button onClick={() => openModal(item.id)} className="text-sm text-white hover:text-red-500">
                                                        <Trash2 />
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
                <div className="w-full lg:w-2/6">
                    <p className="py-2 font-light text-xl lg:text-2xl">Total: {cartCount}</p>
                    <div className="bg-foreground border border-primary/25 rounded-md p-2 text-sm lg:text-lg flex flex-col gap-2">
                        <p>Item : {totalItems}</p>
                        <p>Price : Rp{totalPrice.toLocaleString("id-ID")}</p>
                        <button className="bg-white hover:bg-white/90 py-1 w-full text-foreground rounded-sm font-semibold disabled:opacity-50" disabled>Checkout</button>
                    </div>
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
