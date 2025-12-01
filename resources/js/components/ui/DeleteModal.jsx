import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <dialog id="my_modal_5" className={`modal ${isOpen && 'modal-open'}`}>
            <div className="modal-box bg-foreground border border-primary/25">
                <h3 className="font-bold text-lg">Confirm Deletion</h3>
                <p className="py-4">Are you sure want to delete this item?</p>
                <div className="modal-action">
                    <button className="btn bg-secondary hover:bg-secondary/90" onClick={onClose}>Close</button>
                    <button className="btn bg-red-600 hover:bg-red-700 text-white" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </dialog>
    );
};

export default DeleteModal;
