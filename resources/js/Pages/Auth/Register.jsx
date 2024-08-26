import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div className="text-white text-3xl font-bold">
                    <h1>Register</h1>
                </div>
                <div className="mt-4">
                    <label className="input input-bordered flex items-center gap-2 bg-white text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="dark"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input type="text" className="grow" placeholder="Name" id="name" name="name" onChange={(e) => setData('name', e.target.value)} required />
                    </label>
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label className="input input-bordered flex items-center gap-2 bg-white text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="dark"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="email" placeholder="Email" id="email" name="email" onChange={(e) => setData('email', e.target.value)} required />
                    </label>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label className="input input-bordered flex items-center gap-2 bg-white text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="dark"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input type="password" className="grow" placeholder="Password" id="password" name="password" onChange={(e) => setData('password', e.target.value)} required />
                    </label>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label className="input input-bordered flex items-center gap-2 bg-white text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="dark"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input type="password" className="grow" placeholder="Confirm Password" id="password_confirmation" name="password_confirmation" onChange={(e) => setData('password_confirmation', e.target.value)} required />
                    </label>
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>
                
                <div className="flex items-center justify-center mt-4">
                    <button className="btn bg-blue-700 hover:bg-blue-800 w-full text-lg text-white" type="submit">Submit</button>
                </div>

                <div className="flex items-center justify-end mt-1">
                    <a
                        href={route('login')}
                        className="underline text-sm text-gray-200 hover:text-gray-400 rounded-md"
                    >
                        Already registered? Login
                    </a>
                </div>
            </form>
        </GuestLayout>
    );
}
