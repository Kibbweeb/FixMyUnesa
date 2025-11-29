import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    nim: "",
    fakultas: "",
    prodi: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Loading...");

    if (form.password !== form.confirmPassword) {
      setMessage("Password tidak sama!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Gagal register");
        return;
      }

      setMessage("Registrasi berhasil!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage("Gagal terhubung ke server");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      {/* KOTAK FORM */}
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">
        {/* ICON BULAT */}
        <div className="flex justify-center mb-4"></div>

        <h1 className="text-2xl font-bold text-center mb-2">Buat Akun Baru</h1>
        <p className="text-center text-gray-500 mb-6">
          Daftar untuk mulai melaporkan masalah kampus
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAMA */}
          <div>
            <label className="text-sm font-medium">Nama Lengkap</label>
            <div className="flex items-center gap-2 border p-3 rounded-xl mt-1">
              <FiUser className="text-gray-500" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full outline-none"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="flex items-center gap-2 border p-3 rounded-xl mt-1">
              <FiMail className="text-gray-500" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full outline-none"
                placeholder="email@student.unesa.ac.id"
              />
            </div>
          </div>

          {/* NIM */}
          <div>
            <label className="text-sm font-medium">NIM</label>
            <input
              type="text"
              name="nim"
              value={form.nim}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
              placeholder="220123456789"
            />
          </div>

          {/* FAKULTAS */}
          <div>
            <label className="text-sm font-medium">Fakultas</label>
            <input
              type="text"
              name="fakultas"
              value={form.fakultas}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
              placeholder="Fakultas Teknik"
            />
          </div>

          {/* PRODI */}
          <div>
            <label className="text-sm font-medium">Program Studi</label>
            <input
              type="text"
              name="prodi"
              value={form.prodi}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
              placeholder="Teknik Informatika"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="flex items-center gap-2 border p-3 rounded-xl mt-1">
              <FiLock className="text-gray-500" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full outline-none"
                placeholder="********"
              />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm font-medium">Konfirmasi Password</label>
            <div className="flex items-center gap-2 border p-3 rounded-xl mt-1">
              <FiLock className="text-gray-500" />
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full outline-none"
                placeholder="********"
              />
            </div>
          </div>

          {/* TOMBOL DAFTAR */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl mt-3 hover:bg-blue-700 duration-200"
          >
            Daftar Sekarang
          </button>
        </form>

        {/* PESAN */}
        {message && (
          <p className="text-center mt-4 text-blue-600 font-medium">
            {message}
          </p>
        )}

        {/* LINK LOGIN */}
        <p className="text-center mt-4">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

        {/* KEMBALI KE BERANDA */}
        <p className="text-center mt-4">
          <Link to="/" className="text-gray-600 hover:underline">
            ← Kembali ke Beranda
          </Link>
        </p>
      </div>
    </div>
  );
}
