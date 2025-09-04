import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import MainLayout from "@/layouts/MainLayout";
import DeleteModal from "@/components/DeleteModal";
import { Trash2 } from "lucide-react";

const Cart = ({ auth, carts, cartCount }) => {
    const imgURL = import.meta.env.VITE_IMGURL;
    const { flash } = usePage().props;
    const { delete: destroy } = useForm();
    const [isModalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [selectId, setSelectId] = useState([]);

    const selectCount = selectId.length;

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

    const openModal = (itemId) => {
        setItemToDelete(itemId);
        setModalOpen(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            destroy(route("cart.destroy", itemToDelete));
            setModalOpen(false);
            setItemToDelete(null);
        }
    };

    const handleCheckboxChange = (event) => {
        const checkedId = event.target.value;
        if (event.target.checked) {
            setSelectId([...selectId, checkedId])
        } else {
            setSelectId(selectId.filter(id => id !== checkedId))
        }
    }

    return (
        <MainLayout title="Home" user={auth.user}>
            <div className="min-h-screen bg-custom-primary pb-2 px-8 flex gap-1 text-white">
                <div className="w-4/6">
                    <h2 className="py-3 font-bold text-2xl">Shopping Cart</h2>
                    {carts.length == 0 ? (
                        <div className="bg-custom-secondary p-2">
                            <p className="font-semibold text-xl text-center">No Data Available</p>
                        </div>
                    ) : (
                        carts.map((item) => (
                            <div className="bg-custom-secondary rounded-sm p-2 mb-1" key={item.id}>
                                <div className="flex">
                                    <img
                                        src={`${imgURL}/w500/${item.poster_path}`}
                                        className="h-32"
                                        alt="Poster Image"
                                    />
                                    <div className="px-2">
                                        <div className="flex flex-col justify-between h-full">
                                            <div>
                                                <p className="font-bold text-lg">{item.title}</p>
                                                <div className="flex">
                                                    {item.genres.map((genre) => <p className="me-2" key={genre.id}>{genre.name}</p>)}
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <button
                                                    onClick={() =>
                                                        setCount(
                                                            item.id,
                                                            (counts[item.id] || 1) - 1
                                                        )
                                                    } // fallback to 1 if undefined
                                                    className="px-2 border border-white"
                                                >
                                                    -
                                                </button>
                                                <p className="px-3 underline">
                                                    {counts[item.id] || 1}
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        setCount(
                                                            item.id,
                                                            (counts[item.id] || 1) + 1
                                                        )
                                                    } // fallback to 1 if undefined
                                                    className="px-2 border border-white"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-end items-end">
                                        <p className="font-semibold text-lg">Rp. 25.000</p>
                                        <div className="flex gap-1">
                                            <input type="checkbox" className="checkbox checkbox-info bg-custom-primary border-white hover:border-white" value={item.id} onChange={(event) => handleCheckboxChange(event)} />
                                            <button onClick={() => openModal(item.id)} className="text-sm text-red-500">
                                                <Trash2 color="#ffffff" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="w-2/6">
                    <p className="py-3 font-light text-2xl">{cartCount} items</p>
                    <div className="bg-custom-secondary rounded-sm p-2">
                        <p className="font-bold text-lg underline">Order Summary</p>
                        <p className="text-lg">Items : {selectCount}</p>
                        <p className="text-lg">Total : Rp. 25.000</p>
                        <button className="bg-white py-1 w-full text-custom-secondary hover:bg-opacity-90 rounded-sm font-semibold">Checkout</button>
                    </div>
                </div>
            </div>
            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </MainLayout>
    );
};

export default Cart;
