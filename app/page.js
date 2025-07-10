"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1E3A8A] ">
     
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        whileHover={{ y: -5 }}
        className="backdrop-blur-lg bg-white/20 border border-white/10 p-10 rounded-2xl shadow-xl text-center w-[350px] space-y-6"
      >
       
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            Welcome 👋
          </h1>
          <p className="text-white/80 mt-2">Choose an option to continue</p>
        </motion.div>

        {/* Buttons with neon glow hover effect */}
        <div className="flex justify-center space-x-4">
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.6)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              href="/login"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Login
            </Link>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 20px rgba(34, 197, 94, 0.6)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              href="/register"
              className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            >
              Register
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
