// src/components/Services.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaCar, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-scroll';

const services = [
  {
    icon: <FaHome size={40} />,
    title: 'Home Loan',
    description: 'Low-interest home loans with flexible tenure options.',
  },
  {
    icon: <FaCar size={40} />,
    title: 'Car Loan',
    description: 'Drive your dream car with easy EMI plans.',
  },
  {
    icon: <FaGraduationCap size={40} />,
    title: 'Education Loan',
    description: 'Fund your higher education hassle-free.',
  },
];

export default function Services({ setLoanType }) {
  return (
    <section id="services" className="min-h-screen pt-36 p-12 bg-gradient-to-b from-gray-50 to-white flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-8"
      >
        Our Loan Services
      </motion.h2>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="bg-[white] p-8 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition"
          >
            <div className="text-yellow-400 mb-4">{service.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <Link
              to="loanform"
              smooth={true}
              duration={500}
              onClick={() => setLoanType(service.title)}
              className="inline-block bg-yellow-400 text-[#12565F] font-bold px-4 py-2 rounded-full hover:bg-yellow-300 transition cursor-pointer"
            >
              Apply Now
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
