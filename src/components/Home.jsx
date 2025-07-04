// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import heroBg from '../assets/images1.jpg'; // adjust name if needed

export default function Home() {
  return (
    <section
      id="home"
      className="min-h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="container mx-auto px-8 flex flex-col md:items-start md:text-left items-center text-center">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-white mb-4"
        >
          Welcome to Loanify Bank
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl text-white mb-6 max-w-xl"
        >
          Get fast, secure, and flexible loans for your dreams. Easy application. Transparent process.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link
            to="loanform"
            smooth={true}
            duration={500}
            className="inline-block bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition cursor-pointer"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
