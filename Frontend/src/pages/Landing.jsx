import React from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiBell, FiTrendingUp, FiUsers } from "react-icons/fi";

const Landing = () => {
  const features = [
    {
      icon: FiCheckCircle,
      title: "Lapor Masalah",
      description:
        "Laporkan kerusakan atau masalah fasilitas kampus dengan mudah dan cepat.",
    },
    {
      icon: FiBell,
      title: "Tracking Real-time",
      description:
        "Pantau status laporan Anda secara real-time dan dapatkan notifikasi update.",
    },
    {
      icon: FiTrendingUp,
      title: "Respon Cepat",
      description:
        "Tim kami akan segera menindaklanjuti setiap laporan yang masuk.",
    },
    {
      icon: FiUsers,
      title: "Kolaborasi",
      description:
        "Bersama-sama menciptakan kampus yang lebih baik untuk semua.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-400/10 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-8"></div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-700 leading-tight">
              FixMyUnesa
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Platform pelaporan masalah dan kerusakan fasilitas kampus UNESA
              yang mudah, cepat, dan transparan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
              >
                Mulai Sekarang
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-blue-600 text-lg"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Fitur Unggulan
          </h2>
          <p className="text-xl text-gray-600">
            Kemudahan dalam melaporkan dan mengelola masalah fasilitas kampus
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Laporan" },
              { number: "1000+", label: "Pengguna" },
              { number: "95%", label: "Terselesaikan" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Untuk Memulai?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan mahasiswa lainnya dalam menciptakan
            kampus yang lebih baik.
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-white text-blue-600 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4"></div>
            <h3 className="text-2xl font-bold mb-2">FixMyUnesa</h3>
            <p className="mb-6">
              Bersama membangun kampus yang lebih baik
            </p>
            <p className="text-sm">
              © 2025 FixMyUnesa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
