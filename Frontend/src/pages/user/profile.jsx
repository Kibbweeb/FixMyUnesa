import React, { useState } from "react";
import { FiUser, FiEdit2, FiSave, FiX, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import ModalConfirm from "../../components/ModalConfirm";

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    nim: user.nim || "",
    fakultas: user.fakultas || "",
    prodi: user.prodi || "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("fixmyunesa_token");
    if (!token) return;

    const response = await fetch("http://localhost:8080/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    const updatedUserStorage = { ...user, ...data.data };
    localStorage.setItem("fixmyunesa_user", JSON.stringify(updatedUserStorage));

    setSuccessMessage("Profil berhasi diperbarui");
    setIsEditing(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      nim: user.nim || "",
      fakultas: user.fakultas || "",
      prodi: user.prodi || "",
    });
    setIsEditing(false);
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
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Profile Saya</h1>
          <p className="text-gray-600 font-semibold text-lg">
            Kelola informasi akun Anda
          </p>
        </div>

        {successMessage && <Alert type="success" message={successMessage} />}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Profile Header */}
          <div className="bg-blue-500 px-8 py-12">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
                <FiUser className="w-12 h-12 text-blue-500" />
              </div>
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
                <p className="text-white font-semibold text-lg">User</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-black">Informasi Akun</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md"
                >
                  <FiEdit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-md"
                  >
                    <FiSave className="w-4 h-4" />
                    <span>Simpan</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                    <span>Batal</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:border-transparent"
                      : "border-gray-200 bg-gray-50 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:border-transparent"
                      : "border-gray-200 bg-gray-50 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* NIM */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  NIM
                </label>
                <input
                  type="text"
                  name="nim"
                  value={formData.nim}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:border-transparent"
                      : "border-gray-200 bg-gray-50 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Fakultas */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Fakultas
                </label>
                <input
                  type="text"
                  name="fakultas"
                  value={formData.fakultas}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:border-transparent"
                      : "border-gray-200 bg-gray-50 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Program Studi */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Program Studi
                </label>
                <input
                  type="text"
                  name="prodi"
                  value={formData.prodi}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:border-transparent"
                      : "border-gray-200 bg-gray-50 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>

            {/* Logout Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              {/* <h3 className="text-xl font-bold text-black mb-4">
                Pengaturan Akun
              </h3> */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-5 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-md"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
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

export default Profile;
