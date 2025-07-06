// src/App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import LoanForm from "./components/LoanForm";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Authroutes from "./routes/Authroutes";
import PublicRoutes from "./routes/PublicRoutes";
import Admin from "./pages/Admin";


export default function App() {
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loanType, setLoanType] = useState("");

  const handleSetLoanType = (type) => {
    setLoanType(type);
    setToast(`Loan type set to ${type}!`);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <BrowserRouter>
      <div className="font-sans relative">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route element={<PublicRoutes />}>
            <Route
              path="/"
              element={
                <>
                  <Navbar setToast={setToast} />
                  <main className="pt-10">
                    <Home />
                    <AboutUs />
                    <Services setLoanType={handleSetLoanType} />
                  </main>
                  <LoanForm loanType={loanType} setToast={setToast} />
                  <Footer />
                </>
              }
            />
          </Route>

          <Route element={<Authroutes />}>
            <Route
              path="/signup"
              element={
                <>
                  <Navbar setToast={setToast} />
                  <Signup setToast={setToast} />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Navbar setToast={setToast} />
                  <Login setToast={setToast} />
                </>
              }
            />
          </Route>
        </Routes>

        {toast.message && (
          <div
            className={`fixed bottom-8 right-8 flex items-center gap-2 px-4 py-3 rounded shadow-lg animate-fade-in-out transition
      ${toast.type === "success" ? "bg-[#12565F]" : "bg-red-600"} text-white`}
          >
            {toast.type === "success" ? (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        )}
      </div>
      
    </BrowserRouter>
  );
}
