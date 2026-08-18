"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  FileText,
  X,
  RefreshCw,
  Sparkles,
} from "lucide-react";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchService();
  }, []);

  async function fetchService() {
    try {
      const res = await fetch(`/api/services/${params.id}`);

      if (!res.ok) {
        setError("Service not found");
        setTimeout(() => router.push("/admin/services"), 2000);
        return;
      }

      const data = await res.json();
      setTitle(data.title);
      setDescription(data.description);
      setCurrentImage(data.image || "");
    } catch (err) {
      console.error(err);
      setError("Failed to load service");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let imageUrl = currentImage;

      if (image) {
        const uploadData = new FormData();
        uploadData.append("file", image);

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

      const res = await fetch(`/api/services/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image: imageUrl,
        }),
      });

      if (res.ok) {
        alert("Service Updated Successfully");
        router.push("/admin/services");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to update service");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }

    setSaving(false);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    
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
    setImage(null);
    setImagePreview(null);
  };

  const removeCurrentImage = async () => {
    if (!confirm("Remove current image?")) return;
    setCurrentImage("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          <div className="relative inline-block">
            <div className="w-12 h-12 border-4 border-[#081B37]/20 border-t-[#081B37] rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-[#081B37] font-medium">Loading service...</p>
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
          <span className="font-medium text-[#081B37]">Back to Services</span>
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
                  Edit Service
                </h1>
                <p className="text-blue-200/80 text-sm mt-0.5">
                  Update service information and details
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
              {/* Service Title */}
              <div>
                <label className="block text-sm font-semibold text-[#081B37] mb-2">
                  Service Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#081B37] focus:ring-4 focus:ring-[#081B37]/10 transition-all duration-300 text-base font-medium"
                    placeholder="Enter service title"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className={`h-2 w-2 rounded-full ${title ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-300`}></div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#081B37] mb-2">
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    Description <span className="text-red-500">*</span>
                  </div>
                </label>
                <textarea
                  rows={5}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#081B37] focus:ring-4 focus:ring-[#081B37]/10 transition-all duration-300 text-base font-medium resize-none"
                  placeholder="Describe your service in detail..."
                />
                <div className="flex justify-between mt-1.5">
                  <p className="text-xs text-gray-500">Provide a detailed description of the service</p>
                  <span className="text-xs text-gray-400">{description.length} characters</span>
                </div>
              </div>

              {/* Current Image */}
              {currentImage && (
                <div>
                  <label className="block text-sm font-semibold text-[#081B37] mb-3">
                    <div className="flex items-center gap-2">
                      <ImageIcon size={16} />
                      Current Image
                    </div>
                  </label>
                  <div className="relative group inline-block">
                    <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
                      <img
                        src={currentImage}
                        alt="Current service"
                        className="w-64 h-48 object-cover"
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

              {/* New Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-[#081B37] mb-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon size={16} />
                    {currentImage ? 'Change Image' : 'Service Image'}
                  </div>
                </label>
                
                {imagePreview ? (
                  // New Image Preview
                  <div className="relative group">
                    <div className="relative rounded-xl overflow-hidden border-2 border-[#081B37] border-dashed bg-gray-50">
                      <img
                        src={imagePreview}
                        alt="New service preview"
                        className="w-full h-64 object-cover"
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
                ) : (
                  // Upload Area
                  <div className="relative">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#081B37] hover:bg-[#081B37]/5 transition-all duration-300 group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="p-3 bg-[#081B37]/10 rounded-full group-hover:bg-[#081B37]/20 transition-colors duration-300">
                          <ImageIcon className="w-8 h-8 text-[#081B37]" />
                        </div>
                        <p className="mt-3 text-sm font-medium text-[#081B37]">
                          {currentImage ? 'Click to change image' : 'Click to upload image'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          SVG, PNG, JPG or GIF (Max 5MB)
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
                )}
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
                      <span>Updating Service...</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} className="group-hover:scale-110 transition-transform" />
                      <span>Update Service</span>
                    </>
                  )}
                </button>
                
                <div className="flex justify-between mt-4 text-xs text-gray-500">
                  <span>All fields marked with * are required</span>
                  <span>Service ID: {params.id}</span>
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
              <li>• Update service details to keep information current</li>
              <li>• Replace images for better visual representation</li>
              <li>• Changes will reflect immediately on the site</li>
            </ul>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-4 shadow-lg">
            <h4 className="text-sm font-semibold text-[#081B37] mb-2">⚡ Quick Info</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Current image: {currentImage ? '✅ Set' : '❌ Not set'}</li>
              <li>• New image: {image ? '✅ Selected' : '❌ None'}</li>
              <li>• Status: {title ? 'Ready to update' : 'Title required'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}