"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Home, 
  Building2, 
  MapPin, 
  DollarSign, 
  Layers, 
  Image as ImageIcon,
  Bed,
  Bath,
  Square,
  Star,
  Tag
} from "lucide-react";

interface Category {
  id: number;
  name: string;
}

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    location: "",
    categoryId: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    image: null as File | null,
    currentImage: "",
    featured: false,
    status: "Available",
  });

  useEffect(() => {
    fetchCategories();
    fetchProperty();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function fetchProperty() {
    try {
      const res = await fetch(`/api/properties/${params.id}`);
      
      if (!res.ok) {
        throw new Error("Failed to fetch property");
      }
      
      const data = await res.json();

      setForm({
        title: data.title || "",
        description: data.description || "",
        price: data.price ? data.price.toString() : "",
        city: data.city || "",
        location: data.location || "",
        categoryId: data.categoryId?.toString() || "",
        bedrooms: data.bedrooms ? data.bedrooms.toString() : "",
        bathrooms: data.bathrooms ? data.bathrooms.toString() : "",
        area: data.area || "",
        image: null,
        currentImage: data.image || "",
        featured: data.featured || false,
        status: data.status || "Available",
      });
    } catch (error) {
      console.error("Error fetching property:", error);
      alert("Failed to load property");
      router.push("/admin/properties");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("city", form.city);
      formData.append("location", form.location);
      formData.append("categoryId", form.categoryId);
      formData.append("bedrooms", form.bedrooms);
      formData.append("bathrooms", form.bathrooms);
      formData.append("area", form.area);
      formData.append("featured", String(form.featured));
      formData.append("status", form.status);

      if (form.image) {
        formData.append("image", form.image);
      }

      const res = await fetch(`/api/properties/${params.id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        alert("Property Updated Successfully");
        router.push("/admin/properties");
      } else {
        const data = await res.json();
        alert(data.message || "Update Failed");
      }
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Something went wrong");
    }
  }

  // Helper function to check if a field has content
  const hasValue = (value: string | number | boolean | File | null) => {
    if (typeof value === 'boolean') return value;
    if (value instanceof File) return true;
    return value !== "" && value !== null && value !== undefined;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#081B37] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-gray-600">Loading Property...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#081B37] to-[#1a3a6b] bg-clip-text text-transparent">
              Edit Property
            </h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
              Update property information
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg border border-gray-100/50"
          >
            <ArrowLeft size={18} className="text-gray-600" />
            <span className="text-gray-600 font-medium">Back</span>
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 space-y-8 border border-gray-100/50"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <Home size={18} className="text-[#081B37]" />
                Property Title <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full border rounded-xl p-3.5 mt-2 outline-none focus:border-[#081B37] focus:ring-2 focus:ring-[#081B37]/20 transition ${
                  hasValue(form.title)
                    ? "bg-[#081B37] text-white border-[#081B37]"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter property title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            {/* Price */}
            <div>
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign size={18} className="text-[#081B37]" />
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className={`w-full border rounded-xl p-3.5 mt-2 outline-none focus:border-[#081B37] focus:ring-2 focus:ring-[#081B37]/20 transition ${
                  hasValue(form.price)
                    ? "bg-[#081B37] text-white border-[#081B37]"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter property price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>

            {/* City */}
            <div>
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <MapPin size={18} className="text-[#081B37]" />
                City <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full border rounded-xl p-3.5 mt-2 outline-none focus:border-[#081B37] focus:ring-2 focus:ring-[#081B37]/20 transition ${
                  hasValue(form.city)
                    ? "bg-[#081B37] text-white border-[#081B37]"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter city name"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>

            {/* Location */}
            <div>
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <MapPin size={18} className="text-[#081B37]" />
                Location <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full border rounded-xl p-3.5 mt-2 outline-none focus:border-[#081B37] focus:ring-2 focus:ring-[#081B37]/20 transition ${
                  hasValue(form.location)
                    ? "bg-[#081B37] text-white border-[#081B37]"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter specific location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>

            {/* Category - Dynamic */}
            <div>
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <Layers size={18} className="text-[#081B37]" />
                Category <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full border rounded-xl p-3.5 mt-2 outline-none focus:border-[#081B37] focus:ring-2 focus:ring-[#081B37]/20 transition appearance-none ${
                  hasValue(form.categoryId)
                    ? "bg-[#081B37] text-white border-[#081B37]"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                value={form.categoryId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    categoryId: e.target.value,
                  })
                }
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 1rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {categories.length === 0 && (
                <p className="text-sm text-amber-600 mt-1">
                  ⚠️ No categories found. Please add categories first.
                </p>
              )}
            </div>

            {/* Area */}
            <div>
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <Square size={18} className="text-[#081B37]" />
                Area <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full border rounded-xl p-3.5 mt-2 outline-none focus:border-[#081B37] focus:ring-2 focus:ring-[#081B37]/20 transition ${
                  hasValue(form.area)
                    ? "bg-[#081B37] text-white border-[#081B37]"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Area (e.g., 10 Marla, 2000 Sqft)"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
              />
            </div>

            {/* Bedrooms */}
            <div>
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <Bed size={18} className="text-[#081B37]" />
                Bedrooms
              </label>
              <input
                type="number"
                className={`w-full border rounded-xl p-3.5 mt-2 outline-none focus:border-[#081B37] focus:ring-2 focus:ring-[#081B37]/20 transition ${
                  hasValue(form.bedrooms)
                    ? "bg-[#081B37] text-white border-[#081B37]"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Number of bedrooms"
                value={form.bedrooms}
                onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
              />
            </div>

            {/* Bathrooms */}
            <div>
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <Bath size={18} className="text-[#081B37]" />
                Bathrooms
              </label>
              <input
                type="number"
                className={`w-full border rounded-xl p-3.5 mt-2 outline-none focus:border-[#081B37] focus:ring-2 focus:ring-[#081B37]/20 transition ${
                  hasValue(form.bathrooms)
                    ? "bg-[#081B37] text-white border-[#081B37]"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Number of bathrooms"
                value={form.bathrooms}
                onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-gray-700 flex items-center gap-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={6}
              className={`w-full border rounded-xl p-3.5 mt-2 outline-none focus:border-[#081B37] focus:ring-2 focus:ring-[#081B37]/20 transition resize-none ${
                hasValue(form.description)
                  ? "bg-[#081B37] text-white border-[#081B37]"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="Write a detailed description of the property..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="font-semibold text-gray-700 flex items-center gap-2">
              <ImageIcon size={18} className="text-[#081B37]" />
              Property Image
            </label>

            {form.currentImage && (
              <div className="mt-3 mb-3">
                <img
                  src={form.currentImage}
                  alt="Property"
                  className="w-48 h-32 object-cover rounded-lg"
                />
                <p className="text-sm text-gray-500 mt-1">Current image</p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className={`w-full border rounded-xl p-3 mt-2 outline-none focus:border-[#081B37] focus:ring-2 focus:ring-[#081B37]/20 transition ${
                hasValue(form.image)
                  ? "bg-[#081B37] text-white border-[#081B37]"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.files?.[0] || null,
                })
              }
            />
            {form.image && (
              <p className="text-sm text-green-600 mt-2">
                ✅ {form.image.name} selected (will replace current image)
              </p>
            )}
          </div>

          {/* Featured Checkbox & Status */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`flex items-center gap-3 p-4 rounded-xl border transition ${
              form.featured 
                ? 'bg-[#081B37] text-white border-[#081B37]' 
                : 'bg-white border-gray-300'
            }`}>
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) =>
                  setForm({
                    ...form,
                    featured: e.target.checked,
                  })
                }
                className={`w-5 h-5 rounded cursor-pointer ${
                  form.featured 
                    ? 'border-white/80 text-[#C79A54]' 
                    : 'border-gray-300 text-[#081B37]'
                } focus:ring-[#081B37]/20`}
              />
              <label htmlFor="featured" className={`font-medium cursor-pointer flex items-center gap-2 ${
                form.featured ? 'text-white' : 'text-gray-700'
              }`}>
                <Star size={18} className="text-[#C79A54]" />
                Featured Property
              </label>
            </div>

            <div>
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <Tag size={18} className="text-[#081B37]" />
                Status <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full border rounded-xl p-3.5 mt-2 outline-none focus:border-[#081B37] focus:ring-2 focus:ring-[#081B37]/20 transition appearance-none ${
                  hasValue(form.status)
                    ? "bg-[#081B37] text-white border-[#081B37]"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 1rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="Featured">Featured</option>
                <option value="Hot">Hot</option>
                <option value="New">New</option>
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-[#081B37] to-[#0d2956] text-white px-8 py-3.5 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              <Save size={18} className="group-hover:scale-110 transition-transform" />
              Update Property
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}