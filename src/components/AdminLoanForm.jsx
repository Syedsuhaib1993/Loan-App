import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function AdminLoanForm({ setToast, onClose, refreshList }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loanAmount, setLoanAmount] = useState(50000);
  const [selectedLoanType, setSelectedLoanType] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/form`, {
        name,
        email,
        phone,
        amount: loanAmount,
        type: selectedLoanType,
      });

      if (setToast) {
        setToast({ message: "Loan Created!", type: "success" });
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
      }

      // Refresh admin table
      if (refreshList) refreshList();

      // Close modal
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      if (setToast) {
        setToast({ message: "Error creating loan!", type: "error" });
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
      }
    }
  };

  return (
    <motion.form
      onSubmit={handleForm}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white px-8 py-6 rounded-lg shadow-lg w-full max-w-2xl relative"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-4 text-center text-[#12565F]">
        Create New Loan Application
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
          />
        </div>
        <div>
          <label className="block mb-1">Loan Amount ($)</label>
          <input
            type="range"
            min="50000"
            max="200000"
            step="5000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full"
          />
          <p className="mt-1 text-sm">
            Selected: ${Number(loanAmount).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Loan Type</label>
        <select
          className="w-full p-3 border rounded"
          required
          value={selectedLoanType}
          onChange={(e) => setSelectedLoanType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option>Home Loan</option>
          <option>Car Loan</option>
          <option>Education Loan</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-400 text-[#12565F] font-bold py-3 rounded-full hover:bg-yellow-300"
      >
        Submit
      </button>
    </motion.form>
  );
}
