"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  User, 
  Mail, 
  Phone, 
  Briefcase,
  Grid3x3,
  List,
  Users as UsersIcon
} from "lucide-react";

interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  designation: string;
  image?: string;
  active?: boolean;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  async function fetchAgents() {
    try {
      const res = await fetch("/api/agents");
      const data = await res.json();
      setAgents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteAgent(id: number) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this agent?"
    );

    if (!confirmDelete) return;

    setDeleteId(id);
    try {
      const res = await fetch(`/api/agents/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setAgents((prev) => prev.filter((agent) => agent.id !== id));
        alert("Agent deleted successfully.");
      } else {
        alert("Failed to delete agent. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setDeleteId(null);
    }
  }

  const filteredAgents = agents.filter((agent) => {
    const term = search.toLowerCase();

    return (
      agent.name.toLowerCase().includes(term) ||
      agent.email.toLowerCase().includes(term) ||
      agent.phone.toLowerCase().includes(term) ||
      agent.designation.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          <div className="relative inline-block">
            <div className="w-12 h-12 border-4 border-[#081B37]/20 border-t-[#081B37] rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-[#081B37] font-medium">Loading agents...</p>
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
                Agents
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                Manage all real estate agents
              </p>
            </div>

            <Link
              href="/admin/agents/add"
              className="inline-flex items-center gap-2 bg-[#081B37] hover:bg-[#1a3a5c] text-white px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 font-medium text-sm"
            >
              <Plus size={18} />
              Add Agent
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UsersIcon size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Agents</p>
                <p className="text-xl font-bold text-[#081B37]">{agents.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <User size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Active</p>
                <p className="text-xl font-bold text-[#081B37]">
                  {agents.filter(a => a.active !== false).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Briefcase size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Designations</p>
                <p className="text-xl font-bold text-[#081B37]">
                  {new Set(agents.map(a => a.designation)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Phone size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Contacts</p>
                <p className="text-xl font-bold text-[#081B37]">{agents.length}</p>
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
                placeholder="Search agents..."
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
                {filteredAgents.length} {filteredAgents.length === 1 ? 'agent' : 'agents'}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {filteredAgents.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="text-6xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-[#081B37]">No agents found</h3>
            <p className="text-gray-500 mt-2 text-sm">
              {search ? 'Try adjusting your search terms' : 'Start by adding your first agent'}
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
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                <div className="p-5 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#081B37] to-[#1a3a5c] text-white flex items-center justify-center text-3xl font-bold mx-auto shadow-lg">
                    {agent.name.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="font-semibold text-[#081B37] mt-3 text-lg">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-[#D4A017] font-medium">
                    {agent.designation}
                  </p>
                  <div className="mt-3 space-y-1.5 text-sm">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Mail size={14} className="text-gray-400" />
                      {agent.email}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Phone size={14} className="text-gray-400" />
                      {agent.phone}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/admin/agents/edit/${agent.id}`}
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all hover:shadow-md text-sm font-medium"
                    >
                      <Pencil size={15} />
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteAgent(agent.id)}
                      disabled={deleteId === agent.id}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all hover:shadow-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleteId === agent.id ? (
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
                    <th className="px-6 py-4 text-left text-sm font-semibold">Agent</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Designation</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgents.map((agent, index) => (
                    <tr
                      key={agent.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#081B37] text-white flex items-center justify-center font-bold text-sm">
                            {agent.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-[#081B37]">
                            {agent.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Mail size={14} className="text-gray-400" />
                          {agent.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Phone size={14} className="text-gray-400" />
                          {agent.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 bg-[#D4A017]/10 text-[#D4A017] rounded-full text-xs font-medium">
                          {agent.designation}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/agents/edit/${agent.id}`}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all hover:shadow-md"
                            aria-label="Edit agent"
                          >
                            <Pencil size={17} />
                          </Link>
                          <button
                            onClick={() => deleteAgent(agent.id)}
                            disabled={deleteId === agent.id}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Delete agent"
                          >
                            {deleteId === agent.id ? (
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
            {filteredAgents.length > 0 && (
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Showing {filteredAgents.length} of {agents.length} agents
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