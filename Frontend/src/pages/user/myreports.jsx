import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPlusCircle,
  FiFilter,
  FiSearch,
  FiAlertCircle,
  FiRefreshCw,
  FiTrash2,
} from "react-icons/fi";
import { TbReport } from "react-icons/tb";
import ModalConfirm from "../../components/ModalConfirm";
import Alert from "../../components/Alert";

const MyReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteReportData, setDeleteReportData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("fixmyunesa_token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/user/my-reports",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("fixmyunesa_token");
        localStorage.removeItem("fixmyunesa_user");
        localStorage.removeItem("fixmyunesa_role");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Gagal memuat laporan");
      }

      const result = await response.json();
      setReports(result.data || []);
    } catch (err) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError("Tidak dapat terhubung ke server. Pastikan backend berjalan.");
      } else {
        setError(err.message || "Terjadi kesalahan saat memuat laporan");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reportId, reportTitle) => {
    setDeleteReportData({ id: reportId, title: reportTitle });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    const { id, title } = deleteReportData;
    setShowDeleteConfirm(false);
    setDeleteReportData(null);

    try {
      const token = localStorage.getItem("fixmyunesa_token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/user/report/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("fixmyunesa_token");
        localStorage.removeItem("fixmyunesa_user");
        localStorage.removeItem("fixmyunesa_role");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Gagal menghapus laporan");
      }

      // Refresh list setelah delete
      await loadReports();
      setSuccessMessage("Laporan berhasil dihapus!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      alert(err.message || "Terjadi kesalahan saat menghapus laporan");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in_progress":
        return "In Progress";
      case "resolved":
        return "Resolved";
      default:
        return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-orange-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesStatus =
      filterStatus === "all" || report.status === filterStatus;
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Memuat laporan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <FiAlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Terjadi Kesalahan
            </h3>
            <p className="text-gray-600 text-center mb-6">{error}</p>
            <button
              onClick={loadReports}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
            >
              <FiRefreshCw className="w-5 h-5" />
              <span>Coba Lagi</span>
            </button>
            <Link
              to="/home"
              className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Kembali ke Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-black mb-2">
              Laporan Saya
            </h1>
            <p className="text-gray-600 font-semibold text-lg">
              Kelola semua laporan yang Anda buat
            </p>
          </div>
          <Link
            to="/report"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <FiPlusCircle className="w-5 h-5" />
            <span>Buat Laporan</span>
          </Link>
        </div>

        {successMessage && <Alert type="success" message={successMessage} />}

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari laporan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FiPlusCircle className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">
              {searchTerm || filterStatus !== "all"
                ? "Tidak Ada Hasil"
                : "Belum Ada Laporan"}
            </h3>
            <p className="text-gray-600 font-semibold mb-6">
              {searchTerm || filterStatus !== "all"
                ? "Tidak ada laporan yang sesuai dengan filter Anda"
                : "Mulai buat laporan untuk melaporkan masalah di kampus"}
            </p>
            {!searchTerm && filterStatus === "all" && (
              <Link
                to="/report"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <FiPlusCircle className="w-5 h-5" />
                <span>Buat Laporan Pertama</span>
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                Menampilkan{" "}
                <span className="font-semibold text-black">
                  {filteredReports.length}
                </span>{" "}
                dari <span className="font-semibold">{reports.length}</span>{" "}
                laporan
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    {report.pict_path ? (
                      <img
                        src={`http://localhost:8080/${report.pict_path}`}
                        alt={report.title}
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <TbReport className="text-white text-8xl opacity-80" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          report.status
                        )}`}
                      >
                        {getStatusLabel(report.status)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {report.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {report.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Kategori:</span>
                        <span className="font-semibold text-black">
                          {report.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Prioritas:</span>
                        <span
                          className={`font-semibold capitalize ${getPriorityColor(
                            report.priority || "medium"
                          )}`}
                        >
                          {report.priority || "medium"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Lokasi:</span>
                        <span className="font-semibold text-black">
                          {report.location}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                        <span className="text-gray-600">Dibuat:</span>
                        <span className="font-semibold text-black">
                          {new Date(report.created_at).toLocaleDateString(
                            "id-ID"
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleDelete(report.id, report.title)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 hover:shadow-lg"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        <span>Hapus Laporan</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <ModalConfirm
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setDeleteReportData(null);
        }}
        onConfirm={confirmDelete}
        title="Konfirmasi Hapus Laporan"
        message={`Apakah Anda yakin ingin menghapus laporan "${deleteReportData?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
      />
    </div>
  );
};

export default MyReports;
