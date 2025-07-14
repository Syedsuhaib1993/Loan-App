// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Login({ setToast, }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin =async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`loan-app-backend-pi.vercel.app/api/login`,{
            email: email,
            password: password
        })
        console.log(response.data.user);
        localStorage.setItem('token',response.data.data)
        localStorage.setItem("user", JSON.stringify(response.data.user));

         if (setToast) {
        setToast({ message: 'Login Successfully!', type: 'success' });
        setTimeout(() => setToast({ message: '', type: '' }), 3000);
        setTimeout(() => navigate('/'), 2000);
      }

    } catch (error) {
       if (setToast) {
        setToast({ message: ' Login Failed!', type: 'error' });
        setTimeout(() => setToast({ message: '', type: '' }), 3000);
      }
    }
   
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-[#15A08D] text-center">LogIn</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-400 text-[#15A08D] font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition w-full"
        >
          Log In
        </button>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#15A08D] font-semibold underline-offset-2 underline">
            Sign Up
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
