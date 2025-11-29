import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiX } from "react-icons/fi";

const Report = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    location: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // 🔥 KATEGORI MANUAL (tidak perlu mock)
  const categories = [
    "Fasilitas",
    "Elektronik",
    "Sanitasi",
    "Listrik",
    "Kebersihan",
    "Keamanan",
    "Lainnya",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi submit
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        ...formData,
        status: "pending",
        createdBy: JSON.parse(localStorage.getItem("fixmyunesa_user")).name,
        createdAt: new Date().toISOString(),
        imageUrl:
          imagePreview ||
          "https://via.placeholder.com/400x300/3B82F6/ffffff?text=No+Image",
      };

      const existingReports = JSON.parse(
        localStorage.getItem("fixmyunesa_reports") || "[]"
      );
      existingReports.unshift(newReport);
      localStorage.setItem(
        "fixmyunesa_reports",
        JSON.stringify(existingReports)
      );

      setSuccessMessage("Laporan berhasil dibuat!");
      setIsSubmitting(false);

      setTimeout(() => navigate("/my-reports"), 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Buat Laporan Baru
          </h1>
          <p className="text-gray-600 text-lg">
            Laporkan masalah atau kerusakan fasilitas kampus
          </p>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl animate-fade-in">
            {successMessage}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TITLE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Judul Laporan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl"
                placeholder="Contoh: Kursi Rusak di Ruang A301"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                rows="5"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl resize-none"
                placeholder="Jelaskan masalah secara detail..."
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* CATEGORY FIXED */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl bg-white"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* PRIORITY */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Prioritas <span className="text-red-500">*</span>
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl bg-white"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lokasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl"
                placeholder="Contoh: Gedung A Lt. 3"
                required
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Foto (Opsional)
              </label>

              {!imagePreview ? (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer">
                  <FiUpload className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Click to upload</span> atau
                    drag and drop
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="relative w-full h-64 rounded-xl overflow-hidden border">
                  <img
                    src={imagePreview}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-lg"
                  >
                    <FiX />
                  </button>
                </div>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-700 text-white py-4 rounded-xl"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Laporan"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/my-reports")}
                className="px-8 py-4 bg-gray-200 rounded-xl"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Report;
