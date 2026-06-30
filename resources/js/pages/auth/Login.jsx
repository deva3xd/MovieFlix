import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import GuestLayout from "@/layouts/GuestLayout";
import InputError from "@/components/ui/InputError";
import Input from "@/components/ui/Input";

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
        <GuestLayout title="Login">
            <div className="flex flex-col justify-center items-center p-6 lg:p-12 rounded-md bg-foreground text-white border border-primary">
                <div className="w-72 lg:w-96">
                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}
                    <h1 className="text-4xl irish-grover-bold text-primary text-center">
                        MovieFlix
                    </h1>
                    <h2 className="text-3xl font-bold text-center">Login</h2>
                    <form onSubmit={submit}>
                        <div className="max-w-xs lg:max-w-xl flex flex-col gap-1 my-4">
                            <>
                                <div className="form-control">
                                    <Label htmlFor="email">
                                        Email
                                    </Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        required
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </>
                            <>
                                <div className="form-control">
                                    <Label htmlFor="password">
                                        Password
                                    </Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        required
                                    />
                                </div>
                                <InputError message={errors.password} />
                            </>
                            <div className="flex items-center justify-center mt-2">
                                <Button className="rounded-md w-full">Login</Button>
                            </div>
                        </div>
                    </form>
                    <div className="text-sm flex justify-end">
                        Don't have an account?
                        <Link href={route("register")} className="text-primary hover:underline ps-2">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
