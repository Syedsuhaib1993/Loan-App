// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import { CiBank } from "react-icons/ci";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ['Home', 'AboutUs', 'Services', 'LoanForm'];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#12565F] text-white p-4 fixed w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-extrabold text-2xl tracking-wide flex gap-2"><CiBank size={35}/> Loanify Bank</h1>

        {/* Desktop Nav */}
        <div className="space-x-6 hidden md:flex">
          {navLinks.map((section) => (
            <Link
              key={section}
              to={section.toLowerCase()}
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-yellow-400 transition"
            >
              {section.replace(/([A-Z])/g, ' $1').trim()}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={handleToggle} aria-label="Toggle Menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      ></div>

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#12565F] text-white transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={handleClose} aria-label="Close Menu">
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="flex flex-col items-start px-6 space-y-4">
          {navLinks.map((section) => (
            <Link
              key={section}
              to={section.toLowerCase()}
              smooth={true}
              duration={500}
              onClick={handleClose}
              className="cursor-pointer border-b border-blue-700 w-full pb-2 hover:text-yellow-400 transition"
            >
              {section.replace(/([A-Z])/g, ' $1').trim()}
            </Link>
          ))}
        </nav>
      </div>
    </nav>
  );
}
