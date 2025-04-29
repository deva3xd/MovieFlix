import { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { get } from "@/api/apiClient";
import MainLayout from "@/layouts/MainLayout";
import DeleteModal from "@/components/DeleteModal";

const Page = ({ auth, carts }) => {
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

    const openModal = (itemId) => {
        setItemToDelete(itemId);
        setModalOpen(true);
    };

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
            <div className="min-h-screen bg-custom-secondary pb-2">
                <div className="bg-white flex items-center justify-between px-6 py-6">
                    <div className="w-1/2">
                        <h2 className="font-bold text-3xl text-black">
                            Shopping Cart
                        </h2>
                    </div>
                    <div className="w-1/2">
                        <div className="form-control flex flex-row justify-end">
                            <input
                                type="text"
                                placeholder="Search Product"
                                className="bg-white text-black input input-bordered focus:border-black border border-black w-1/2"
                            />
                            <button className="btn ms-1">Search</button>
                        </div>
                    </div>
                </div>
                <div className="bg-white flex items-center text-black mx-6 mt-2">
                    <div className="w-1/4 text-2xl font-bold py-1 flex justify-center">
                        Product
                    </div>
                    <div className="w-1/4 text-2xl font-bold py-1 flex justify-center">
                        Unit Price
                    </div>
                    <div className="w-1/4 text-2xl font-bold py-1 flex justify-center">
                        Count
                    </div>
                    <div className="w-1/4 text-2xl font-bold py-1 flex justify-center">
                        Action
                    </div>
                </div>
                {list.length == 0 ? (
                    <div className="bg-white flex items-center justify-center mx-6 py-3 border-t-2 border-custom-secondary text-black">
                        <p className="font-bold text-xl">No Data Available</p>
                    </div>
                ) : (
                    list.map((item) => (
                        <div
                            className="bg-white flex items-center mx-6 border-t-2 border-custom-secondary text-black"
                            key={item.id}
                        >
                            <div className="flex w-1/4 items-center text-xl font-bold p-2">
                                <img
                                    src={`${imgURL}/w500/${item.poster_path}`}
                                    className="w-32"
                                />
                                <p className="ms-2">{item.title}</p>
                            </div>
                            <div className="w-1/4 text-xl font-bold p-2 flex justify-center">
                                Rp20.000
                            </div>
                            <div className="w-1/4 text-xl font-bold p-2 flex justify-center">
                                <div className="flex">
                                    <button
                                        onClick={() =>
                                            setCount(
                                                item.id,
                                                (counts[item.id] || 1) - 1
                                            )
                                        } // fallback to 1 if undefined
                                        className="px-2 py-1 border border-black"
                                    >
                                        -
                                    </button>
                                    <p className="px-4 py-1 border border-black">
                                        {counts[item.id] || 1}
                                    </p>
                                    <button
                                        onClick={() =>
                                            setCount(
                                                item.id,
                                                (counts[item.id] || 1) + 1
                                            )
                                        } // fallback to 1 if undefined
                                        className="px-2 py-1 border border-black"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            {/* <div className="w-1/4 text-xl font-bold p-2 flex justify-center">
                                <button
                                    className="btn btn-error me-1 text-white"
                                    onClick={() => openModal(item.id)}
                                >
                                    Delete
                                </button>
                                <form
                                    onSubmit={(e) => onSubmit(e, item.id)}
                                ></form>
                                <button
                                    className="btn btn-success text-white"
                                    onClick={onSubmit}
                                >
                                    Checkout
                                </button>
                            </div> */}
                        </div>
                    ))
                )}
            </div>
            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </MainLayout>
    );
};

export default Page;
