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
            <div className="mt-4 w-3/4 sm:w-1/4">
                <form onSubmit={submit}>
                    <div className="text-white text-3xl font-bold text-center">
                        <h1>Register</h1>
                    </div>
                    <div className="mt-4">
                        <label className="input input-bordered flex items-center text-white">
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
                        <label className="input input-bordered flex items-center text-white">
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
                        <label className="input input-bordered flex items-center text-white">
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
                        <label className="input input-bordered flex items-center text-white">
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
                    href={route("login")}
                    className="underline text-sm text-gray-200 hover:text-gray-400 rounded-md"
                >
                    Already registered? Log in
                </a>
            </div>
        </GuestLayout>
    );
}
