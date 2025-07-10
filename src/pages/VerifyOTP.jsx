import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const VerifyOTP = ({ setToast }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate()

  const handleSubmit =async (e) => {
      e.preventDefault();
      const email = localStorage.getItem("email");
        console.log(email);
        
    try {
        const res = await axios.post('http://localhost:8080/api/verify',{
            otp,
            email
        })
        console.log(res.data.data.isactive);
        if(res.data.data.isactive){
            if(setToast){
         setToast({ message: " OTP Verified Successful!!", type: "success" });
        setTimeout(() => setToast({ message: "", type: "" }), 2000);
        localStorage.removeItem('email')
        setTimeout(()=>navigate('/login'),2000)
        }
        }
        
    } catch (error) {
        console.log(error.message);
        if(setToast){
            setToast({ message: " Invalid OTP. Please try again.", type: "error" });
           setTimeout(() => setToast({ message: "", type: "" }), 3000);
        }   
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br  from-[#15A08D] to-[#0D1A3D] px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#15A08D]">Verify OTP</h2>
        <p className="mb-6 text-gray-600">
          Please enter the 4-digit OTP sent to your registered email.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            maxLength={4}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15A08D] text-center text-2xl tracking-widest"
            placeholder="____"
          />

          <button
            type="submit"
            className="bg-[#15A08D] text-white py-3 rounded-md font-semibold transition duration-300 hover:bg-[#54968d]"
          >
            Verify OTP
          </button>
        </form>

      </div>
    </section>
  );
};

export default VerifyOTP;
