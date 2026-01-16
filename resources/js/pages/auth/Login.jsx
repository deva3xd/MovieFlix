import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "@/layouts/GuestLayout";
import InputError from "@/components/ui/InputError";
import Input from "@/components/ui/Input";
import SubmitButton from "@/components/ui/buttons/SubmitButton";

export default function Login({ status }) {
    const { data, setData, post, errors } = useForm({
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="flex flex-col justify-center items-center p-6 lg:p-12 rounded-md bg-foreground text-white border border-primary">
                <div className="w-72 lg:w-96">
                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl irish-grover-regular text-primary">
                            MovieFlix
                        </h1>
                        <h2 className="text-3xl font-bold">Login</h2>
                        <span className="text-sm my-2">
                            Don't have an account?{" "}
                            <a
                                href={route("register")}
                                className="text-primary hover:underline"
                            >
                                Register
                            </a>
                        </span>
                    </div>
                    <form onSubmit={submit}>
                        <div className="max-w-xs lg:max-w-xl">
                            <>
                                <div className="form-control">
                                    <label htmlFor="email" className="label-text text-white">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        required
                                    />
                                </div>
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </>
                            <>
                                <div className="form-control">
                                    <label htmlFor="password" className="label-text text-white">
                                        Password
                                    </label>
                                    <Input
                                        type="password"
                                        id="password"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        required
                                    />
                                </div>
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </>
                            <div className="flex items-center justify-center mt-4">
                                <SubmitButton children="Login" className="w-full" type="submit" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
