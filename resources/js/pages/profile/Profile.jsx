import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import DeleteUserForm from './partials/DeleteUser';
import ProfilePicture from "@/assets/images/profile.png";
import UpdateProfileInformation from './partials/UpdateProfileInformation';
import UpdatePassword from './partials/UpdatePassword';
import { Toaster } from "sonner";

export default function Profile({ auth }) {
    const [active, setActive] = useState(true);
    const userProfile = auth ? auth.user : null;

    return (
        <MainLayout title="Profile" user={userProfile}>
            <Toaster />
            <div className="max-w-screen-xl mx-auto flex gap-4 text-white min-h-screen px-4">
                <div className="w-2/6 bg-foreground rounded-md h-[13rem] p-4">
                    <div className='flex items-center gap-2'>
                        <img
                            alt="Profile Picture"
                            src={ProfilePicture}
                            className='w-14 rounded-full'
                        />
                        <div className='w-1/2'>
                            <p className='font-semibold text-lg capitalize'>Hello, {auth.user.first_name}</p>
                            <p className='font-light text-sm'>{auth.user.email}</p>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <button onClick={() => setActive(true)} className={`text-base rounded-sm px-2 py-1 text-start mt-4 hover:bg-white hover:bg-opacity-5 ${active && 'bg-primary pointer-events-none text-black'}`}>Profile Information</button>
                        <button onClick={() => setActive(false)} className={`text-base rounded-sm px-2 py-1 text-start hover:bg-white hover:bg-opacity-5  ${!active && 'bg-primary pointer-events-none text-black'}`}>Change Password</button>
                        <DeleteUserForm />
                    </div>
                </div>
                <div className="w-4/6 bg-foreground rounded-md h-1/2 p-4">
                    {active ? <UpdateProfileInformation /> : <UpdatePassword />}
                </div>
            </div>
        </MainLayout>
    );
}
