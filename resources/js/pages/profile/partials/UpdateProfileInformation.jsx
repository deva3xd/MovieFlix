import { toast } from 'sonner';
import { useForm, usePage, router } from '@inertiajs/react';
import { Pencil, X } from "lucide-react";
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/Button";
import InputError from '@/components/ui/InputError';
import Input from "@/components/ui/Input";
import Label from '@/components/ui/Label';

export default function UpdateProfileInformation() {
    const user = usePage().props.auth.user;
    const [edit, setEdit] = useState(false);
    const fileInputRef = useRef(null);

    const { data, setData, errors, processing, reset } = useForm({
        name: user.name ?? '',
        email: user.email ?? '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();

        router.post(route("profile.update"), {
            _method: 'patch',
            name: data.name,
            email: data.email,
            image: data.image,
        }, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setEdit(false);
                reset('image');
                toast.success('Profile updated');
            },
        });
    };

    const cancelEdit = () => {
        setEdit(false);
        reset();
    };

    const fieldInput = [
        { name: "Name", label: "name", placeholder: "Your name", type: "text", value: data.name, errors: errors.name },
        { name: "Email", label: "email", placeholder: "Your email", type: "email", value: data.email, errors: errors.email }
    ];

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl uppercase">Profile Information</h3>
                <Button
                    size="sm"
                    className="rounded-full"
                    variant={edit ? 'primary' : 'secondary'}
                    onClick={() => setEdit((prev) => !prev)}
                >
                    {edit ? <X size={14} /> : <Pencil size={14} />}
                </Button>
            </div>

            <form onSubmit={submit} className="space-y-5">
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

                <fieldset className="fieldset">
                    <Label htmlFor="image">Profile Picture</Label>
                    <Input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        ref={fileInputRef}
                        className="w-full file-input px-0 file:bg-zinc-800 file:border-none disabled:bg-zinc-900"
                        onChange={(e) => setData('image', e.target.files[0])}
                        disabled={!edit}
                    />
                    <label className="label text-xs text-gray-500">JPEG, JPG, PNG. Max 2MB.</label>
                    <InputError message={errors.image} className="mt-1" />
                </fieldset>

                <div className="flex gap-2">
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
