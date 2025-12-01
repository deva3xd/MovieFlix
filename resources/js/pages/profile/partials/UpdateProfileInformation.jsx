import InputError from '@/components/ui/InputError';
import { useForm, usePage } from '@inertiajs/react';
import { Save, Pencil, X } from "lucide-react";
import { useState } from 'react';

export default function UpdateProfileInformation() {
    const user = usePage().props.auth.user;
    const [edit, setEdit] = useState(false);

    const { data, setData, patch, errors, processing } = useForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        image: null,
        birthday: user.birthday,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"), { forceFormData: true });
    };

    return (
        <>
            <div className='flex justify-between'>
                <h3 className='font-bold text-2xl'>Profile Information</h3>
                <button className="btn bg-custom-primary hover:bg-opacity-90 text-white" onClick={() => setEdit(edit => !edit)}>
                    {!edit ? <Pencil size={15} /> : <X size={15} />}
                </button>
            </div>
            <form onSubmit={submit}>
                <div className='flex gap-2'>
                    <div className='w-1/2'>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend" htmlFor="first_name">First Name</legend>
                            <input
                                type="text"
                                className="input w-full focus:outline-none"
                                placeholder="first name"
                                id="first_name"
                                name="first_name"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                autoComplete="first-name"
                                required
                                disabled={!edit}
                            />
                            <InputError message={errors.first_name} className="mt-1" />
                        </fieldset>
                    </div>
                    <div className='w-1/2'>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend" htmlFor="last_name">Last Name</legend>
                            <input
                                type="text"
                                className="input w-full focus:outline-none"
                                placeholder="last name"
                                id="last_name"
                                name="last_name"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                autoComplete="last-name"
                                required
                                disabled={!edit}
                            />
                            <InputError message={errors.last_name} className="mt-1" />
                        </fieldset>
                    </div>
                </div>
                <fieldset className="fieldset mt-3">
                    <legend className="fieldset-legend" htmlFor="email">Email Address</legend>
                    <input
                        type="email"
                        className="input w-full focus:outline-none"
                        placeholder="email address"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="email"
                        required
                        disabled={!edit}
                    />
                    <InputError message={errors.email} className="mt-1" />
                </fieldset>
                <div className='flex gap-2 mt-3'>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend" htmlFor="image">Select Profile Picture</legend>
                        <input
                            type="file"
                            className="file-input"
                            id="image"
                            name="image"
                            accept='image/*'
                            onChange={(e) => setData('image', e.target.files[0])}
                            disabled={!edit}
                        />
                        <label className="label text-xs">Max size 2MB</label>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend" htmlFor="birthday">Birthday</legend>
                        <input
                            type="date"
                            className="input w-full focus:outline-none"
                            id="birthday"
                            name="birthday"
                            value={data.birthday}
                            onChange={(e) => setData('birthday', e.target.value)}
                            autoComplete="birthday"
                            disabled={!edit}
                        />
                        <InputError message={errors.birthday} className="mt-1" />
                    </fieldset>
                </div>
                <button className="btn bg-white hover:bg-gray-200 text-black mt-3 disabled:bg-[#1c2228] disabled:text-white" disabled={!edit || processing}>
                    <Save size={18} />
                    Save
                </button>
            </form>
        </>
    );
}
