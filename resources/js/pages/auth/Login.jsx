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
            <div className="flex gap-8">
                <div className="w-3/5 flex flex-col justify-center">
                    <h1 className="text-5xl irish-grover-bold text-primary">MovieFlix</h1>
                    <h2 className="text-7xl my-4 font-bold">Your next favorite movie is waiting.</h2>
                    <p className="text-xl font-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam sit quod aspernatur dolorem aut sunt. Laudantium repellat ipsa asperiores temporibus!
                    </p>
                </div>
                <div className="w-2/5 flex flex-col justify-center items-center p-8 rounded-md bg-foreground text-white border border-primary bg-background">
                    <div className="w-full">
                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600">
                                {status}
                            </div>
                        )}
                        <p className="text-2xl text-center">Login to your account</p>
                        <form onSubmit={submit}>
                            <div className="max-w-xs lg:max-w-xl flex flex-col gap-4 my-6">
                                <>
                                    <div className="form-control">
                                        <Label htmlFor="email">Email</Label>
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
                                        <Label htmlFor="password">Password</Label>
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
                                <div className="flex items-center justify-center">
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
            </div>
        </GuestLayout>
    );
}
