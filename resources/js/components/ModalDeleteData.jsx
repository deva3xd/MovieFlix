import { useEffect } from 'react';
import { Button } from "./ui/Button";

const ModalDeleteData = ({ isOpen, onClose, onConfirm }) => {
    // disable scroll when search is active
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

    // don't render the overlay if we are on the actual search page or if closed
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
            <div className="modal-box cursor-default bg-zinc-950 border border-white/20 rounded-md">
                <h3 className="font-bold text-xl">Confirm Deletion</h3>
                <p className="py-4 font-light">Are you sure want to delete this item?</p>
                <div className="modal-action">
                    <Button size="sm" variant="secondary" className="rounded-md" onClick={onClose}>Close</Button>
                    <Button size="sm" className="rounded-md" onClick={onConfirm}>Delete</Button>
                </div>
            </div>
        </div>
    );
};

export default ModalDeleteData;
