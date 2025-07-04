// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#12565F] text-white p-6 text-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} Loanify Bank. Secure. Trusted. Reliable.</p>
    </footer>
  );
}
