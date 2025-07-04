// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import LoanForm from './components/LoanForm';
import Footer from './components/Footer';

export default function App() {
  const [loanType, setLoanType] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleSetLoanType = (type) => {
    setLoanType(type);
    setToastMessage(`Loan type set to ${type}!`);

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  return (
    <div className="font-sans relative">
      <Navbar />
      <main className="pt-10">
        <Home />
        <AboutUs />
        <Services setLoanType={handleSetLoanType} />
        <LoanForm loanType={loanType} />
      </main>
      <Footer />

      {/* Simple Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-blue-900 text-white px-4 py-3 rounded shadow-lg animate-fade-in-out">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
