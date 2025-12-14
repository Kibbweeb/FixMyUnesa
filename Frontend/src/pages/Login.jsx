import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await onLogin(formData);

      if (result.success) {
        if (result.role === "admin") {
          navigate("/admin/managereports");
        } else {
          navigate("/home");
        }
      } else {
        setError(result.message || "Email atau password salah");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">
            Login
          </h2>
          <p className="text-gray-600 font-semibold">Masukkan email dan password akun Anda</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@unesa.ac.id"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-6 text-sm">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Daftar di sini
            </Link>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-bold">
            ← Kembali ke Landing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
