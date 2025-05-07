// LoginModal.js
"use client";

import { EyeOff } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function LoginModal({ isOpen, onClose, onSwitch }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-12 rounded-2xl shadow-2xl w-[490px] text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-8">Masuk</h2>

        {/* Input Fields */}
        <div className="space-y-6">
          <input
            type="text"
            className="w-full p-2 rounded-lg border bg-[#F0EFFF] text-blue-800 focus:outline-none text-sm placeholder-[#A7A3FF]"
            placeholder="Masukan Email atau Username"
          />
          <div className="relative">
            <input
              type="password"
              className="w-full p-2 rounded-lg border bg-[#F0EFFF] text-blue-800 focus:outline-none text-sm placeholder-[#A7A3FF]"
              placeholder="Password"
            />
            <EyeOff
              className="absolute right-4 text-xs top-2 text-[#A7A3FF] cursor-pointer"
              size={20}
            />
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center mt-4 text-xs text-gray-600">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="w-5 h-5 focus:ring-3 focus:ring-blue-800 border border-gray-300 rounded-xl"
            />{" "}
            <span>Ingat Saya</span>
          </label>
          <a href="#" className="text-gray-400 hover:underline text-xs">
            Lupa kata sandi?
          </a>
        </div>

        {/* Login Button */}
        <button className="w-full mt-8 bg-blue-600 text-white p-2 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-800 transition relative">
          <span className="absolute inset-0 bg-[#A7A3FF] opacity-70 blur-lg rounded-lg"></span>
          <span className="relative">Masuk</span>
        </button>

        {/* Register Link */}
        <p className="mt-6 text-gray-600 text-md">
          Jika Anda tidak memiliki akun{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline"
            onClick={onSwitch}
          >
            Daftar disini
          </a>
        </p>

        {/* Social Login */}
        <p className="mt-6 text-gray-400 text-sm">atau lanjutkan dengan</p>
        <div className="flex justify-center gap-6 mt-4">
          <FontAwesomeIcon
            icon={faApple}
            className="w-8 h-8 text-black cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faGoogle}
            className="w-8 h-8 text-red-600 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
