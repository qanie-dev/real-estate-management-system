"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Grid3x3, List, AlertCircle } from "lucide-react";

interface Category {
  id: number;
  name: string;
  image: string | null;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory(id: number) {
    if (!confirm("Are you sure you want to delete this category?")) return;

    setDeleteId(id);
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete category. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setDeleteId(null);
    }
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#081B37] tracking-tight">
                Property Categories
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                Manage and organize your property categories
              </p>
            </div>

            <Link
              href="/admin/categories/add"
              className="inline-flex items-center gap-2 bg-[#081B37] hover:bg-[#1a3a5c] text-white px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 font-medium text-sm"
            >
              <Plus size={18} />
              Add Category
            </Link>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#081B37]/20 focus:border-[#081B37] transition-all text-[#081B37] placeholder-gray-400"
              />
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
                {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-[#081B37]/20 border-t-[#081B37] rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-500 font-medium">Loading categories...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="text-5xl mb-4">📂</div>
            <h3 className="text-xl font-semibold text-[#081B37]">No categories found</h3>
            <p className="text-gray-500 mt-2 text-sm">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first category'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-[#081B37] font-medium text-sm hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400 text-sm font-medium">No Image</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-base font-semibold text-[#081B37] mb-3 truncate">
                    {category.name}
                  </h3>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/categories/edit/${category.id}`}
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all hover:shadow-md text-sm font-medium"
                    >
                      <Pencil size={15} />
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteCategory(category.id)}
                      disabled={deleteId === category.id}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all hover:shadow-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleteId === category.id ? (
                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Trash2 size={15} />
                      )}
                      Delete
                    </button>
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
                    <th className="px-6 py-4 text-left text-sm font-semibold">Category Name</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category, index) => (
                    <tr
                      key={category.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-16 h-12 object-cover rounded-lg shadow-sm"
                          />
                        ) : (
                          <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 font-medium">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-[#081B37]">
                        {category.name}
                      </td>
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/categories/edit/${category.id}`}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all hover:shadow-md"
                            aria-label="Edit category"
                          >
                            <Pencil size={17} />
                          </Link>
                          <button
                            onClick={() => deleteCategory(category.id)}
                            disabled={deleteId === category.id}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Delete category"
                          >
                            {deleteId === category.id ? (
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
          </div>
        )}
      </div>
    </div>
  );
}