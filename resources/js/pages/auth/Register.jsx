import { useForm, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import GuestLayout from "@/layouts/GuestLayout";
import InputError from "@/components/ui/InputError";
import Input from "@/components/ui/Input";

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
        <GuestLayout title="Register">
            <div className="flex gap-8">
                <div className="w-3/5 flex flex-col justify-center">
                    <h1 className="text-5xl irish-grover-bold text-primary">MovieFlix</h1>
                    <h2 className="text-7xl my-4 font-bold">Register now to get the benefits.</h2>
                    <p className="text-xl font-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam sit quod aspernatur dolorem aut sunt. Laudantium repellat ipsa asperiores temporibus!
                    </p>
                </div>
                <div className="w-2/5 flex flex-col justify-center items-center p-8 rounded-md text-white border border-primary bg-background">
                    <div className="w-full">
                        <p className="text-2xl text-center">Create new account</p>
                        <form onSubmit={submit}>
                            <div className="max-w-xs lg:max-w-xl flex flex-col gap-4 my-6">
                                <>
                                    <div className="form-control">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.name} />
                                </>
                                <>
                                    <div className="form-control">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
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
                                            name="password"
                                            value={data.password}
                                            onChange={(e) => setData("password", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.password} />
                                </>
                                <>
                                    <div className="form-control">
                                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                                        <Input
                                            type="password"
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData("password_confirmation", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.password_confirmation} />
                                </>
                                <div className="flex items-center justify-center">
                                    <Button className="rounded-md w-full">Register</Button>
                                </div>
                            </div>
                        </form>
                        <div className="text-sm flex justify-end">
                            Already have an account?
                            <Link href={route("login")} className="text-primary hover:underline ps-2">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
