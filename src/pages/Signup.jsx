import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function Signup({ setToast }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageUri(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUri(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    localStorage.setItem('email',email)
    try {
      const ImgURI = new FormData();
      ImgURI.append("image", imageUri);

      const res = await axios.post("http://localhost:8080/upload", ImgURI);

      const image = res.data.data;

      const response = await axios.post("http://localhost:8080/api/signup", {
        name,
        email,
        password,
        image,
      });

      if (setToast) {
        setToast({ message: "Signup Successful!!", type: "success" });
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
        setTimeout(() => navigate("/verify"), 2000);
      }
    } catch (error) {
      if (setToast) {
        setToast({ message: "Signup Failed!!", type: "error" });
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
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
      <form
        onSubmit={handleSignup}
        className="bg-white mt-6 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-[#15A08D] text-center">
          SignUp
        </h2>
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
        <div className="mb-4">
          <label className="block mb-1">Upload Image</label>

          {/* ✅ Dropzone Box */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="w-full p-6 border-2 border-dashed border-gray-400 rounded-lg text-center cursor-pointer hover:border-[#15A08D] transition"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mx-auto h-32 object-cover rounded"
              />
            ) : (
              <p className="text-gray-500">
                Drag & drop your image here, or click to select
              </p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleSelect}
              required
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="block mt-2 text-[#15A08D] underline cursor-pointer"
            >
              Browse Files
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-yellow-400 text-[#15A08D] font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition w-full"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#15A08D] font-semibold underline-offset-2 underline"
          >
            Log In
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
