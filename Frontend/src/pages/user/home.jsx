import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiPlusCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { TbReport } from "react-icons/tb";

const UserHome = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalReports: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("fixmyunesa_user");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUsername(userObj.name || userObj);
      } catch {
        setUsername(storedUser);
      }
    }
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('fixmyunesa_token');
      const username = localStorage.getItem('fixmyunesa_user');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:8080/api/user/my-reports', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('fixmyunesa_token');
        localStorage.removeItem('fixmyunesa_user');
        localStorage.removeItem('fixmyunesa_role');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Gagal memuat laporan');
      }

      const result = await response.json();
      const allReports = result.data || [];
      setReports(allReports);

      // Calculate stats
      const newStats = {
        totalReports: allReports.length,
        pending: allReports.filter((r) => r.status === "pending" || r.status === "menunggu").length,
        inProgress: allReports.filter((r) => r.status === "in_progress" || r.status === "diproses").length,
        resolved: allReports.filter((r) => r.status === "resolved" || r.status === "selesai").length,
      };
      setStats(newStats);
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Tidak dapat terhubung ke server. Pastikan backend berjalan.');
      } else {
        setError(err.message || 'Terjadi kesalahan saat memuat laporan');
      }
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    {
      icon: FiFileText,
      label: "Total Laporan",
      value: stats.totalReports,
      color: "blue",
    },
    { icon: FiClock, label: "Pending", value: stats.pending, color: "yellow" },
    {
      icon: FiAlertCircle,
      label: "In Progress",
      value: stats.inProgress,
      color: "orange",
    },
    {
      icon: FiCheckCircle,
      label: "Resolved",
      value: stats.resolved,
      color: "green",
    },
  ];

  const colorClasses = {
    blue: "from-blue-500 to-blue-700",
    yellow: "from-yellow-500 to-yellow-700",
    orange: "from-orange-500 to-orange-700",
    green: "from-green-500 to-green-700",
  };

  const recentReports = reports.slice(0, 3);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
      case "menunggu":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
      case "diproses":
        return "bg-blue-100 text-blue-800";
      case "resolved":
      case "selesai":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
      case "menunggu":
        return "Menunggu";
      case "in_progress":
      case "diproses":
        return "Diproses";
      case "resolved":
      case "selesai":
        return "Selesai";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Selamat Datang, {username}</h1>
          <p className="text-gray-600 text-lg">Selamat datang di FixMyUnesa</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100 mb-8">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Memuat data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-200 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FiAlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Terjadi Kesalahan</h3>
                  <p className="text-gray-600 text-sm">{error}</p>
                </div>
              </div>
              <button
                onClick={loadReports}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                <FiRefreshCw className="w-4 h-4" />
                <span>Coba Lagi</span>
              </button>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${
                      colorClasses[stat.color]
                    } rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/report"
            className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <FiPlusCircle className="w-8 h-8 text-white" />
              </div>
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-1">Buat Laporan Baru</h3>
                <p className="text-blue-100">
                  Laporkan masalah fasilitas kampus
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/myreports"
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <FiFileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  Laporan Saya
                </h3>
                <p className="text-gray-600">Lihat semua laporan Anda</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Laporan Terbaru
            </h2>
            <Link
              to="/myreports"
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Lihat Semua →
            </Link>
          </div>

          {recentReports.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPlusCircle className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Belum Ada Laporan
              </h3>
              <p className="text-gray-600 mb-6">
                Mulai buat laporan untuk melaporkan masalah di kampus
              </p>
              <Link
                to="/create-report"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <FiPlusCircle className="w-5 h-5" />
                <span>Buat Laporan Pertama</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 hover:border-blue-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {report.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            report.status
                          )}`}
                        >
                          {getStatusLabel(report.status)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {report.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="font-medium">{report.location}</span>
                        <span>•</span>
                        <span>{report.category}</span>
                        <span>•</span>
                        <span>
                          {new Date(report.created_at).toLocaleDateString(
                            "id-ID"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
