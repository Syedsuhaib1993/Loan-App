// src/components/EditModal.jsx
import React from "react";

export default function EditModal({
  isOpen,
  amount,
  setAmount,
  onSave,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-[#12565F]">
          Edit Loan Amount
        </h2>

        <label className="block mb-2 font-medium">Amount: ${amount}</label>
        <input
          type="range"
          min="50000"
          max="200000"
          step="5000"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full mb-4"
        />

        <input
          type="number"
          min="50000"
          max="200000"
          step="5000"
          value={amount}
          onChange={(e) => {
            let val = Number(e.target.value);
            if (val < 50000) val = 50000;
            if (val > 200000) val = 200000;
            setAmount(val);
          }}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 text-white bg-[#12565F] font-bold rounded hover:bg-yellow-300 hover:text-teal-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
