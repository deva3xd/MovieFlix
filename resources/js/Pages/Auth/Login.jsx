import GuestLayout from "@/layouts/GuestLayout";
import InputError from "@/components/InputError";
import { Head, useForm } from "@inertiajs/react";

export default function Login({ status }) {
    const { data, setData, post, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="flex flex-row h-screen w-screen">
                <div className="w-96 bg-custom-primary"></div>
                <div className="flex flex-col justify-center items-center w-full px-64 bg-white text-black">
                    <div className="w-[28rem]">
                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600">
                                {status}
                            </div>
                        )}
                        <h1 className="font-bold text-4xl underline">Login</h1>
                        <form onSubmit={submit}>
                            <div className="mt-4">
                                <label className="input border-0 border-b border-b-gray-400 flex items-center text-black bg-transparent rounded-none px-0 focus-within:shadow-none focus-within:outline-none focus-within:border-b-black">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="w-full"
                                        required
                                    />
                                </label>
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <label className="input border-0 border-b border-b-gray-400 flex items-center text-black bg-transparent rounded-none px-0 focus-within:shadow-none focus-within:outline-none focus-within:border-b-black">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        id="password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="w-full"
                                        required
                                    />
                                </label>
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>
                            <a href="" className="flex justify-end mt-2 text-sm text-gray-950 hover:underline">Forgot your password?</a>
                            <div className="flex items-center justify-center mt-2">
                                <button
                                    className="btn bg-black hover:bg-gray-950 w-full text-lg text-white"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="mt-4">
                            <p className="text-sm text-gray-950 rounded-md">
                                Don't have an account?
                                <a href={route("register")} className="hover:underline ms-1">
                                    Register
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
