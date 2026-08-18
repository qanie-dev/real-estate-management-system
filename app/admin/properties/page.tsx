"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, Search } from "lucide-react";

interface Property {
  id: number;
  title: string;
   category: {
    id: number;
    name: string;
  };

  city: string;
  price: number;
  status: string;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      const res = await fetch("/api/properties");
      const data = await res.json();

    
      setProperties(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProperty(id: number) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Update UI immediately by filtering out the deleted property
        setProperties((prev) =>
          prev.filter((property) => property.id !== id)
        );

        alert("Property deleted successfully.");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete property.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  // Filter properties based on search
  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#081B37] to-[#1a3a6b] bg-clip-text text-transparent">
              All Properties
            </h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
              Manage all property listings
            </p>
          </div>

          <Link
            href="/admin/properties/add"
            className="flex items-center gap-2 bg-gradient-to-r from-[#081B37] to-[#0d2956] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            Add Property
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 mb-6 border border-gray-100/50">
          <div className="flex items-center gap-3 bg-gray-50/50 backdrop-blur-sm border border-gray-200 rounded-xl px-4 focus-within:border-[#081B37] focus-within:ring-2 focus-within:ring-[#081B37]/20 transition-all duration-300">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search properties by title, category, or city..."
              className="w-full py-3 outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-gray-100/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#081B37] to-[#0d2956] text-white">
                  <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Title
                  </th>
                  <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Category
                  </th>
                  <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">
                    City
                  </th>
                  <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Price
                  </th>
                  <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-center text-sm font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-12 h-12 border-4 border-[#081B37] border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-500 font-medium">Loading properties...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredProperties.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="text-4xl mb-2">🏠</div>
                        <p className="text-gray-600 font-medium">No Properties Found</p>
                        <p className="text-gray-400 text-sm">Start by adding your first property</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProperties.map((property) => (
                    <tr
                      key={property.id}
                      className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200 group"
                    >
                      <td className="p-4 font-medium text-gray-800 group-hover:text-[#081B37] transition-colors">
                        {property.title}
                      </td>
                      <td className="p-4 text-gray-600">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                          {property.category?.name}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">
                        <span className="inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                          {property.city}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-gray-800">
                        Rs. {property.price.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          property.status === "Available" || property.status === "For Sale"
                            ? "bg-green-100 text-green-700"
                            : property.status === "Sold"
                            ? "bg-red-100 text-red-700"
                            : property.status === "Commercial"
                            ? "bg-blue-100 text-blue-700"
                            : property.status === "Featured"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {property.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/admin/properties/edit/${property.id}`}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-110 transition-all duration-200"
                            title="Edit property"
                          >
                            <Pencil size={18} />
                          </Link>
                          <button
                            onClick={() => deleteProperty(property.id)}
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:scale-110 transition-all duration-200"
                            title="Delete property"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer with count */}
          {!loading && filteredProperties.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 backdrop-blur-sm">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-700">{filteredProperties.length}</span> properties
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}   