import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "@/layouts/GuestLayout";
import InputError from "@/components/ui/InputError";
import Input from "@/components/ui/Input";
import SubmitButton from "@/components/ui/buttons/SubmitButton";

export default function Register() {
    const { data, setData, post, errors } = useForm({
        first_name: "",
        last_name: "",
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
            <div className="flex flex-col justify-center items-center p-6 lg:p-12 rounded-md bg-foreground text-white border border-primary">
                <div className="w-72 lg:w-96">
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl irish-grover-regular text-primary">
                            MovieFlix
                        </h1>
                        <h2 className="text-3xl font-bold">Register</h2>
                        <span className="text-sm my-2">
                            Already registered?{" "}
                            <a
                                href={route("login")}
                                className="text-primary hover:underline"
                            >
                                Login
                            </a>
                        </span>
                    </div>
                    <form onSubmit={submit}>
                        <div className="max-w-xs lg:max-w-xl">
                            <div className="flex gap-2">
                                <>
                                    <div className="form-control">
                                        <label htmlFor="first_name" className="label-text text-white">
                                            First Name
                                        </label>
                                        <Input
                                            type="text"
                                            id="first_name"
                                            name="first_name"
                                            value={data.first_name}
                                            onChange={(e) => setData("first_name", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                    <InputError
                                        message={errors.first_name}
                                        className="mt-2"
                                    />
                                </>
                                <>
                                    <div className="form-control">
                                        <label htmlFor="last_name" className="label-text text-white">
                                            Last Name
                                        </label>
                                        <Input
                                            type="text"
                                            id="last_name"
                                            name="last_name"
                                            value={data.last_name}
                                            onChange={(e) => setData("last_name", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                    <InputError
                                        message={errors.last_name}
                                        className="mt-2"
                                    />
                                </>
                            </div>
                            <>
                                <div className="form-control">
                                    <label htmlFor="email" className="label-text text-white">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
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
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                    />
                                </div>
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </>
                            <>
                                <div className="form-control">
                                    <label htmlFor="password_confirmation" className="label-text text-white">
                                        Confirm Password
                                    </label>
                                    <Input
                                        type="password"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData("password_confirmation", e.target.value)}
                                    />
                                </div>
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </>
                            <div className="flex items-center justify-center mt-4">
                                <SubmitButton children="Register" className="w-full" type="submit" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
