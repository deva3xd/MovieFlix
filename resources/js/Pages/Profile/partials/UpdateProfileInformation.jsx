import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Save, Pencil, X } from "lucide-react";
import { useState } from 'react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const [edit, setEdit] = useState(false);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        // <section className={className}>
        //     <header>
        //         <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

        //         <p className="mt-1 text-sm text-gray-600">
        //             Update your account's profile information and email address.
        //         </p>
        //     </header>

        //     <form onSubmit={submit} className="mt-6 space-y-6">
        //         <div>
        //             <InputLabel htmlFor="name" value="Name" />

        //             <TextInput
        //                 id="name"
        //                 className="mt-1 block w-full"
        //                 value={data.name}
        //                 onChange={(e) => setData('name', e.target.value)}
        //                 required
        //                 isFocused
        //                 autoComplete="name"
        //             />

        //             <InputError className="mt-2" message={errors.name} />
        //         </div>

        //         <div>
        //             <InputLabel htmlFor="email" value="Email" />

        //             <TextInput
        //                 id="email"
        //                 type="email"
        //                 className="mt-1 block w-full"
        //                 value={data.email}
        //                 onChange={(e) => setData('email', e.target.value)}
        //                 required
        //                 autoComplete="username"
        //             />

        //             <InputError className="mt-2" message={errors.email} />
        //         </div>

        //         {mustVerifyEmail && user.email_verified_at === null && (
        //             <div>
        //                 <p className="text-sm mt-2 text-gray-800">
        //                     Your email address is unverified.
        //                     <Link
        //                         href={route('verification.send')}
        //                         method="post"
        //                         as="button"
        //                         className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //                     >
        //                         Click here to re-send the verification email.
        //                     </Link>
        //                 </p>

        //                 {status === 'verification-link-sent' && (
        //                     <div className="mt-2 font-medium text-sm text-green-600">
        //                         A new verification link has been sent to your email address.
        //                     </div>
        //                 )}
        //             </div>
        //         )}

        //         <div className="flex items-center gap-4">
        //             <PrimaryButton disabled={processing}>Save</PrimaryButton>

        //             <Transition
        //                 show={recentlySuccessful}
        //                 enter="transition ease-in-out"
        //                 enterFrom="opacity-0"
        //                 leave="transition ease-in-out"
        //                 leaveTo="opacity-0"
        //             >
        //                 <p className="text-sm text-gray-600">Saved.</p>
        //             </Transition>
        //         </div>
        //     </form>
        // </section>
        <>
            <div className='flex justify-between'>
                <h3 className='font-bold text-2xl'>Profile Information</h3>
                <button className="btn bg-custom-primary hover:bg-opacity-90 text-white" onClick={() => setEdit(edit => !edit)}>
                    {!edit ? (
                        <>
                            <Pencil size={15} />
                        </>
                    ) : (
                        <>
                            <X size={15} />
                        </>
                    )}
                </button>
            </div>
            <div className='flex gap-2'>
                <div className='w-1/2'>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <input type="text" className="input w-full focus:outline-none" placeholder="first name" />
                    </fieldset>
                </div>
                <div className='w-1/2'>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input type="text" className="input w-full focus:outline-none" placeholder="last name" />
                    </fieldset>
                </div>
            </div>
            <fieldset className="fieldset mt-3">
                <legend className="fieldset-legend">Email Address</legend>
                <input type="text" className="input w-full focus:outline-none" placeholder="email address" />
            </fieldset>
            <fieldset className="fieldset mt-3">
                <legend className="fieldset-legend">Date</legend>
                <input type="date" className="input focus:outline-none" />
            </fieldset>
            {edit && (
                <button className="btn bg-white hover:bg-gray-200 text-black mt-3">
                    <Save color='#000000' size={18} />
                    Save
                </button>
            )}
        </>
    );
}
