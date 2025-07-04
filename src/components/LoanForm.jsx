// src/components/LoanForm.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoanForm({loanType }) {
  // Track the slider value in state
  const [loanAmount, setLoanAmount] = useState(50000);
   const [selectedLoanType, setSelectedLoanType] = useState('');
  const [highlight, setHighlight] = useState(false);
    useEffect(() => {
    if (loanType) {
      setSelectedLoanType(loanType);
      // Trigger highlight
      setHighlight(true);
      // Remove highlight after 1s
      setTimeout(() => setHighlight(false), 1000);
    }
  }, [loanType]);

  return (
    <section id="loanform" className="min-h-screen p-12 bg-gray-50 flex items-center justify-center">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-[#12565F] text-center">
          Apply for Your Loan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              className="w-full p-3 border rounded"
              type="text"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              className="w-full p-3 border rounded"
              type="email"
              placeholder="Your email"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Phone</label>
            <input
              className="w-full p-3 border rounded"
              type="tel"
              placeholder="Your phone number"
              required
            />
          </div>

          {/* Loan Amount slider */}
          <div>
            <label className="block mb-1">Loan Amount ($)</label>
            <input
              className="w-full"
              type="range"
              min="50000"
              max="200000"
              step="5000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>$50,000</span>
              <span>$200,000</span>
            </div>
            <p className=" font-bold text-[#12565F]">
              Selected Amount: ${Number(loanAmount).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Loan Type</label>
          <select
            className={`w-full p-3 border rounded transition-all duration-500 ${
              highlight ? 'ring-4 ring-yellow-400' : ''
            }`}
            value={selectedLoanType}
            onChange={(e) => setSelectedLoanType(e.target.value)}
            required
          >
            <option value="">Select Loan Type</option>
            <option>Home Loan</option>
            <option>Car Loan</option>
            <option>Education Loan</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-1">Additional Message</label>
          <textarea
            className="w-full p-3 border rounded"
            rows="2"
            placeholder="Any additional details"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-yellow-400 text-[#12565F] font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition w-full"
        >
          Submit Application
        </button>
      </motion.form>
    </section>
  );
}
