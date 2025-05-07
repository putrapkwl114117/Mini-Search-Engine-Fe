// AuthModal.js
"use client";

import { useState } from "react";
import LoginModal from "../LoginModal";
import RegistrationModal from "../RegistrasiModal";

export default function AuthModal({ isOpen, onClose }) {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSwitch = () => {
    setIsRegistering(!isRegistering);
  };

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
        {isRegistering ? (
          <RegistrationModal
            isOpen={true}
            onClose={onClose}
            onSwitch={handleSwitch}
          />
        ) : (
          <LoginModal
            isOpen={true}
            onClose={onClose}
            onSwitch={handleSwitch}
          />
        )}
      </div>
    </div>
  );
}