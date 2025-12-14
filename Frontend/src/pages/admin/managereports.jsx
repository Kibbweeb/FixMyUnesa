import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiFilter,
  FiSearch,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiFileText,
} from "react-icons/fi";
import { TbReport } from "react-icons/tb";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ManageReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalReports: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  const loadReports = useCallback(async () => {
    const token = localStorage.getItem("fixmyunesa_token");

    if (!token) {
      navigate("/login");
      return;
    }

    const response = await fetch("http://localhost:8080/api/admin/reports", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      localStorage.removeItem("fixmyunesa_token");
      navigate("/login");
      return;
    }

    const result = await response.json();
    const allReports = result.data || [];
    setReports(allReports);

    const newStats = {
      totalReports: allReports.length,
      pending: allReports.filter(
        (r) => r.status === "pending" || r.status === "menunggu"
      ).length,
      inProgress: allReports.filter(
        (r) => r.status === "in_progress" || r.status === "diproses"
      ).length,
      resolved: allReports.filter(
        (r) => r.status === "resolved" || r.status === "selesai"
      ).length,
    };
    setStats(newStats);
  }, [navigate]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const statsData = [
    {
      icon: FiFileText,
      label: "Total Laporan",
      value: stats.totalReports,
      color: "blue",
    },
    { icon: FiClock, label: "Pending", value: stats.pending, color: "red" },
    {
      icon: FiAlertCircle,
      label: "In Progress",
      value: stats.inProgress,
      color: "yellow",
    },
    {
      icon: FiCheckCircle,
      label: "Resolved",
      value: stats.resolved,
      color: "green",
    },
  ];

  const categories = [
    "Fasilitas",
    "Elektronik",
    "Sanitasi",
    "Listrik",
    "Kebersihan",
    "Keamanan",
    "Lainnya",
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
      case "menunggu":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in_progress":
      case "proses":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "resolved":
      case "selesai":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
      case "menunggu":
        return "Menunggu";
      case "in_progress":
      case "proses":
        return "Proses";
      case "resolved":
      case "selesai":
        return "Selesai";
      default:
        return status;
    }
  };

  const handleStatusChange = async (reportId, newStatus) => {
    const token = localStorage.getItem("fixmyunesa_token");

    let dbStatus = newStatus;
    if (newStatus === "pending") dbStatus = "menunggu";
    if (newStatus === "in_progress") dbStatus = "proses";
    if (newStatus === "resolved") dbStatus = "selesai";

    const response = await fetch(
      `http://localhost:8080/api/admin/report/${reportId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: dbStatus }),
      }
    );

    if (!response.ok) {
      alert("Gagal mengubah status");
      return;
    }

    loadReports();
  };

  const filteredReports = reports.filter((report) => {
    const rStatus = report.status || "";
    const rCategory = report.category || "";
    const rTitle = report.title || "";
    const rDesc = report.description || "";
    const rLoc = report.location || "";
    const rCreatedBy = report.user ? report.user.name : report.createdBy || "";

    let targetFilter = filterStatus;
    if (filterStatus === "pending") targetFilter = "menunggu";
    if (filterStatus === "in_progress") targetFilter = "proses";
    if (filterStatus === "resolved") targetFilter = "selesai";

    const matchesStatus =
      filterStatus === "all" ||
      rStatus === targetFilter ||
      rStatus === filterStatus;
    const matchesCategory =
      filterCategory === "all" || rCategory === filterCategory;
    const matchesSearch =
      rTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rLoc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rCreatedBy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const COLORS = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
  ];

  const prepareCategoryChartData = () => {
    const categoryData = categories
      .map((cat) => ({
        name: cat,
        value: reports.filter((r) => r.category === cat).length,
      }))
      .filter((item) => item.value > 0); // Only show categories with reports
    return categoryData;
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Kelola Laporan
          </h1>
          <p className="text-gray-600 text-lg">
            Dashboard admin untuk mengelola semua laporan
          </p>
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Distribusi Laporan Berdasarkan Kategori
          </h2>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={prepareCategoryChartData()}
                  cx="50%"
                  cy="40%"
                  labelLine={false}
                  label={({ name, value, percent }) =>
                    `${name} (${value}) ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {prepareCategoryChartData().map((entry, index) => {
                    const categoryIndex = categories.indexOf(entry.name);
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[categoryIndex % COLORS.length]}
                      />
                    );
                  })}
                </Pie>
                <Tooltip formatter={(value) => `${value} laporan`} />
                <Legend verticalAlign="bottom" height={46} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
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
                    className={`w-14 h-14 bg-${stat.color}-500 rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid md:grid-cols-3 gap-4">
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
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="all">Semua Status</option>
                <option value="pending">Menunggu</option>
                <option value="in_progress">Proses</option>
                <option value="resolved">Selesai</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="all">Semua Kategori</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan{" "}
            <span className="font-bold text-blue-600">
              {filteredReports.length}
            </span>{" "}
            dari <span className="font-bold">{reports.length}</span> laporan
          </p>
        </div>

        {/* Reports List */}
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Tidak Ada Laporan
            </h3>
            <p className="text-gray-600">
              Belum ada laporan yang perlu dikelola
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                  {/* Image */}
                  <div className="w-full md:w-48 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl overflow-hidden flex-shrink-0 mb-4 md:mb-0">
                    {report.pict_path ? (
                      <img
                        src={`http://localhost:8080/${report.pict_path}`}
                        alt={report.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <TbReport className="text-white text-5xl opacity-50" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {report.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Dilaporkan oleh{" "}
                          {report.user ? report.user.name : "Unknown"}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{report.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-500 block mb-1">
                          Kategori
                        </span>
                        <span className="font-semibold text-gray-900">
                          {report.category}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-1">
                          Prioritas
                        </span>
                        <span className="font-semibold text-gray-900">
                          {report.priority?.toUpperCase() || "MEDIUM"}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-1">Lokasi</span>
                        <span className="font-semibold text-gray-900">
                          {report.location}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-1">
                          Tanggal
                        </span>
                        <span className="font-semibold text-gray-900">
                          {new Date(report.created_at || report.createdAt).toLocaleDateString(
                            "id-ID"
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Status Update */}
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-semibold text-gray-700">
                        Status:
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleStatusChange(report.id, "pending")
                          }
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            report.status === "menunggu" || report.status === "pending"
                              ? "bg-yellow-500 text-white shadow-md"
                              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          }`}
                        >
                          Menunggu
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(report.id, "in_progress")
                          }
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            report.status === "proses" || report.status === "in_progress"
                              ? "bg-blue-500 text-white shadow-md"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          }`}
                        >
                          Proses
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(report.id, "resolved")
                          }
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            report.status === "selesai" || report.status === "resolved"
                              ? "bg-green-500 text-white shadow-md"
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                          }`}
                        >
                          Selesai
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageReports;
