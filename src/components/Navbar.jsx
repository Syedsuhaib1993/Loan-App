import React, { useEffect, useState, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { CiBank } from "react-icons/ci";

export default function Navbar({ setToast }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [logintoken, setLogintoken] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    if (token) {
      setLogintoken(token);
    }

    if (userString) {
      try {
        const parsedUser = JSON.parse(userString);
        setUserData(parsedUser);
      } catch (err) {
        console.error("Invalid user data in localStorage", err);
      }
    }
  }, []);

  const navLinks = ["Home", "AboutUs", "Services", "LoanForm"];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLogintoken(null);
    setUserData(null);
    setIsDropdownOpen(false);

    if (setToast) {
      setToast({ message: "Logout Successful!", type: "success" });
      setTimeout(() => setToast({ message: "", type: "" }), 3000);
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#12565F] text-white p-6 fixed w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-extrabold text-2xl tracking-wide flex gap-2">
          <CiBank size={35} /> Loanify Bank
        </h1>

        {/* Nav Links - always hidden on mobile */}
        <div className="space-x-6 hidden md:flex items-center">
          {navLinks.map((section) => (
            <ScrollLink
              key={section}
              to={section.toLowerCase()}
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer hover:text-yellow-400 transition"
            >
              {section.replace(/([A-Z])/g, " $1").trim()}
            </ScrollLink>
          ))}
        </div>

        {/* Avatar Dropdown - always visible */}
        {logintoken && userData ? (
          <div className="relative ml-4" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={
                  userData.image && userData.image !== ""
                    ? userData.image
                    : "https://via.placeholder.com/40"
                }
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-yellow-400 object-cover"
              />
              <span className="hidden md:inline">{userData.name || "User"}</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-auto bg-white text-black rounded shadow-lg py-2 z-50">
                {userData.email && (
                  <p className="px-4 py-2  border-b">{userData.email}</p>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : !logintoken ? (
          <RouterLink
            to="/login"
            className="bg-yellow-400 text-blue-900 font-bold px-4 py-2 rounded-full hover:bg-yellow-300 transition"
          >
            Login
          </RouterLink>
        ) : null}

        {/* Mobile Toggle */}
        <div className="md:hidden ml-4">
          <button onClick={handleToggle} aria-label="Toggle Menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Mobile Slide Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#12565F] text-white transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={handleClose} aria-label="Close Menu">
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="flex flex-col items-start px-6 space-y-4">
          {navLinks.map((section) => (
            <ScrollLink
              key={section}
              to={section.toLowerCase()}
              smooth={true}
              duration={500}
              offset={-80}
              onClick={handleClose}
              className="cursor-pointer border-b border-blue-700 w-full pb-2 hover:text-yellow-400 transition"
            >
              {section.replace(/([A-Z])/g, " $1").trim()}
            </ScrollLink>
          ))}
        </nav>
      </div>
    </nav>
  );
}
