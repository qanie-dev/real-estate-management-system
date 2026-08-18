"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Upload,
  Star,
  User,
  Briefcase,
  MessageSquare,
  X,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    designation: "",
    message: "",
    rating: 5,
    image: null as File | null,
    currentImage: "",
    active: true,
  });

  useEffect(() => {
    fetchTestimonial();
  }, []);

  async function fetchTestimonial() {
    try {
      const res = await fetch(`/api/testimonials/${params.id}`);
      if (!res.ok) throw new Error("Failed to fetch testimonial");
      
      const data = await res.json();
      setForm({
        name: data.name || "",
        designation: data.designation || "",
        message: data.message || "",
        rating: data.rating || 5,
        image: null,
        currentImage: data.image || "",
        active: data.active !== undefined ? data.active : true,
      });
    } catch (error) {
      console.error(error);
      setError("Failed to load testimonial");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let imageUrl = form.currentImage;

      // Upload new image if selected
      if (form.image) {
        const uploadData = new FormData();
        uploadData.append("file", form.image);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await uploadRes.json();

        if (!uploadRes.ok) {
          setError(uploadResult.message || "Image upload failed");
          setSaving(false);
          return;
        }

        imageUrl = uploadResult.imageUrl;
      }

      const res = await fetch(`/api/testimonials/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          designation: form.designation,
          message: form.message,
          rating: form.rating,
          image: imageUrl,
          active: form.active,
        }),
      });

      if (res.ok) {
        alert("Testimonial Updated Successfully");
        router.push("/admin/testimonials");
      } else {
        const data = await res.json();
        setError(data.message || "Update Failed");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }

    setSaving(false);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, image: file });
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const removeNewImage = () => {
    setForm({ ...form, image: null });
    setImagePreview(null);
  };

  const removeCurrentImage = async () => {
    if (!confirm("Remove current image?")) return;
    setForm({ ...form, currentImage: "" });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={20}
        fill={index < rating ? "#FACC15" : "none"}
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          <div className="relative inline-block">
            <div className="w-12 h-12 border-4 border-[#081B37]/20 border-t-[#081B37] rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-[#081B37] font-medium">Loading testimonial...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group bg-white hover:bg-gray-50 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mb-6 border border-gray-100 hover:-translate-y-0.5"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-[#081B37]">Back to Testimonials</span>
        </button>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#081B37] to-[#1a3a5c] px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                <RefreshCw className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Edit Testimonial
                </h1>
                <p className="text-blue-200/80 text-sm mt-0.5">
                  Update customer testimonial details
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mx-8 mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
              <X size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-8">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[#081B37] mb-2">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    Customer Name <span className="text-red-500">*</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 text-base font-medium"
                    placeholder="Enter customer full name"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className={`h-2 w-2 rounded-full ${form.name ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-300`}></div>
                  </div>
                </div>
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-semibold text-[#081B37] mb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    Designation <span className="text-red-500">*</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={form.designation}
                    onChange={(e) =>
                      setForm({ ...form, designation: e.target.value })
                    }
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 text-base font-medium"
                    placeholder="CEO, Manager, etc."
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className={`h-2 w-2 rounded-full ${form.designation ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-300`}></div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-[#081B37] mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} />
                    Testimonial <span className="text-red-500">*</span>
                  </div>
                </label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 text-base font-medium resize-none"
                  placeholder="Write the testimonial message..."
                />
                <div className="flex justify-between mt-1.5">
                  <p className="text-xs text-gray-500">Write the customer's testimonial</p>
                  <span className="text-xs text-gray-400">{form.message.length} characters</span>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-[#081B37] mb-2">
                  <div className="flex items-center gap-2">
                    <Star size={16} />
                    Rating <span className="text-red-500">*</span>
                  </div>
                </label>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {renderStars(form.rating)}
                    </div>
                    <select
                      className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-[#081B37] focus:outline-none focus:border-[#C79A54] focus:ring-2 focus:ring-[#C79A54]/20 transition-all font-medium"
                      value={form.rating}
                      onChange={(e) =>
                        setForm({ ...form, rating: Number(e.target.value) })
                      }
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div>
                <label className="block text-sm font-semibold text-[#081B37] mb-2">
                  <div className="flex items-center gap-2">
                    <Upload size={16} />
                    Customer Image
                  </div>
                </label>

                {/* Current Image */}
                {form.currentImage && !imagePreview && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Current Image</p>
                    <div className="relative group inline-block">
                      <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
                        <img
                          src={form.currentImage}
                          alt="Current customer"
                          className="w-32 h-32 object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={removeCurrentImage}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-gray-500 text-center">
                        Hover to remove • Click × to delete
                      </p>
                    </div>
                  </div>
                )}

                {/* New Image Preview */}
                {imagePreview && (
                  <div className="relative group mb-4">
                    <div className="relative rounded-xl overflow-hidden border-2 border-[#C79A54] border-dashed bg-gray-50">
                      <img
                        src={imagePreview}
                        alt="New customer preview"
                        className="w-32 h-32 object-cover mx-auto"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={removeNewImage}
                          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                        >
                          <X size={24} />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-green-600 font-medium text-center">
                      ✓ New image ready to upload
                    </p>
                  </div>
                )}

                {/* Upload Area */}
                <div className="relative">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#C79A54] hover:bg-[#C79A54]/5 transition-all duration-300 group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="p-3 bg-[#C79A54]/10 rounded-full group-hover:bg-[#C79A54]/20 transition-colors duration-300">
                        <Upload className="w-8 h-8 text-[#C79A54]" />
                      </div>
                      <p className="mt-3 text-sm font-medium text-[#081B37]">
                        {form.currentImage ? 'Click to change image' : 'Click to upload image'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        SVG, PNG, JPG (Recommended: 200x200px)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Active Status */}
              <div>
                <label className="block text-sm font-semibold text-[#081B37] mb-3">
                  Status
                </label>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, active: true })}
                    className={`flex-1 px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm ${
                      form.active
                        ? "bg-green-500 text-white shadow-lg"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    <Eye size={16} />
                    Active
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, active: false })}
                    className={`flex-1 px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm ${
                      !form.active
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    <EyeOff size={16} />
                    Inactive
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {form.active ? 'Testimonial will be visible on the website' : 'Testimonial will be hidden from the website'}
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={saving}
                  className="group w-full bg-gradient-to-r from-[#081B37] to-[#1a3a5c] text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] font-semibold text-base flex items-center justify-center gap-3"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Updating Testimonial...</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} className="group-hover:scale-110 transition-transform" />
                      <span>Update Testimonial</span>
                    </>
                  )}
                </button>
                
                <div className="flex justify-between mt-4 text-xs text-gray-500">
                  <span>All fields marked with * are required</span>
                  <span>Testimonial ID: {params.id}</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Quick Actions Card */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-4 shadow-lg">
            <h4 className="text-sm font-semibold text-[#081B37] mb-2">📝 Tips</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Update testimonial details to keep content fresh</li>
              <li>• Replace images for better visual appeal</li>
              <li>• Changes will reflect immediately on the site</li>
            </ul>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-4 shadow-lg">
            <h4 className="text-sm font-semibold text-[#081B37] mb-2">⚡ Quick Info</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Status: {form.active ? '✅ Active' : '❌ Inactive'}</li>
              <li>• Image: {form.currentImage ? '✅ Set' : '❌ Not set'}</li>
              <li>• New image: {form.image ? '✅ Selected' : '❌ None'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}