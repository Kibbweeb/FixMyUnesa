import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Pages
import Home from "./pages/user/home";
import Report from "./pages/user/report";
import ReportList from "./pages/user/reportlist";
import MyReports from "./pages/user/myreports";
import Profile from "./pages/user/profile";

// Admin Pages
import ManageReports from "./pages/admin/managereports";

// Navbar
import NavbarUser from "./pages/NavbarUser";
import NavbarAdmin from "./pages/NavbarAdmin";

function App() {
  // Ambil role dari localStorage
  const role = localStorage.getItem("fixmyunesa_role"); // "user" | "admin" | null

  return (
    <div>

      {/* Navbar hanya tampil selain di halaman login/register */}
      {window.location.pathname !== "/login" &&
        window.location.pathname !== "/register" &&
        window.location.pathname !== "/" && (
          <>
            {role === "admin" ? <NavbarAdmin /> : <NavbarUser />}
          </>
        )}

      <Routes>

        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/reportlist" element={<ReportList />} />
        <Route path="/myreports" element={<MyReports />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin Routes */}
        <Route path="/admin/managereports" element={<ManageReports />} />

      </Routes>
    </div>
  );
}

export default App;
