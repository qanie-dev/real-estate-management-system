"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, FolderOpen, Image as ImageIcon, X } from "lucide-react";

export default function AddCategoryPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      let imageUrl = "";

      // Upload image first
      if (image) {
        const uploadData = new FormData();
        uploadData.append("file", image);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await uploadRes.json();
        imageUrl = uploadResult.imageUrl;
      }

      // Save category
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          image: imageUrl,
        }),
      });

      if (res.ok) {
        alert("Category Added Successfully");
        router.push("/admin/categories");
      } else {
        alert("Failed to add category");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button with Glassmorphism */}
        <button
          onClick={() => router.back()}
          className="group bg-white/80 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mb-6 border border-white/20 hover:-translate-y-0.5"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-[#081B37]">Back to Categories</span>
        </button>

        {/* Main Form Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-[#081B37] to-[#1a3a5c] px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                <FolderOpen className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Add New Category
                </h1>
                <p className="text-blue-200/80 text-sm mt-0.5">
                  Create a new property category for your listings
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-8">
              {/* Category Name Field */}
              <div>
                <label className="block text-sm font-semibold text-[#081B37] mb-2">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#081B37] focus:ring-4 focus:ring-[#081B37]/10 transition-all duration-300 text-base font-medium"
                    placeholder="Enter category name (e.g., Apartment, Villa, Office)"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className={`h-2 w-2 rounded-full ${name ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-300`}></div>
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-gray-500">
                  Choose a clear and descriptive name for your category
                </p>
              </div>

              {/* Image Upload Field */}
              <div>
                <label className="block text-sm font-semibold text-[#081B37] mb-2">
                  Category Image
                </label>
                
                {imagePreview ? (
                  // Image Preview
                  <div className="relative group">
                    <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-50">
                      <img
                        src={imagePreview}
                        alt="Category preview"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={removeImage}
                          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                        >
                          <X size={24} />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      Click the X to remove image
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
                          Click to upload image
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
                      <span>Saving Category...</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} className="group-hover:scale-110 transition-transform" />
                      <span>Save Category</span>
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
        <div className="mt-6 bg-white/60 backdrop-blur-md rounded-xl border border-white/20 p-4 shadow-lg">
          <h4 className="text-sm font-semibold text-[#081B37] mb-2">💡 Quick Tips</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Use clear, specific category names for better organization</li>
            <li>• Upload high-quality images (recommended: 800x600px)</li>
            <li>• Categories help users find properties faster</li>
          </ul>
        </div>
      </div>
    </div>
  );
}