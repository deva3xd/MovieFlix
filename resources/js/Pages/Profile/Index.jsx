import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import DeleteUserForm from './partials/DeleteUser';
import Profile from "@/assets/images/profile.png";
import UpdateProfileInformation from './partials/UpdateProfileInformation';
import UpdatePassword from './partials/UpdatePassword';
import { Toaster } from "sonner";

export default function Index({ auth }) {
    const [active, setActive] = useState(true);
    const userProfile = auth ? auth.user : null;

    return (
        <MainLayout title="Profile" user={userProfile}>
            <Toaster />
            <div className="px-28 py-8 flex gap-2 text-white bg-custom-primary min-h-screen">
                <div className="w-2/6 bg-custom-secondary rounded-md p-4 h-52">
                    <div className='flex items-center gap-2'>
                        <img
                            alt="Tailwind CSS Navbar component"
                            src={Profile}
                            className='w-14 rounded-full'
                        />
                        <div className='w-1/2'>
                            <p className='font-semibold text-lg'>test</p>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <button onClick={() => setActive(true)} className={`text-base rounded-sm px-2 py-1 text-start mt-4 hover:bg-white hover:bg-opacity-5 ${active && 'bg-white bg-opacity-5'}`}>Profile Information</button>
                        <button onClick={() => setActive(false)} className={`text-base rounded-sm px-2 py-1 text-start hover:bg-white hover:bg-opacity-5  ${!active && 'bg-white bg-opacity-5'}`}>Change Password</button>
                        <div className='text-base rounded-sm px-2 py-1 text-start hover:bg-red-700 hover:bg-opacity-95'><DeleteUserForm /></div>
                    </div>
                </div>
                <div className="w-4/6 bg-custom-secondary rounded-md p-4 h-1/2">
                    {active ? <UpdateProfileInformation /> : <UpdatePassword />}
                </div>
            </div>
        </MainLayout>
    );
}
