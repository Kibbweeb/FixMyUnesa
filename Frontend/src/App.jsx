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
  const role = localStorage.getItem("fixmyunesa_role");

  const handleLogin = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.error || "Login gagal",
        };
      }

      const userData = data.data;

      console.log("Login successful, token:", userData.token);

      localStorage.setItem("fixmyunesa_token", userData.token);
      localStorage.setItem("fixmyunesa_role", userData.role);
      localStorage.setItem(
        "fixmyunesa_user",
        JSON.stringify({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
        })
      );

      return {
        success: true,
        role: userData.role,
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Terjadi kesalahan server",
      };
    }
  };

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
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
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
