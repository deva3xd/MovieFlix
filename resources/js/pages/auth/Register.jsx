import { useForm, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
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
            <div className="flex flex-col justify-center items-center p-6 lg:p-12 rounded-md bg-foreground text-white border border-primary">
                <div className="w-72 lg:w-96">
                    <h1 className="text-4xl irish-grover-bold text-primary text-center">
                        MovieFlix
                    </h1>
                    <h2 className="text-3xl font-bold text-center">Register</h2>
                    <form onSubmit={submit}>
                        <div className="max-w-xs lg:max-w-xl flex flex-col gap-1 my-4">
                            <div className="flex gap-2">
                                <>
                                    <div className="form-control">
                                        <Label htmlFor="first_name">
                                            First Name
                                        </Label>
                                        <Input
                                            type="text"
                                            id="first_name"
                                            name="first_name"
                                            value={data.first_name}
                                            onChange={(e) => setData("first_name", e.target.value)}
                                            className="w-full"
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.first_name} />
                                </>
                                <>
                                    <div className="form-control">
                                        <Label htmlFor="last_name">
                                            Last Name
                                        </Label>
                                        <Input
                                            type="text"
                                            id="last_name"
                                            name="last_name"
                                            value={data.last_name}
                                            onChange={(e) => setData("last_name", e.target.value)}
                                            className="w-full"
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.last_name} />
                                </>
                            </div>
                            <>
                                <div className="form-control">
                                    <Label htmlFor="email">
                                        Email
                                    </Label>
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
                                    <Label htmlFor="password">
                                        Password
                                    </Label>
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
                                    <Label htmlFor="password_confirmation">
                                        Confirm Password
                                    </Label>
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
                            <div className="flex items-center justify-center mt-2">
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
        </GuestLayout>
    );
}
