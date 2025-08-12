import GuestLayout from "@/layouts/GuestLayout";
import InputError from "@/components/InputError";
import { Head, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="flex flex-row h-screen w-screen">
                <div className="w-96 bg-custom-primary"></div>
                <div className="flex flex-col justify-center items-center w-full px-64 bg-white text-black">
                    <div className="w-[28rem]">
                        <h1 className="font-bold text-4xl underline">Register</h1>
                        <form onSubmit={submit}>
                            <div className="mt-4">
                                <label className="input border-0 border-b border-b-gray-400 flex items-center text-black bg-transparent rounded-none px-0 focus-within:shadow-none focus-within:outline-none focus-within:border-b-black">
                                    <input
                                        type="text"
                                        className="grow w-full"
                                        placeholder="Name"
                                        id="name"
                                        name="name"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />
                                </label>
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <label className="input border-0 border-b border-b-gray-400 flex items-center text-black bg-transparent rounded-none px-0 focus-within:shadow-none focus-within:outline-none focus-within:border-b-black">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        name="email"
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
                                        className="grow w-full"
                                        placeholder="Password"
                                        id="password"
                                        name="password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />
                                </label>
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <label className="input border-0 border-b border-b-gray-400 flex items-center text-black bg-transparent rounded-none px-0 focus-within:shadow-none focus-within:outline-none focus-within:border-b-black">
                                    <input
                                        type="password"
                                        className="grow w-full"
                                        placeholder="Confirm Password"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </label>
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-center mt-4">
                                <button
                                    className="btn bg-black hover:bg-gray-950 w-full text-lg text-white"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        <div className="mt-4">
                            <p className="text-sm text-gray-950 rounded-md">
                                Already registered?
                                <a href={route("login")} className="hover:underline ms-1">
                                    Login
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
