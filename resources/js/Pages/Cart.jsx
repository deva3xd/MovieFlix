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
            <div className="min-h-screen bg-white pb-2 px-8 flex gap-1 text-black">
                <div className="w-4/6">
                    <h2 className="py-2 font-bold text-2xl">Shopping Cart</h2>
                    {list.length == 0 ? (
                        <div className="bg-white flex items-center justify-center mx-6 py-3 border-t-2 border-custom-secondary text-black">
                            <p className="font-bold text-xl">No Data Available</p>
                        </div>
                    ) : (
                        list.map((item) => (
                            <div className="border border-black rounded-sm p-1 mt-1" key={item.id}>
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
                                            <input type="checkbox" className="checkbox border border-black" />
                                            <button class="text-sm text-red-500">
                                                <svg height="20px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>trash</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-261.000000, -205.000000)" fill="#000000"> <path d="M268,220 C268,219.448 268.448,219 269,219 C269.552,219 270,219.448 270,220 L270,232 C270,232.553 269.552,233 269,233 C268.448,233 268,232.553 268,232 L268,220 L268,220 Z M273,220 C273,219.448 273.448,219 274,219 C274.552,219 275,219.448 275,220 L275,232 C275,232.553 274.552,233 274,233 C273.448,233 273,232.553 273,232 L273,220 L273,220 Z M278,220 C278,219.448 278.448,219 279,219 C279.552,219 280,219.448 280,220 L280,232 C280,232.553 279.552,233 279,233 C278.448,233 278,232.553 278,232 L278,220 L278,220 Z M263,233 C263,235.209 264.791,237 267,237 L281,237 C283.209,237 285,235.209 285,233 L285,217 L263,217 L263,233 L263,233 Z M277,209 L271,209 L271,208 C271,207.447 271.448,207 272,207 L276,207 C276.552,207 277,207.447 277,208 L277,209 L277,209 Z M285,209 L279,209 L279,207 C279,205.896 278.104,205 277,205 L271,205 C269.896,205 269,205.896 269,207 L269,209 L263,209 C261.896,209 261,209.896 261,211 L261,213 C261,214.104 261.895,214.999 262.999,215 L285.002,215 C286.105,214.999 287,214.104 287,213 L287,211 C287,209.896 286.104,209 285,209 L285,209 Z" id="trash" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
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
                    <div className="border border-black rounded-sm mt-1 p-1">
                        <p className="font-bold text-lg underline">Order Summary</p>
                        <p className="text-lg">Items : 1</p>
                        <p className="text-lg">Total : Rp. 25.000</p>
                        <button className="bg-custom-primary py-1 w-full text-white hover:bg-opacity-95 rounded-sm">Checkout</button>
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
