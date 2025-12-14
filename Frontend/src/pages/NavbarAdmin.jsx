import React, { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import fixmyLogo from "../assets/LOGO.png";
import ModalConfirm from "../components/ModalConfirm";

const NavbarAdmin = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Close any open state when route changes
  }, [location.pathname]);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    try {
      const token = localStorage.getItem("fixmyunesa_token");

      // Call backend logout endpoint
      await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with logout even if backend call fails
    } finally {
      // Clear only auth-related items
      localStorage.removeItem("fixmyunesa_token");
      localStorage.removeItem("fixmyunesa_role");
      localStorage.removeItem("fixmyunesa_user");

      navigate("/login");
      setShowLogoutConfirm(false);
    }
  };

  return (
    <div
      className="w-full flex justify-between items-center bg-white text-gray-600 font-bold border-b"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}
    >
      <img src={fixmyLogo} alt="FixMyUnesa" className="h-24 w-auto ml-10" />
      <ul className="flex w-full justify-end mr-7">
        <li className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full hover:bg-red-700 transition-colors"
          >
            <FiLogOut className="w-6 h-6 text-white font-bold" />
          </button>
        </li>
      </ul>

      <ModalConfirm
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
        title="Konfirmasi Logout"
        message="Apakah Anda yakin ingin keluar dari akun Anda?"
        confirmText="Ya, Logout"
        variant="danger"
      />
    </div>
  );
};

export default NavbarAdmin;
