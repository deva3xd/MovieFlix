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

            <div className="mt-4 w-3/4 sm:w-1/4">
                <div className="text-white text-3xl font-bold text-center">
                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}
                    <h1>Log in</h1>
                </div>
                <form onSubmit={submit}>
                    <div className="mt-4">
                        <label className="input input-bordered flex items-center text-white">
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
                        <label className="input input-bordered flex items-center text-white">
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
                    <a href="" className="flex justify-end mt-4 text-sm">Forgot your password?</a>
                    <div className="flex items-center justify-center mt-4">
                        <button
                            className="btn bg-white hover:bg-gray-200 w-full text-lg text-black"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className="text-center mb-4">
                <a
                    href={route("register")}
                    className="underline text-sm text-gray-200 hover:text-gray-400 rounded-md"
                >
                    Don't have an account? Register
                </a>
            </div>
        </GuestLayout>
    );
}
