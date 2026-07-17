import { toast } from 'sonner';
import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import InputError from '@/components/ui/InputError';
import Label from '@/components/ui/Label';
import Input from "@/components/ui/Input";

export default function UpdatePassword() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const [edit, setEdit] = useState(false);

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                toast.success("Password Updated");
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    const cancelEdit = () => {
        setEdit(false);
        reset();
    };

    const fieldInput = [
        { name: "Change Password", label: "change_password", placeholder: "current password", type: "password", value: data.current_password, errors: errors.current_password },
        { name: "New Password", label: "new_password", placeholder: "new password", type: "password", value: data.password, errors: errors.password },
        { name: "Confirm Password", label: "password_confirmation", placeholder: "confirm password", type: "password", value: data.password_confirmation, errors: errors.password_confirmation }
    ];

    return (
        <>
            <div className='flex items-center justify-between mb-6'>
                <h3 className='font-bold text-xl uppercase'>Change Password</h3>
                <Button
                    size="sm"
                    className="px-0rounded-full"
                    variant={edit ? 'primary' : 'secondary'}
                    onClick={() => setEdit((prev) => !prev)}
                >
                    {edit ? <X size={14} /> : <Pencil size={14} />}
                </Button>
            </div>
            <form onSubmit={updatePassword} >
                {fieldInput.map((field, index) => (
                    <fieldset key={index} className="fieldset">
                        <Label htmlFor={field.label}>{field.name}</Label>
                        <Input
                            type={field.type}
                            id={field.label}
                            name={field.label}
                            value={field.value}
                            className="w-full disabled:bg-zinc-900"
                            onChange={(e) => setData(field.label, e.target.value)}
                            required
                            placeholder={field.placeholder}
                            disabled={!edit}
                        />
                        <InputError message={field.errors} className="mt-1" />
                    </fieldset>
                ))}

                <div className="flex gap-2 mt-6">
                    <Button variant="secondary" className="size-11 rounded-md py-0 px-12 text-sm" disabled={!edit || processing}>
                        Save
                    </Button>
                    <Button variant="outline" className="size-11 rounded-md py-0 px-12 text-sm" disabled={!edit} onClick={cancelEdit}>
                        Cancel
                    </Button>
                </div>
            </form>
        </>
    );
}
