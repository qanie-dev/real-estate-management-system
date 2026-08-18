"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Grid3x3, List, MapPin, Building, CheckCircle, Clock, XCircle } from "lucide-react";

interface Project {
  id: number;
  title: string;
  location: string;
  status: string;
  image?: string | null;
  description?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(id: number) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeleteId(id);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProjects((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("Failed to delete project. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setDeleteId(null);
    }
  }

  const filtered = projects.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'completed': 'bg-green-100 text-green-700',
      'ongoing': 'bg-blue-100 text-blue-700',
      'planning': 'bg-yellow-100 text-yellow-700',
      'on-hold': 'bg-orange-100 text-orange-700',
      'cancelled': 'bg-red-100 text-red-700',
    };
    return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, React.ReactNode> = {
      'completed': <CheckCircle size={14} />,
      'ongoing': <Clock size={14} />,
      'planning': <Building size={14} />,
      'on-hold': <Clock size={14} />,
      'cancelled': <XCircle size={14} />,
    };
    return icons[status.toLowerCase()] || null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#081B37] tracking-tight">
                Projects
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                Manage and oversee all your construction projects
              </p>
            </div>

            <Link
              href="/admin/projects/add"
              className="inline-flex items-center gap-2 bg-[#081B37] hover:bg-[#1a3a5c] text-white px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 font-medium text-sm"
            >
              <Plus size={18} />
              Add Project
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
                placeholder="Search projects..."
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
                {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
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
            <p className="mt-4 text-gray-500 font-medium">Loading projects...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="text-5xl mb-4">🏗️</div>
            <h3 className="text-xl font-semibold text-[#081B37]">No projects found</h3>
            <p className="text-gray-500 mt-2 text-sm">
              {search ? 'Try adjusting your search terms' : 'Start by adding your first project'}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building size={48} className="text-gray-300" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)} shadow-sm`}>
                      {getStatusIcon(project.status)}
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-semibold text-[#081B37] truncate mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    <MapPin size={14} />
                    {project.location}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Link
                      href={`/admin/projects/edit/${project.id}`}
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all hover:shadow-md text-sm font-medium"
                    >
                      <Pencil size={15} />
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProject(project.id)}
                      disabled={deleteId === project.id}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all hover:shadow-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleteId === project.id ? (
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
                    <th className="px-6 py-4 text-left text-sm font-semibold">Project</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((project, index) => (
                    <tr
                      key={project.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                            {project.image ? (
                              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            ) : (
                              <Building size={18} className="text-gray-400" />
                            )}
                          </div>
                          <span className="font-medium text-[#081B37]">{project.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-gray-400" />
                          {project.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {getStatusIcon(project.status)}
                          {project.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/projects/edit/${project.id}`}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all hover:shadow-md"
                            aria-label="Edit project"
                          >
                            <Pencil size={17} />
                          </Link>
                          <button
                            onClick={() => deleteProject(project.id)}
                            disabled={deleteId === project.id}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Delete project"
                          >
                            {deleteId === project.id ? (
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