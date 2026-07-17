import { useState } from 'react';
import { User, LockKeyhole, AlertTriangle, Trash2 } from "lucide-react";
import { Button } from '@/components/ui/Button';
import MainLayout from '@/layouts/MainLayout';
import DeleteUserForm from './partials/DeleteUserForm';
import ProfilePicture from "@/assets/images/profile.png";
import UpdateProfileInformation from './partials/UpdateProfileInformation';
import UpdatePassword from './partials/UpdatePassword';

export default function Profile({ auth }) {
    const [active, setActive] = useState('info');
    const user = auth.user;
    const [isModalOpen, setModalOpen] = useState(false);
    const userImage = user?.image ? `/storage/${user.image}` : ProfilePicture;

    const tabs = [
        { id: 'info', label: 'Profile', icon: User },
        { id: 'password', label: 'Password', icon: LockKeyhole },
    ];

    return (
        <MainLayout title="Profile">
            <div className="mt-24 text-white min-h-screen">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 max-w-4xl mx-auto px-4">
                    <img
                        alt={user?.name}
                        src={userImage}
                        className="w-16 h-16 rounded-full border-2 border-white/20 object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-bold capitalize">{user?.name}</h1>
                        <p className="text-sm text-gray-400">{user?.email}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6 border-b border-zinc-800">
                    <div className="max-w-4xl mx-auto px-4 flex gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActive(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${active === tab.id
                                    ? 'border-primary text-white'
                                    : 'border-transparent text-gray-400 hover:text-gray-200'
                                    }`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4">
                    {/* Content */}
                    <div className="bg-background rounded-md p-6 border border-white/20">
                        {active === 'info' && <UpdateProfileInformation />}
                        {active === 'password' && <UpdatePassword />}
                    </div>

                    {/* Danger zone */}
                    <div className="mt-4 border border-red-900 rounded-md p-6 bg-red-900/10">
                        <div className="flex items-start gap-4">
                            <div className="p-2 rounded-full bg-red-950 text-red-400 shrink-0">
                                <AlertTriangle size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Delete Account</h3>
                                <p className="text-sm text-gray-400 mt-1 mb-4">
                                    Once deleted, all your data including your watchlist will be permanently removed. This action cannot be undone.
                                </p>
                                <Button
                                    onClick={() => setModalOpen(true)}
                                    size="sm"
                                    className="rounded-md"
                                >
                                    <Trash2 size={14} />
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteUserForm isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </MainLayout>
    );
}
