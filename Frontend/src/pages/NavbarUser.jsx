import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import fixmyLogo from "../assets/LOGO.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);
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

  return (
    <div
      className="w-full flex justify-between items-center bg-white text-gray-600 font-bold border-b"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}
    >
      <img src={fixmyLogo} alt="FixMyUnesa" className="h-24 w-auto ml-10" />
      <ul className="hidden md:flex w-full justify-end mr-4">
        <li className="p-4">
          <Link to="/home">Home</Link>
        </li>
        <li className="p-4">
          <Link to="/report">Report</Link>
        </li>
        <li className="p-4">
          <Link to="/myreports">MyReports</Link>
        </li>
        <li className="p-4">
          <Link
            to="/profile"
            className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          >
            <FiUser className="w-4 h-4 text-gray-600" />
          </Link>
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "md:hidden left-0 top-0  w-[300px] h-full border-r border-r-gray-200 bg-white z-50 ease-in-out duration-500"
            : "fixed left-[-100%] md:hidden"
        }
        style={nav ? { position: "fixed", zIndex: 10000 } : {}}
      >
        <img src={fixmyLogo} alt="FixMyUnesa" className="h-24 w-auto m-8" />
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
            <Link to="/myreports" onClick={closeNav}>
              MyReports
            </Link>
          </li>
          <li className="p-4 border-b">
            <Link
              to="/profile"
              onClick={closeNav}
              className="flex items-center space-x-2"
            >
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <FiUser className="w-4 h-4 text-gray-600" />
              </div>
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
