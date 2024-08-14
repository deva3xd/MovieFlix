import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div className="text-white text-3xl font-bold">
                    <h1>Sign in</h1>
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
                        <input type="email" placeholder="Email" id="email" onChange={(e) => setData('email', e.target.value)} required />
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
                        <input type="password" placeholder="Password" id="password" onChange={(e) => setData('password', e.target.value)} required />
                    </label>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-center mt-4">
                    <button className="btn bg-blue-700 hover:bg-blue-800 w-full text-lg text-white" type="submit">Submit</button>
                </div>
                
                <div className="flex justify-end mt-1">
                    <a
                    href={route('register')}
                    className="underline text-sm text-gray-200 hover:text-gray-400 rounded-md"
                    >
                        Don't have an account? Register
                    </a>
                </div>
            </form>
        </GuestLayout>
    );
}
