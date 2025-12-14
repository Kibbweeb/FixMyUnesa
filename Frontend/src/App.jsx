import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // Tambahkan useLocation

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Login from "./pages/Login";

// User Pages
import Home from "./pages/user/home";
import Report from "./pages/user/report";
// import ReportList from "./pages/user/reportlist";
import MyReports from "./pages/user/myreports";
import Profile from "./pages/user/profile";

// Admin Pages
import ManageReports from "./pages/admin/managereports";

// Navbar
import NavbarUser from "./pages/NavbarUser";
import NavbarAdmin from "./pages/NavbarAdmin";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation(); // Tambahkan ini
  const role = localStorage.getItem("fixmyunesa_role");
  const user = JSON.parse(localStorage.getItem("fixmyunesa_user") || "{}");

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
          nim: userData.nim,
          fakultas: userData.fakultas,
          prodi: userData.prodi,
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
      {location.pathname !== "/login" && // Ganti window.location.pathname dengan location.pathname
        location.pathname !== "/register" &&
        location.pathname !== "/" && (
          <>{role === "admin" ? <NavbarAdmin /> : <NavbarUser />}</>
        )}

      <Routes>
        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Auth */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes - Protected */}
        <Route
          path="/home"
          element={
            <ProtectedRoute requiredRole="user">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute requiredRole="user">
              <Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reportlist"
          element={
            <ProtectedRoute requiredRole="user">
              {/* <ReportList /> */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/myreports"
          element={
            <ProtectedRoute requiredRole="user">
              <MyReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute requiredRole="user">
              <Profile user={user} />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes - Protected */}
        <Route
          path="/admin/managereports"
          element={
            <ProtectedRoute requiredRole="admin">
              <ManageReports />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
