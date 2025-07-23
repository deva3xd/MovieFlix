import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
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
                <button className="btn bg-custom-primary hover:bg-opacity-90 text-white">
                    <svg height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="#ffffff"></path> </g></svg>Edit Profile
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
            <button className="btn bg-white hover:bg-gray-200 text-black mt-3">
                <svg height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z" fill="#000000"></path> </g></svg>Save
            </button>
        </>
    );
}
