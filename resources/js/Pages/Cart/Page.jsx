import { useState } from "react";
import { router, useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import MainLayout from "@/layouts/MainLayout";
import Profile from "@/Images/profile.png";

const Page = ({ auth, carts }) => {
    const [count, setCount] = useState(1);
    const { flash } = usePage().props;
    const { data } = useForm({
        user_id: auth.user.id,
        movie_id: 12,
        price: 20000,
        count: 12,
    });

    const onSubmit = (e) => {
        e.preventDefault();

        router.post("/cart", data);
    };

    if (flash.message) {
        toast.success(flash.message);
    };
    return (
        <MainLayout title='Home' user={auth.user}>
            <div className="min-h-screen bg-white pt-4">
                <div className="px-2 bg-white border-b-2 border-black flex items-center text-black mx-3">
                    <div className='w-1/4 text-xl font-bold py-1 justify-center flex'>Product</div>
                    <div className='w-1/4 text-xl font-bold py-1 justify-center flex'>Unit Price</div>
                    <div className='w-1/4 text-xl font-bold py-1 justify-center flex'>Count</div>
                    <div className='w-1/4 text-xl font-bold py-1 justify-center flex'>Action</div>
                </div>
                <div className="bg-white flex items-center mx-3 my-1 text-black border border-black">
                    <div className='flex w-1/4 items-center text-xl font-bold p-2'>
                        <img src={Profile} className="w-32" />
                        <p className="ms-2">Avatar the legend of ang</p>
                    </div>
                    <div className='w-1/4 text-xl font-bold p-2 flex justify-center'>Rp20.000</div>
                    <div className='w-1/4 text-xl font-bold p-2 flex justify-center'>
                        <div className="flex">
                            <button onClick={() => setCount(Math.max(count - 1, 1))} className="px-2 py-1 border border-black">-</button>
                            <p className="px-4 py-1 border border-black">{count}</p>
                            <button onClick={() => setCount(count + 1)} className="px-2 py-1 border border-black">+</button>
                        </div>
                    </div>
                    <div className='w-1/4 text-xl font-bold p-2 flex justify-center'>
                        <button className="btn btn-error me-1 text-white">Delete</button>
                        <form onSubmit={onSubmit}>
                            <button className="btn btn-success text-white">
                                Checkout
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Page;