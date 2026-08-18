"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Star,
  Grid3x3,
  List,
  User,
  MessageSquare,
  Eye,
  EyeOff,
} from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  designation: string;
  rating: number;
  image: string | null;
  active: boolean;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    try {
      const res = await fetch("/api/testimonials");

      if (!res.ok) {
        throw new Error("Failed to fetch testimonials");
      }

      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTestimonial(id: number) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (!confirmDelete) return;

    setDeleteId(id);
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTestimonials((prev) =>
          prev.filter((item) => item.id !== id)
        );
        alert("Testimonial deleted successfully.");
      } else {
        alert("Delete failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setDeleteId(null);
    }
  }

  const filtered = testimonials.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.designation.toLowerCase().includes(search.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
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
          <p className="mt-4 text-[#081B37] font-medium">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#081B37] tracking-tight">
                Testimonials
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                Manage customer testimonials and reviews
              </p>
            </div>

            <Link
              href="/admin/testimonials/add"
              className="inline-flex items-center gap-2 bg-[#081B37] hover:bg-[#1a3a5c] text-white px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 font-medium text-sm"
            >
              <Plus size={18} />
              Add Testimonial
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Total</p>
                <p className="text-xl font-bold text-[#081B37]">{testimonials.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Active</p>
                <p className="text-xl font-bold text-[#081B37]">
                  {testimonials.filter(t => t.active).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Clients</p>
                <p className="text-xl font-bold text-[#081B37]">
                  {new Set(testimonials.map(t => t.name)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Avg Rating</p>
                <p className="text-xl font-bold text-[#081B37]">
                  {testimonials.length > 0 
                    ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)
                    : '0.0'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#081B37]/20 focus:border-[#081B37] transition-all text-[#081B37] placeholder-gray-400"
                placeholder="Search testimonials..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-[#081B37] text-white shadow-md"
                      : "text-gray-600 hover:bg-white hover:text-[#081B37]"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-[#081B37] text-white shadow-md"
                      : "text-gray-600 hover:bg-white hover:text-[#081B37]"
                  }`}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {filtered.length} {filtered.length === 1 ? 'testimonial' : 'testimonials'}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold text-[#081B37]">No testimonials found</h3>
            <p className="text-gray-500 mt-2 text-sm">
              {search ? 'Try adjusting your search terms' : 'Start by adding your first testimonial'}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-[#081B37] font-medium text-sm hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((testimonial) => (
              <div
                key={testimonial.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden flex-shrink-0">
                        {testimonial.image ? (
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User size={24} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#081B37]">
                          {testimonial.name}
                        </h3>
                        <p className="text-xs text-gray-500">{testimonial.designation}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/testimonials/edit/${testimonial.id}`}
                        className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => deleteTestimonial(testimonial.id)}
                        disabled={deleteId === testimonial.id}
                        className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all disabled:opacity-50"
                      >
                        {deleteId === testimonial.id ? (
                          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Trash2 size={15} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1">
                    {renderStars(testimonial.rating)}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        testimonial.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {testimonial.active ? (
                          <Eye size={12} />
                        ) : (
                          <EyeOff size={12} />
                        )}
                        {testimonial.active ? "Active" : "Inactive"}
                      </span>
                      <span className="text-xs text-gray-400">#{testimonial.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#081B37] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Image</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Designation</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User size={18} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-[#081B37]">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {item.designation}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-0.5">
                          {renderStars(item.rating)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          item.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {item.active ? (
                            <Eye size={12} />
                          ) : (
                            <EyeOff size={12} />
                          )}
                          {item.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/testimonials/edit/${item.id}`}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all hover:shadow-md"
                            aria-label="Edit testimonial"
                          >
                            <Pencil size={17} />
                          </Link>
                          <button
                            onClick={() => deleteTestimonial(item.id)}
                            disabled={deleteId === item.id}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Delete testimonial"
                          >
                            {deleteId === item.id ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Trash2 size={17} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            {filtered.length > 0 && (
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Showing {filtered.length} of {testimonials.length} testimonials
                </p>
                <p className="text-xs text-gray-400">
                  Last updated: {new Date().toLocaleString()}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}