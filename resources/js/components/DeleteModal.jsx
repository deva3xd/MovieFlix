import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <dialog id="my_modal_5" className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Confirm Deletion</h3>
                <p className="py-4">Are you sure want to delete this item?</p>
                <div className="modal-action">
                    <button className="btn btn-neutral" onClick={onClose}>Close</button>
                    <button className="btn btn-error text-white" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </dialog>
    );
};

export default DeleteModal;
