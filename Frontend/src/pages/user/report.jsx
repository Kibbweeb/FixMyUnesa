import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiX } from "react-icons/fi";
import Alert from "../../components/Alert";

const Report = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    location: "",
    status: "menunggu",
  });

  const [imageFile, setImageFile] = useState(null);
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
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert(
          "Format file tidak didukung. Hanya JPG, JPEG, dan PNG yang diperbolehkan."
        );
        e.target.value = "";
        return;
      }

      // Validasi ukuran file (max 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("Ukuran file terlalu besar. Maksimal 10MB.");
        e.target.value = "";
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem("fixmyunesa_token");

      console.log("Token from localStorage:", token);

      if (!token) {
        alert("Anda harus login terlebih dahulu");
        navigate("/login");
        return;
      }

      // Prepare FormData for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("priority", formData.priority);

      if (imageFile) {
        formDataToSend.append("picture", imageFile);
      }

      console.log("Sending report with file");

      // Send to backend
      const response = await fetch("http://localhost:8080/api/user/report", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const responseData = await response.json();
      console.log("Backend response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || "Gagal membuat laporan");
      }

      setSuccessMessage("Laporan berhasil dibuat!");
      setIsSubmitting(false);

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        priority: "medium",
        location: "",
        status: "menunggu",
      });
      setImagePreview(null);
      setImageFile(null);

      setTimeout(() => navigate("/myreports"), 2000);
    } catch (error) {
      console.error("Error creating report:", error);
      alert(error.message || "Terjadi kesalahan saat membuat laporan");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">
            Buat Laporan Baru
          </h1>
          <p className="text-gray-600 font-semibold text-lg">
            Laporkan masalah atau kerusakan fasilitas kampus
          </p>
        </div>

        {successMessage && <Alert type="success" message={successMessage} />}

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TITLE */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Judul Laporan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl"
                placeholder="Contoh: Kursi Rusak di Ruang A10.01.17"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
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
                <label className="block text-sm font-semibold text-gray-600 mb-2">
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
                <label className="block text-sm font-semibold text-gray-600 mb-2">
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
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Lokasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl"
                placeholder="Contoh: Gedung A10.01.17"
                required
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Foto (Opsional)
              </label>

              {!imagePreview ? (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer">
                  <FiUpload className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Click to upload</span> atau
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    JPG, JPEG, atau PNG (Max. 10MB)
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/jpg,image/png"
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
                    className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-lg"
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
                className="flex-1 bg-blue-500 text-white py-4 rounded-xl"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Laporan"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/my-reports")}
                className="px-8 py-4 bg-white rounded-xl shadow-lg"
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
