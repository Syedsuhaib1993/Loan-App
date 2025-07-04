// src/components/AboutUs.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function AboutUs() {
  const facilities = [
    'Instant online application & approvals',
    'Low interest rates & flexible repayment options',
    'Dedicated financial advisors',
    '24/7 customer support',
    'Secure & confidential processing',
  ];

  return (
    <section id="aboutus" className="min-h-screen px-8 py-16 bg-gradient-to-br text-white from-[#15A08D] to-[#0D1A3D] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center"
      >
        <h2 className="text-4xl font-bold mb-6 ">About Loanify</h2>
        <p className="text-lg 700 mb-4">
          At Loanify, we believe everyone deserves a chance to fulfill their dreams with financial support they can trust.
          Our mission is to provide transparent, affordable, and tailored loans for every stage of life.
        </p>

        <h3 className="text-2xl font-semibold mt-8 mb-4 ">What We Offer:</h3>
        <ul className="text-white list-disc list-inside text-left max-w-lg mx-auto">
          {facilities.map((facility, index) => (
            <li key={index} className="mb-2">{facility}</li>
          ))}
        </ul>

        <p className="text-lg text-white mt-6">
          Join thousands of satisfied customers who trust Loanify for their financial needs.
        </p>
      </motion.div>
    </section>
  );
}
