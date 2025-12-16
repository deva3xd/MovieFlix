import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Save, Pencil, X } from "lucide-react";
import { toast } from 'sonner';
import InputError from '@/components/ui/InputError';
import Input from "@/components/ui/Input";
import SubmitButton from "@/components/ui/buttons/SubmitButton";

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

    return (
        <>
            <div className='flex justify-between'>
                <h3 className='font-bold text-2xl'>Change Password</h3>
                <button className={`btn btn-sm border-none ${edit ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white hover:bg-white/90 text-black'} `} onClick={() => setEdit(edit => !edit)}>
                    {!edit ? <Pencil size={14} /> : <X size={14} />}
                </button>
            </div>
            <form onSubmit={updatePassword} >
                <fieldset className="fieldset">
                    <legend className="fieldset-legend" htmlFor="current_password">Current Password</legend>
                    <Input
                        type="password"
                        id="current_password"
                        name="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        className="w-full disabled:text-gray-500 disabled:bg-black/25 disabled:border-none"
                        onChange={(e) => setData('current_password', e.target.value)}
                        required
                        disabled={!edit}
                    />
                    <InputError message={errors.current_password} className="mt-1" />
                </fieldset>
                <fieldset className="fieldset mt-3">
                    <legend className="fieldset-legend" htmlFor="password">New Password</legend>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        ref={passwordInput}
                        value={data.password}
                        className="w-full disabled:text-gray-500 disabled:bg-black/25 disabled:border-none"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        disabled={!edit}
                    />
                    <InputError message={errors.password} className="mt-1" />
                    <p className="mt-1 text-sm text-gray-500">
                        Ensure your account is using a long, random password to stay secure.
                    </p>
                </fieldset>
                <fieldset className="fieldset mt-3">
                    <legend className="fieldset-legend" htmlFor="password_confirmation">Confirm Password</legend>
                    <Input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="w-full disabled:text-gray-500 disabled:bg-black/25 disabled:border-none"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                        disabled={!edit}
                    />
                    <InputError message={errors.password_confirmation} className="mt-1" />
                </fieldset>
                <SubmitButton className="disabled:text-gray-500 disabled:bg-black/25 mt-4" disabled={!edit || processing}>
                    <Save size={18} />
                    Save
                </SubmitButton>
            </form>
        </>
    );
}
