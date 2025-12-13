import React, { useState } from "react";
import { FiUser, FiMail, FiBook, FiEdit2, FiSave, FiX } from "react-icons/fi";
import Alert from "../../components/Alert";

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    nim: user.nim || "",
    nip: user.nip || "",
    faculty: user.faculty || "",
    department: user.department || "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Simpan perubahan
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("fixmyunesa_user", JSON.stringify(updatedUser));
    setIsEditing(false);
    setSuccessMessage("Profile berhasil diperbarui!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      nim: user.nim || "",
      nip: user.nip || "",
      faculty: user.faculty || "",
      department: user.department || "",
    });
    setIsEditing(false);
  };

  const isAdmin = user.role === "admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Profile Saya
          </h1>
          <p className="text-gray-600 text-lg">Kelola informasi akun Anda</p>
        </div>

        {successMessage && <Alert type="success" message={successMessage} />}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
                <FiUser className="w-12 h-12 text-blue-600" />
              </div>
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
                <p className="text-blue-100 text-lg">
                  {isAdmin ? "Administrator" : "Mahasiswa"}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Informasi Akun
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md"
                >
                  <FiEdit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-md"
                  >
                    <FiSave className="w-4 h-4" />
                    <span>Simpan</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl transition-all duration-200 ${
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        : "border-gray-200 bg-gray-50 cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl transition-all duration-200 ${
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        : "border-gray-200 bg-gray-50 cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>

              {/* NIM/NIP */}
              {!isAdmin ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        : "border-gray-200 bg-gray-50 cursor-not-allowed"
                    }`}
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    NIP
                  </label>
                  <input
                    type="text"
                    name="nip"
                    value={formData.nip}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        : "border-gray-200 bg-gray-50 cursor-not-allowed"
                    }`}
                  />
                </div>
              )}

              {/* Faculty */}
              {!isAdmin && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fakultas
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiBook className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="faculty"
                        value={formData.faculty}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-11 pr-4 py-3 border rounded-xl transition-all duration-200 ${
                          isEditing
                            ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            : "border-gray-200 bg-gray-50 cursor-not-allowed"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Program Studi
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                        isEditing
                          ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          : "border-gray-200 bg-gray-50 cursor-not-allowed"
                      }`}
                    />
                  </div>
                </>
              )}

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <span className="font-semibold text-gray-900">
                    {isAdmin ? "Administrator" : "Mahasiswa"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
