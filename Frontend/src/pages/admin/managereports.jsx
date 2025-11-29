import React, { useState, useEffect } from 'react';
import { FiFilter, FiSearch, FiCheckCircle, FiClock, FiAlertCircle, FiFileText } from 'react-icons/fi';

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalReports: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    const savedReports = localStorage.getItem('fixmyunesa_reports');
    const allReports = savedReports ? JSON.parse(savedReports) : [];
    setReports(allReports);

    // Calculate stats
    const newStats = {
      totalReports: allReports.length,
      pending: allReports.filter(r => r.status === 'pending').length,
      inProgress: allReports.filter(r => r.status === 'in_progress').length,
      resolved: allReports.filter(r => r.status === 'resolved').length
    };
    setStats(newStats);
  };

  const statsData = [
    { icon: FiFileText, label: 'Total Laporan', value: stats.totalReports, color: 'blue' },
    { icon: FiClock, label: 'Pending', value: stats.pending, color: 'yellow' },
    { icon: FiAlertCircle, label: 'In Progress', value: stats.inProgress, color: 'orange' },
    { icon: FiCheckCircle, label: 'Resolved', value: stats.resolved, color: 'green' },
  ];

  const categories = ['Fasilitas', 'Elektronik', 'Sanitasi', 'Listrik', 'Kebersihan', 'Keamanan', 'Lainnya'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      default:
        return status;
    }
  };

  const handleStatusChange = (reportId, newStatus) => {
    const updatedReports = reports.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    );
    setReports(updatedReports);
    localStorage.setItem('fixmyunesa_reports', JSON.stringify(updatedReports));
    
    // Recalculate stats
    const newStats = {
      totalReports: updatedReports.length,
      pending: updatedReports.filter(r => r.status === 'pending').length,
      inProgress: updatedReports.filter(r => r.status === 'in_progress').length,
      resolved: updatedReports.filter(r => r.status === 'resolved').length
    };
    setStats(newStats);
  };

  const filteredReports = reports.filter(report => {
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || report.category === filterCategory;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Kelola Laporan</h1>
          <p className="text-gray-600 text-lg">Dashboard admin untuk mengelola semua laporan</p>
        </div>

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
                    <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-700 rounded-xl flex items-center justify-center shadow-lg`}>
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
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
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
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan <span className="font-bold text-blue-600">{filteredReports.length}</span> dari{' '}
            <span className="font-bold">{reports.length}</span> laporan
          </p>
        </div>

        {/* Reports List */}
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Tidak Ada Laporan</h3>
            <p className="text-gray-600">Belum ada laporan yang perlu dikelola</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                  {/* Image */}
                  <div className="w-full md:w-48 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl overflow-hidden flex-shrink-0 mb-4 md:mb-0">
                    <img
                      src={report.imageUrl}
                      alt={report.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{report.title}</h3>
                        <p className="text-sm text-gray-500">Dilaporkan oleh {report.createdBy}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{report.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-500 block mb-1">Kategori</span>
                        <span className="font-semibold text-gray-900">{report.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-1">Prioritas</span>
                        <span className="font-semibold text-gray-900">{report.priority.toUpperCase()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-1">Lokasi</span>
                        <span className="font-semibold text-gray-900">{report.location}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-1">Tanggal</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(report.createdAt).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>

                    {/* Status Update */}
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-semibold text-gray-700">Status:</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusChange(report.id, 'pending')}
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            report.status === 'pending'
                              ? 'bg-yellow-500 text-white shadow-md'
                              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => handleStatusChange(report.id, 'in_progress')}
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            report.status === 'in_progress'
                              ? 'bg-blue-500 text-white shadow-md'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() => handleStatusChange(report.id, 'resolved')}
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            report.status === 'resolved'
                              ? 'bg-green-500 text-white shadow-md'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          Resolved
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