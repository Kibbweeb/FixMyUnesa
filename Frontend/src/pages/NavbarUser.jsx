import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import fixmyLogo from "../assets/fixmy.png";
import ModalConfirm from "../components/ModalConfirm";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setNav(false);
  }, [location.pathname]);

  const handleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };

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
          "Authorization": `Bearer ${token}`,
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
    <div className="flex justify-between items-center p-4 bg-blue-700 text-white">
      <img src={fixmyLogo} alt="FixMyUnesa" className="h-16 w-auto ml-10" />
      <ul className="hidden md:flex w-full justify-end mr-4">
        <li className="p-4">
          <Link to="/home">Home</Link>
        </li>
        <li className="p-4">
          <Link to="/report">Report</Link>
        </li>
        <li className="p-4">
          <Link to="/report-list">ReportList</Link>
        </li>
        <li className="p-4">
          <Link to="/myreports">MyReports</Link>
        </li>
        <li className="p-4">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="p-4">
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-200"
          >
            Logout
          </button>
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "fixed md:hidden left-0 top-0  w-[300px] h-full border-r border-r-gray-900 bg-blue-700 z-50 ease-in-out duration-500"
            : "fixed left-[-100%] md:hidden"
        }
      >
        <img src={fixmyLogo} alt="FixMyUnesa" className="h-12 w-auto m-8" />
        <ul className="p-4">
          <li className="p-4 border-b">
            <Link to="/home" onClick={closeNav}>
              Home
            </Link>
          </li>
          <li className="p-4 border-b">
            <Link to="/report" onClick={closeNav}>
              Report
            </Link>
          </li>
          <li className="p-4 border-b">
            <Link to="/report-list" onClick={closeNav}>
              ReportList
            </Link>
          </li>
          <li className="p-4 border-b">
            <Link to="/myreports" onClick={closeNav}>
              MyReports
            </Link>
          </li>
          <li className="p-4 border-b">
            <Link to="/profile" onClick={closeNav}>
              Profile
            </Link>
          </li>
          <li className="p-4 border-b">
            <button
              onClick={() => {
                handleLogout();
                closeNav();
              }}
              className="text-white hover:text-gray-200"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <ModalConfirm
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
        title="Konfirmasi Logout"
        message="Apakah Anda yakin ingin keluar dari akun Anda?"
        confirmText="Ya, Logout"
      />
    </div>
  );
};

export default Navbar;
