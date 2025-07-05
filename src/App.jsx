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

export default function App() {
  const [loanType, setLoanType] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleSetLoanType = (type) => {
    setLoanType(type);
    setToastMessage(`Loan type set to ${type}!`);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <BrowserRouter>
      <div className="font-sans relative">
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route
              path="/"
              element={
                <>
                  <Navbar setToastMessage={setToastMessage} />
                  <main className="pt-10">
                    <Home />
                    <AboutUs />
                    <Services setLoanType={handleSetLoanType} />
                    <LoanForm loanType={loanType} />
                  </main>
                  <Footer />
                </>
              }
            />
          </Route>

          <Route element={<Authroutes />}>
            <Route
              path="/signup"
              element={<>
              <Navbar setToastMessage={setToastMessage} />
              <Signup setToastMessage={setToastMessage} /></>}             
            />
            <Route
              path="/login"
              element={<><Navbar setToastMessage={setToastMessage} />
              <Login setToastMessage={setToastMessage} />
              </>
             }
            />
          </Route>
        </Routes>

        {toastMessage && (
          <div className="fixed bottom-8 right-8 bg-[#15A08D] text-white px-4 py-3 rounded shadow-lg animate-fade-in-out">
            {toastMessage}
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}
