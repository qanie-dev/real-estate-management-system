"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search, Grid3x3, List, Eye, EyeOff } from "lucide-react";

interface Hero {
  id: number;
  heading: string;
  subHeading: string;
  description: string;
  backgroundImage: string;
  searchPlaceholder: string;
  active: boolean;
}

export default function HeroPage() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchHeroes();
  }, []);

  async function fetchHeroes() {
    try {
      const res = await fetch("/api/hero");

      if (!res.ok) {
        throw new Error("Failed to fetch hero data");
      }

      const data = await res.json();
      setHeroes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteHero(id: number) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this hero section?"
    );

    if (!confirmDelete) return;

    setDeleteId(id);
    try {
      const res = await fetch(`/api/hero/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setHeroes((prev) => prev.filter((hero) => hero.id !== id));
        alert("Hero deleted successfully.");
      } else {
        alert("Failed to delete hero.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setDeleteId(null);
    }
  }

  const filteredHeroes = heroes.filter(
    (hero) =>
      hero.heading.toLowerCase().includes(search.toLowerCase()) ||
      hero.subHeading.toLowerCase().includes(search.toLowerCase()) ||
      hero.description.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          <div className="relative inline-block">
            <div className="w-12 h-12 border-4 border-[#081B37]/20 border-t-[#081B37] rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-[#081B37] font-medium">Loading hero sections...</p>
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
                Hero Sections
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                Manage your homepage hero sections
              </p>
            </div>

            <Link
              href="/admin/hero/add"
              className="inline-flex items-center gap-2 bg-[#081B37] hover:bg-[#1a3a5c] text-white px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 font-medium text-sm"
            >
              <Plus size={18} />
              Add Hero
            </Link>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#081B37]/20 focus:border-[#081B37] transition-all text-[#081B37] placeholder-gray-400"
                placeholder="Search hero sections..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                {filteredHeroes.length} {filteredHeroes.length === 1 ? 'hero' : 'heroes'}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {filteredHeroes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-[#081B37]">No hero sections found</h3>
            <p className="text-gray-500 mt-2 text-sm">
              {search ? 'Try adjusting your search terms' : 'Start by adding your first hero section'}
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
            {filteredHeroes.map((hero) => (
              <div
                key={hero.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={hero.backgroundImage}
                    alt={hero.heading}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                        hero.active
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {hero.active ? (
                        <Eye size={12} />
                      ) : (
                        <EyeOff size={12} />
                      )}
                      {hero.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-semibold text-[#081B37] mb-1 line-clamp-1">
                    {hero.heading}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {hero.subHeading}
                  </p>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                    {hero.description}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Link
                      href={`/admin/hero/edit/${hero.id}`}
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all hover:shadow-md text-sm font-medium"
                    >
                      <Pencil size={15} />
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteHero(hero.id)}
                      disabled={deleteId === hero.id}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all hover:shadow-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleteId === hero.id ? (
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
                    <th className="px-6 py-4 text-left text-sm font-semibold">Heading</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Sub Heading</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHeroes.map((hero, index) => (
                    <tr
                      key={hero.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="relative w-20 h-16 rounded-lg overflow-hidden shadow-sm">
                          <Image
                            src={hero.backgroundImage}
                            alt={hero.heading}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-[#081B37]">
                        {hero.heading}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {hero.subHeading}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            hero.active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {hero.active ? (
                            <Eye size={12} />
                          ) : (
                            <EyeOff size={12} />
                          )}
                          {hero.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/hero/edit/${hero.id}`}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all hover:shadow-md"
                            aria-label="Edit hero"
                          >
                            <Pencil size={17} />
                          </Link>
                          <button
                            onClick={() => deleteHero(hero.id)}
                            disabled={deleteId === hero.id}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Delete hero"
                          >
                            {deleteId === hero.id ? (
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