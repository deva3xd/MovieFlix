import { useRef, useState } from 'react';
import InputError from '@/components/InputError';
import { useForm } from '@inertiajs/react';
import { Save, Pencil, X } from "lucide-react";
import { toast } from 'sonner';

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
                <button className="btn bg-custom-primary hover:bg-opacity-90 text-white" onClick={() => setEdit(edit => !edit)}>
                    {!edit ? <Pencil size={15} /> : <X size={15} />}
                </button>
            </div>
            <form onSubmit={updatePassword} >
                <fieldset className="fieldset">
                    <legend className="fieldset-legend" htmlFor="current_password">Current Password</legend>
                    <input
                        type="password"
                        className="input w-full focus:outline-none"
                        placeholder="current password"
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        autoComplete="current-password"
                        required
                        disabled={!edit}
                    />
                    <InputError message={errors.current_password} className="mt-1" />
                </fieldset>
                <fieldset className="fieldset mt-3">
                    <legend className="fieldset-legend" htmlFor="password">New Password</legend>
                    <input
                        type="password"
                        className="input w-full focus:outline-none"
                        placeholder="new password"
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="new-password"
                        required
                        disabled={!edit}
                    />
                    <InputError message={errors.password} className="mt-1" />
                    <p className="mt-1 text-sm text-gray-600">
                        Ensure your account is using a long, random password to stay secure.
                    </p>
                </fieldset>
                <fieldset className="fieldset mt-3">
                    <legend className="fieldset-legend" htmlFor="password_confirmation">Confirm Password</legend>
                    <input
                        type="password"
                        className="input w-full focus:outline-none"
                        placeholder="confirm password"
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete="new-password"
                        required
                        disabled={!edit}
                    />
                    <InputError message={errors.password_confirmation} className="mt-1" />
                </fieldset>
                    <button className="btn bg-white hover:bg-gray-200 text-black mt-3 disabled:bg-[#1c2228] disabled:text-white" disabled={!edit || processing}>
                        <Save size={18} />
                        Save
                    </button>
            </form>
        </>
    );
}
