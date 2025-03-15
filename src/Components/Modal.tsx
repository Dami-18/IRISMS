import React from "react";

const Modal: React.FC<{
  title: string;
  options: any;
  onClose: any;
}> = ({ title, options, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <div className="space-y-4">
          {options.map((option: any, index: number) => (
            <button
              key={index}
              onClick={option.onClick}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {option.label}
            </button>
          ))}
        </div>
        {/* Close Modal */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
