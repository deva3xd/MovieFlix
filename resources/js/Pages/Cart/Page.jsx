import MainLayout from "@/Layouts/MainLayout";
import { useState } from "react";
import Profile from "@/images/profile.png";

const Page = ({ auth }) => {
    const user = auth ? auth.user : null;

    const [count, setCount] = useState(0);
    function inc() {
        setCount(count + 1);
    }

    function dec() {
        setCount(count - 1);
    }

    return (
        <MainLayout title='Home' user={user}>
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
                            <button onClick={() => dec()} className="px-2 py-1 border border-black">-</button>
                            <p className="px-4 py-1 border border-black">{count}</p>
                            <button onClick={() => inc()} className="px-2 py-1 border border-black">+</button>
                        </div>
                    </div>
                    <div className='w-1/4 text-xl font-bold p-2 flex justify-center'>
                        <button class="btn btn-error me-2 text-white">Delete</button>
                        <button class="btn btn-success text-white">Checkout</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Page;