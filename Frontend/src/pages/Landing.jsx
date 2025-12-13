import React from "react";
import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiBell,
  FiTrendingUp,
  FiUsers,
  FiEdit3, 
  FiCheckSquare, 
  FiTool,
} from "react-icons/fi";

const Landing = () => {
  const features = [
    {
      icon: FiCheckCircle,
      title: "Pelaporan Mudah",
      desc: "Laporkan kerusakan fasilitas kampus hanya dalam beberapa langkah sederhana tanpa proses rumit.",
    },
    {
      icon: FiBell,
      title: "Pemantauan Status",
      desc: "Pantau perkembangan laporan Anda secara real-time dan transparan.",
    },
    {
      icon: FiTrendingUp,
      title: "Tindak Lanjut Cepat",
      desc: "Laporan diverifikasi dan ditindaklanjuti oleh tim terkait secara sistematis.",
    },
    {
      icon: FiUsers,
      title: "Kolaboratif",
      desc: "Mahasiswa, dosen, dan tenaga kependidikan bersama menjaga kualitas fasilitas.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
     {/* ================= NAVBAR ================= */}
<nav className="fixed top-0 left-0 w-full z-50 bg-blue-900/95 backdrop-blur-md shadow-lg">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    {/* Logo */}
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-lg bg-[#D4AF37] flex items-center justify-center 
                      font-extrabold text-blue-900">
        U
      </div>
      <span className="text-xl font-extrabold text-white tracking-wide">
        FixMyUnesa
      </span>
    </div>

    {/* Menu */}
    <div className="flex items-center gap-5">
      <Link
        to="/login"
        className="text-[#D4AF37] font-semibold hover:text-[#F5D76E] transition"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="px-6 py-2 bg-[#D4AF37] text-blue-900 rounded-lg font-bold
                   shadow hover:bg-[#F5D76E] hover:scale-105 transition"
      >
        Daftar
      </Link>
    </div>

  </div>
</nav>



      {/* ================= HERO ================= */}
      <section className="relative pt-36 pb-32 overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        {/* Decorative blobs */}
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 -right-32 w-[420px] h-[420px] bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8">
            FixMyUnesa
          </h1>

          <p className="text-lg md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
            FixMyUnesa adalah platform pelaporan digital yang dirancang untuk
            membantu civitas akademika Universitas Negeri Surabaya dalam
            melaporkan, memantau, dan memastikan tindak lanjut atas kerusakan
            maupun permasalahan fasilitas kampus secara terstruktur, transparan,
            dan berkelanjutan.
          </p>

          <Link
            to="/register"
            className="inline-block px-12 py-4 bg-white text-blue-900 rounded-xl font-bold text-lg shadow-xl hover:scale-110 transition"
          >
            Mulai Sekarang
          </Link>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Fitur Unggulan
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition"
                >
                  <div className="w-14 h-14 bg-blue-900 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
{/* ================= STATISTICS ================= */}
<section className="py-24 bg-gradient-to-r from-blue-800 to-blue-900 text-white relative overflow-hidden">
  {/* Decorative glow */}
  <div className="absolute inset-0 bg-blue-500/10 blur-3xl"></div>

  <div className="relative max-w-7xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-16">
      Dampak FixMyUnesa
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
      {[
        { value: "500+", label: "Total Laporan" },
        { value: "1.000+", label: "Pengguna Aktif" },
        { value: "95%", label: "Laporan Terselesaikan" },
        { value: "24/7", label: "Monitoring Sistem" },
      ].map((stat, i) => (
        <div
          key={i}
          className="bg-white/10 rounded-2xl p-8 backdrop-blur-md
                     hover:scale-105 transition duration-300"
        >
          <div className="text-5xl font-extrabold mb-2">
            {stat.value}
          </div>
          <div className="text-blue-200 text-lg font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


{/* ================= HOW IT WORKS ================= */}
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-16">
      Alur Sistem Pelaporan
    </h2>

    <div className="grid md:grid-cols-3 gap-10">
      {[
        {
          icon: FiEdit3,
          text: "Pengguna mengirim laporan disertai lokasi dan dokumentasi secara lengkap dan akurat.",
        },
        {
          icon: FiCheckSquare,
          text: "Laporan diverifikasi dan diproses oleh unit terkait sesuai kategori permasalahan.",
        },
        {
          icon: FiTool,
          text: "Fasilitas diperbaiki dan status laporan diperbarui hingga selesai.",
        },
      ].map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            className="text-center p-10 rounded-2xl 
                       bg-blue-900/95 backdrop-blur-md
                       shadow-lg hover:shadow-2xl 
                       hover:-translate-y-2 transition duration-300"
          >
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full 
                            bg-white text-blue-900 
                            flex items-center justify-center shadow-md">
              <Icon className="text-3xl" />
            </div>

            {/* Step */}
            <div className="text-sm font-semibold text-blue-200 mb-3">
              Langkah {i + 1}
            </div>

            {/* Description */}
            <p className="text-blue-100 leading-relaxed">
              {item.text}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</section>



      {/* ================= TARGET USER ================= */}
      <section className="py-24 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Digunakan Oleh
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {["Mahasiswa", "Dosen", "Tenaga Kependidikan"].map((role, i) => (
              <div
                key={i}
                className="bg-white/10 p-8 rounded-2xl backdrop-blur-md hover:bg-white/20 transition"
              >
                <h3 className="text-2xl font-bold mb-3">{role}</h3>
                <p className="text-blue-100 leading-relaxed">
                  Berperan aktif dalam menjaga kenyamanan, keamanan, dan kualitas
                  fasilitas kampus UNESA.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-blue-900 text-white rounded-3xl p-14 text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">
              Satu Laporan, Dampak Nyata
            </h2>
            <p className="text-blue-200 mb-8 text-lg">
              Kontribusi Anda membantu menciptakan lingkungan kampus yang lebih
              nyaman dan berkualitas.
            </p>
            <Link
              to="/register"
              className="inline-block px-12 py-4 bg-white text-blue-900 rounded-xl font-bold hover:scale-105 transition"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-blue-900 text-white py-10 text-center">
        <p className="text-blue-200 text-sm">
          © 2025 FixMyUnesa — Sistem Pelaporan Fasilitas Kampus UNESA
        </p>
      </footer>
    </div>
  );
};

export default Landing;
