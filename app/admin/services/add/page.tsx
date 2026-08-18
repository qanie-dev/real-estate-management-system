"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  FileText,
  X,
  Sparkles,
} from "lucide-react";

export default function AddServicePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = "";

      // Upload Image
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
          setLoading(false);
          return;
        }

        imageUrl = uploadResult.imageUrl;
      }

      // Save Service
      const res = await fetch("/api/services", {
        method: "POST",
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
        alert("Service Added Successfully");
        router.push("/admin/services");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to add service");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
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

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

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
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Add New Service
                </h1>
                <p className="text-blue-200/80 text-sm mt-0.5">
                  Create a new service offering for your business
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
                    placeholder="Enter service title (e.g., Property Buying)"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className={`h-2 w-2 rounded-full ${title ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-300`}></div>
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-gray-500">
                  Choose a clear and descriptive title for your service
                </p>
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

              {/* Service Image */}
              <div>
                <label className="block text-sm font-semibold text-[#081B37] mb-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon size={16} />
                    Service Image
                  </div>
                </label>
                
                {imagePreview ? (
                  // Image Preview
                  <div className="relative group">
                    <div className="relative rounded-xl overflow-hidden border-2 border-[#081B37] border-dashed bg-gray-50">
                      <img
                        src={imagePreview}
                        alt="Service preview"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={removeImage}
                          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                        >
                          <X size={24} />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-green-600 font-medium text-center">
                      ✓ Image ready to upload
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
                          Click to upload service image
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
                  disabled={loading}
                  className="group w-full bg-gradient-to-r from-[#081B37] to-[#1a3a5c] text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] font-semibold text-base flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving Service...</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} className="group-hover:scale-110 transition-transform" />
                      <span>Add Service</span>
                    </>
                  )}
                </button>
                
                <div className="flex justify-between mt-4 text-xs text-gray-500">
                  <span>All fields marked with * are required</span>
                  <span>v1.0</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Quick Tips Card */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-4 shadow-lg">
            <h4 className="text-sm font-semibold text-[#081B37] mb-2">💡 Tip 1</h4>
            <p className="text-xs text-gray-600">Use clear, specific service titles for better organization</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-4 shadow-lg">
            <h4 className="text-sm font-semibold text-[#081B37] mb-2">📸 Tip 2</h4>
            <p className="text-xs text-gray-600">Upload high-quality images (recommended: 800x600px)</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-4 shadow-lg">
            <h4 className="text-sm font-semibold text-[#081B37] mb-2">✍️ Tip 3</h4>
            <p className="text-xs text-gray-600">Write comprehensive descriptions to attract more clients</p>
          </div>
        </div>
      </div>
    </div>
  );
}