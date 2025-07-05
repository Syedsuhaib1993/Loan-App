// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Signup({ setToastMessage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup =async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8080/api/signup',{
            name,
            email,
            password
        })
        console.log(response.data.message);
        setToastMessage('Signup Successful!');
        setTimeout(() => navigate('/login'), 2000);
        
    } catch (error) {
       setToastMessage(error.message);
        
    }
    // Here you can add actual signup logic.
    
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-[#15A08D] text-center">SignUp</h2>
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>
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
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-[#15A08D] font-semibold underline-offset-2 underline">
            Log In
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
