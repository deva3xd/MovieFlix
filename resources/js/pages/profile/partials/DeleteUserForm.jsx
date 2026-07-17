import { useRef, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/Button';
import InputError from '@/components/ui/InputError';
import Input from "@/components/ui/Input";

export default function DeleteUserForm({ isOpen, onClose }) {
    const passwordInput = useRef();
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            onClick={handleOverlayClick}
            className="h-screen w-screen bg-black/75 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
        >
            <form onSubmit={deleteUser} className="p-6 bg-background border border-white/20 rounded-lg cursor-auto">
                <h2 className="text-lg font-medium text-white">
                    Are you sure you want to delete your account?
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                    All of your data will be permanently deleted. Enter your password to confirm.
                </p>
                <div className="mt-4">
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        ref={passwordInput}
                        value={data.password}
                        className="w-full"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Your password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <Button size="sm" variant="outline" className="rounded-md" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button size="sm" className="rounded-md" disabled={processing}>
                        Delete
                    </Button>
                </div>
            </form>
        </div>
    );
}
