import { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { get } from "@/api/apiClient";
import MainLayout from "@/layouts/MainLayout";
import DeleteModal from "@/components/DeleteModal";

const Cart = ({ auth, carts, cartCount }) => {
    const imgURL = import.meta.env.VITE_IMGURL;
    const { flash } = usePage().props;
    const [list, setList] = useState([]);
    const { delete: destroy } = useForm();
    const [isModalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const req = carts.map((cart) => get(`/movie/${cart.movie_id}`));
            const res = await Promise.all(req); // wait until everything done
            const data = res.map((res) => res.data);
            setList(data);
        };
        fetchData();
    }, []);

    if (flash.message) {
        toast.success(flash.message);
    }

    const [counts, setCounts] = useState(() =>
        list.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
    );

    const setCount = (id, newCount) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [id]: Math.max(newCount, 1), // ensure the count doesn't go below 1
        }));
    };

    // const openModal = (itemId) => {
    //     setItemToDelete(itemId);
    //     setModalOpen(true);
    // };

    const confirmDelete = () => {
        console.log(itemToDelete);
        if (itemToDelete) {
            destroy(route("cart.destroy", itemToDelete));
            window.location.reload();
            setModalOpen(false);
            setItemToDelete(null);
        }
    };

    return (
        <MainLayout title="Home" user={auth.user}>
            <div className="min-h-screen bg-custom-primary pb-2 px-8 flex gap-1 text-white">
                <div className="w-4/6">
                    <h2 className="py-2 font-bold text-2xl">Shopping Cart</h2>
                    {list.length == 0 ? (
                        <div className="bg-custom-secondary flex items-center justify-center mx-6 py-3 border-t-2 border-custom-secondary">
                            <p className="font-bold text-xl">No Data Available</p>
                        </div>
                    ) : (
                        list.map((item) => (
                            <div className="bg-custom-secondary rounded-sm p-1 mt-1" key={item.id}>
                                <div className="flex">
                                    <img
                                        src={`${imgURL}/w500/${item.poster_path}`}
                                        className="h-32"
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
                                                    className="py-1 hover:underline"
                                                >
                                                    -
                                                </button>
                                                <p className="px-4 py-1">
                                                    {counts[item.id] || 1}
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        setCount(
                                                            item.id,
                                                            (counts[item.id] || 1) + 1
                                                        )
                                                    } // fallback to 1 if undefined
                                                    className="py-1 hover:underline"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex-1 flex flex-col justify-end items-end">
                                        <p class="font-semibold text-lg">Rp. 25.000</p>
                                        <div className="flex gap-1">
                                            <input type="checkbox" className="checkbox checkbox-info bg-custom-primary border-white hover:border-white" /> 
                                            <button class="text-sm text-red-500">
                                                <svg height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="w-2/6">
                    <p className="py-2 font-light text-2xl">{cartCount} items</p>
                    <div className="bg-custom-secondary rounded-sm mt-1 p-2">
                        <p className="font-bold text-lg underline">Order Summary</p>
                        <p className="text-lg">Items : 1</p>
                        <p className="text-lg">Total : Rp. 25.000</p>
                        <button className="bg-white py-1 w-full text-custom-secondary hover:bg-opacity-95 rounded-sm font-semibold">Checkout</button>
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
