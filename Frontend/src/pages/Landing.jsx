import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {
  FiCheckCircle,
  FiBell,
  FiTrendingUp,
  FiUsers,
  FiEdit3, 
  FiCheckSquare, 
  FiTool,
  FiMessageCircle,
  FiAward,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import fixmyLogo from "../assets/LOGO.png";
import kampusImage from "../assets/kampus.webp";

const Landing = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };

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
<nav className="fixed top-0 left-0 w-full z-50 bg-white text-gray-600 font-bold border-b">
  <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
    {/* Logo */}
    <img src={fixmyLogo} alt="FixMyUnesa" className="h-24 w-auto" />
    
    {/* Menu - Desktop */}
    <ul className="hidden md:flex w-full justify-end items-center gap-4 mr-4">
      <li className="p-4">
        <a href="#" className="hover:text-blue-500 transition">Home</a>
      </li>
      <li className="p-4">
        <a href="#alur" className="hover:text-blue-500 transition">Alur</a>
      </li>
      <li className="p-4">
        <a href="#fitur" className="hover:text-blue-500 transition">Fitur</a>
      </li>
      <li className="p-4">
        <a href="#tentang" className="hover:text-blue-500 transition">Tentang</a>
      </li>
      <li className="p-4">
        <a href="#faq" className="hover:text-blue-500 transition">FAQ</a>
      </li>
      <li className="p-4">
        <a href="#kontak" className="hover:text-blue-500 transition">Kontak</a>
      </li>
      <li className="p-4">
        <Link
          to="/login"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition items-center"
        >
          Masuk
        </Link>
      </li>
      <li className="p-4">
        <Link
          to="/register"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition flex justify-end items-center"
        >
          Daftar
        </Link>
      </li>
    </ul>

    {/* Hamburger Button - Mobile */}
    <div onClick={handleNav} className="block md:hidden mr-6">
      {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
    </div>
  </div>

  {/* Mobile Menu */}
  <div
    className={
      nav
        ? "md:hidden left-0 top-24 w-[300px] border-r border-r-gray-200 bg-white z-50 ease-in-out duration-500"
        : "fixed left-[-100%] md:hidden"
    }
    style={nav ? { position: "fixed", zIndex: 10000 } : {}}
  >
    <ul className="p-4">
      <li className="p-4 border-b">
        <a href="#" onClick={closeNav} className="hover:text-blue-500">Home</a>
      </li>
      <li className="p-4 border-b">
        <a href="#alur" onClick={closeNav} className="hover:text-blue-500">Alur</a>
      </li>
      <li className="p-4 border-b">
        <a href="#fitur" onClick={closeNav} className="hover:text-blue-500">Fitur</a>
      </li>
      <li className="p-4 border-b">
        <a href="#tentang" onClick={closeNav} className="hover:text-blue-500">Tentang</a>
      </li>
      <li className="p-4 border-b">
        <a href="#faq" onClick={closeNav} className="hover:text-blue-500">FAQ</a>
      </li>
      <li className="p-4 border-b">
        <a href="#kontak" onClick={closeNav} className="hover:text-blue-500">Kontak</a>
      </li>
      <li className="p-4 border-b">
        <Link
          to="/login"
          onClick={closeNav}
          className="block px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-center"
        >
          Masuk
        </Link>
      </li>
      <li className="p-4">
        <Link
          to="/register"
          onClick={closeNav}
          className="block px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition text-center"
        >
          Daftar
        </Link>
      </li>
    </ul>
  </div>
</nav>



      {/* ================= HERO ================= */}
      <section className="relative min-h-screen pt-36 overflow-hidden bg-cover bg-center text-white flex items-center" style={{backgroundImage: `url(${kampusImage})`}}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center z-10 w-full py-20">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8">
            FixMyUnesa
          </h1>

          <p className="text-lg md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed mb-12">
            FixMyUnesa adalah platform pelaporan digital yang dirancang untuk
            memfasilitasi pelaporan keluhan, aspirasi, dan masalah infrakstruktur di lingkungan kampus secara terstruktur, transparan,
            dan berkelanjutan untuk membantu civitas akademika Universitas Negeri Surabaya.
          </p>

          <Link
            to="/register"
            className="inline-block px-12 py-4 bg-white text-blue-500 rounded-xl font-bold text-lg shadow-xl hover:scale-110 transition"
          >
            Mulai Sekarang
          </Link>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="fitur" className="min-h-screen py-24 bg-gray-50 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
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
                  <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
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
      
{/* ================= HOW IT WORKS ================= */}
<section id="alur" className="min-h-screen py-24 bg-white flex items-center">
  <div className="max-w-7xl mx-auto px-6 w-full">
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
                       bg-blue-500 backdrop-blur-md
                       shadow-lg hover:shadow-2xl 
                       hover:-translate-y-2 transition duration-300"
          >
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full 
                            bg-white text-blue-500 
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
      <section id="tentang" className="min-h-screen py-24 bg-blue-700 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <h2 className="text-4xl font-bold text-center mb-16">
            Tentang FixMyUnesa
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="bg-blue-600 p-8 rounded-2xl backdrop-blur-md hover:bg-white/20 transition">
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
                  <FiAward className="text-yellow-400" />
                  Visi Kami
                </h3>
                <p className="text-white leading-relaxed">
                  Menciptakan kampus yang lebih nyaman dan aman melalui kolaborasi aktif antara mahasiswa, dosen, dan tenaga kependidikan.
                </p>
              </div>

              <div className="bg-blue-600 p-8 rounded-2xl backdrop-blur-md hover:bg-white/20 transition">
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
                  <FiCheckCircle className="text-green-400" />
                  Misi Kami
                </h3>
                <p className="text-white leading-relaxed">
                  Menyediakan platform pelaporan yang mudah, transparan, dan efisien untuk memastikan semua masalah fasilitas kampus ditangani dengan cepat.
                </p>
              </div>
            </div>

            <div className="bg-blue-600 p-12 rounded-3xl backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-8">Keunggulan FixMyUnesa</h3>
              <ul className="space-y-4">
                {[
                  "Interface yang user-friendly dan intuitif",
                  "Real-time tracking status laporan",
                  "Verifikasi otomatis untuk keamanan data",
                  "Kategorisasi laporan yang terstruktur",
                  "Laporan terintegrasi dengan unit terkait",
                  "Akses 24/7 untuk semua pengguna"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FiCheckCircle className="text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-white">{item}</span>
                  </div>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {["Mahasiswa", "Dosen", "Tenaga Kependidikan"].map((role, i) => (
              <div
                key={i}
                className="bg-blue-600 p-8 rounded-2xl backdrop-blur-md hover:bg-white/20 transition"
              >
                <h3 className="text-2xl font-bold mb-3">{role}</h3>
                <p className="text-white leading-relaxed">
                  Berperan aktif dalam menjaga kenyamanan, keamanan, dan kualitas
                  fasilitas kampus UNESA.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="min-h-screen py-24 bg-gray-50 flex items-center">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <h2 className="text-4xl font-bold text-center mb-16">
            Pertanyaan Umum (FAQ)
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Bagaimana cara saya membuat laporan?",
                a: "Cukup login ke akun Anda, klik tombol 'Buat Laporan', isi detail masalah dengan lengkap termasuk foto, lokasi, dan kategori. Laporan akan langsung terkirim ke sistem kami."
              },
              {
                q: "Apakah data saya aman?",
                a: "Ya, kami menggunakan enkripsi tingkat enterprise dan sistem keamanan berlapis untuk melindungi semua data pengguna sesuai standar internasional."
              },
              {
                q: "Berapa lama waktu untuk laporan ditindaklanjuti?",
                a: "Laporan diverifikasi dalam 24 jam dan ditindaklanjuti oleh unit terkait dalam waktu maksimal 3-7 hari kerja tergantung tingkat keparahan."
              },
              {
                q: "Bisakah saya melacak status laporan saya?",
                a: "Tentu saja! Anda dapat melihat status laporan secara real-time di halaman 'Laporan Saya' dengan update yang selalu terbaru."
              },
              {
                q: "Apakah ada biaya untuk menggunakan layanan ini?",
                a: "Tidak ada! FixMyUnesa adalah layanan gratis untuk semua civitas akademika Universitas Negeri Surabaya."
              },
              {
                q: "Apa yang harus saya lakukan jika laporan saya tidak ditanggapi?",
                a: "Jika laporan Anda tidak mendapat tanggapan dalam waktu yang wajar, Anda dapat menghubungi tim support kami melalui kontak yang tersedia."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="flex items-start gap-4">
                  <FiMessageCircle className="text-blue-600 flex-shrink-0 text-xl mt-1" />
                  <div className="w-full">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.q}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="kontak" className="min-h-screen py-24 bg-blue-700 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <h2 className="text-4xl font-bold text-center mb-16">
            Hubungi Kami
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="bg-blue-600 p-8 rounded-2xl backdrop-blur-md hover:bg-white/20 transition text-center">
              <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
                <FiPhone className="text-cyan-400 text-3xl" />
              </h3>
              <h4 className="text-xl font-bold mb-3">Telepon</h4>
              <p className="text-white text-lg">
                +62 31 XXXX XXXX
              </p>
              <p className="text-white text-sm mt-3">Senin - Jumat: 08:00 - 17:00 WIB</p>
            </div>

            <div className="bg-blue-600 p-8 rounded-2xl backdrop-blur-md hover:bg-white/20 transition text-center">
              <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
                <FiMail className="text-pink-400 text-3xl" />
              </h3>
              <h4 className="text-xl font-bold mb-3">Email</h4>
              <p className="text-white text-lg">
                support@fixmyunesa.ac.id
              </p>
              <p className="text-white text-sm mt-3">Respon dalam 24 jam</p>
            </div>

            <div className="bg-blue-600 p-8 rounded-2xl backdrop-blur-md hover:bg-white/20 transition text-center">
              <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
                <FiMapPin className="text-red-400 text-3xl" />
              </h3>
              <h4 className="text-xl font-bold mb-3">Lokasi</h4>
              <p className="text-white text-lg">
                Universitas Negeri Surabaya
              </p>
              <p className="text-white text-sm mt-3">Jawa Timur, Indonesia</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-blue-700 text-white py-10 text-center">
        <p className="text-white text-sm">
          © 2025 FixMyUnesa — Sistem Pelaporan Fasilitas Kampus UNESA
        </p>
      </footer>
    </div>
  );
};

export default Landing;
