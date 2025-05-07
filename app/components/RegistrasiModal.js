// RegistrationModal.js
"use client";

import { useState } from "react";
import { EyeOff } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function RegistrationModal({ isOpen, onClose, onSwitch }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-2xl w-[500px] text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-8">Daftar</h2>

        {/* Input Fields */}
        <div className="space-y-6">
          <input
            type="text"
            className="w-full p-2 rounded-lg border bg-[#F0EFFF] text-blue-800 focus:outline-none text-sm placeholder-[#A7A3FF]"
            placeholder="Masukan Nama Lengkap"
          />
          <input
            type="email"
            className="w-full p-2 rounded-lg border bg-[#F0EFFF] text-blue-800 focus:outline-none text-sm placeholder-[#A7A3FF]"
            placeholder="Masukan Email"
          />
          <input
            type="tel"
            className="w-full p-2 rounded-lg border bg-[#F0EFFF] text-blue-800 focus:outline-none text-sm placeholder-[#A7A3FF]"
            placeholder="Masukan Nomor Telepon"
          />
          <div className="relative">
            <input
              type="password"
              className="w-full p-2 rounded-lg border bg-[#F0EFFF] text-blue-800 focus:outline-none text-sm placeholder-[#A7A3FF]"
              placeholder="Password"
            />
            <EyeOff
              className="absolute right-4 top-2 text-xs text-[#A7A3FF] cursor-pointer"
              size={20}
            />
          </div>
          <div className="relative">
            <input
              type="password"
              className="w-full p-2 rounded-lg border bg-[#F0EFFF] text-blue-800 focus:outline-none text-sm placeholder-[#A7A3FF]"
              placeholder="Konfirmasi Password"
            />
            <EyeOff
              className="absolute right-4 top-2 text-xs text-[#A7A3FF] cursor-pointer"
              size={20}
            />
          </div>
        </div>

        {/* Register Button */}
        <button className="w-full mt-8 bg-blue-600 text-white p-2 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-800 transition relative">
          <span className="absolute inset-0 bg-[#A7A3FF] blur-lg rounded-lg"></span>
          <span className="relative">Daftar</span>
        </button>

        {/* Login Link */}
        <p className="mt-6 text-gray-600 text-md">
          Sudah punya akun?{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline"
            onClick={onSwitch}
          >
            Masuk disini
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
