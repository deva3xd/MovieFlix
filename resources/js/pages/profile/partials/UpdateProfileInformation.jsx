import { useForm, usePage } from '@inertiajs/react';
import { Save, Pencil, X } from "lucide-react";
import { useState } from 'react';
import InputError from '@/components/ui/InputError';
import Input from "@/components/ui/Input";
import SubmitButton from "@/components/ui/buttons/SubmitButton";

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
                <button className={`btn border-none ${edit ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white hover:bg-white/90 text-black'} `} onClick={() => setEdit(edit => !edit)}>
                    {!edit ? <Pencil size={15} /> : <X size={15} />}
                </button>
            </div>
            <form onSubmit={submit}>
                <div className='flex gap-2'>
                    <div className='w-1/2'>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend" htmlFor="first_name">First Name</legend>
                            <Input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={data.first_name}
                                className="w-full disabled:text-gray-500 disabled:bg-black/25 disabled:border-none"
                                onChange={(e) => setData('first_name', e.target.value)}
                                required
                                disabled={!edit}
                            />
                            <InputError message={errors.first_name} className="mt-1" />
                        </fieldset>
                    </div>
                    <div className='w-1/2'>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend" htmlFor="last_name">Last Name</legend>
                            <Input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={data.last_name}
                                className="w-full disabled:text-gray-500 disabled:bg-black/25 disabled:border-none"
                                onChange={(e) => setData('last_name', e.target.value)}
                                required
                                disabled={!edit}
                            />
                            <InputError message={errors.last_name} className="mt-1" />
                        </fieldset>
                    </div>
                </div>
                <fieldset className="fieldset mt-3">
                    <legend className="fieldset-legend" htmlFor="email">Email Address</legend>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        className="w-full disabled:text-gray-500 disabled:bg-black/25 disabled:border-none"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        disabled={!edit}
                    />
                    <InputError message={errors.email} className="mt-1" />
                </fieldset>
                <div className='flex gap-2 mt-3'>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend" htmlFor="image">Select Profile Picture</legend>
                        <Input
                            type="file"
                            id="image"
                            name="image"
                            accept='image/*'
                            className="file-input file:bg-foreground file:border-none disabled:text-gray-500 disabled:bg-black/25 disabled:border-none"
                            onChange={(e) => setData('image', e.target.files[0])}
                            disabled={!edit}
                        />
                        <label className="label text-xs">Max size 2MB</label>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend" htmlFor="birthday">Birthday</legend>
                        <Input
                            type="date"
                            id="birthday"
                            name="birthday"
                            value={data.birthday}
                            className="block mx-auto disabled:text-gray-500 disabled:bg-black/25 disabled:border-none"
                            onChange={(e) => setData('birthday', e.target.value)}
                            disabled={!edit}
                        />
                        <InputError message={errors.birthday} className="mt-1" />
                    </fieldset>
                </div>
                <SubmitButton className="disabled:text-gray-500 disabled:bg-black/25" disabled={!edit || processing}>
                    <Save size={18} />
                    Save
                </SubmitButton>
            </form>
        </>
    );
}
