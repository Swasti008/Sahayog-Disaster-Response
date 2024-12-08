import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ closeModal, children }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
      <button
            onClick={closeModal}
            className="absolute top-10 right-6 bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-full transition-colors group"
          >
            <X
              size={24}
              className="group-hover:rotate-90 transition-transform"
            />
          </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
