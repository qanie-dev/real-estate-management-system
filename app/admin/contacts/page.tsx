"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, User, Trash2, Search, Inbox, MessageSquare, Calendar, Eye, EyeOff } from "lucide-react";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const res = await fetch("/api/contact");

      if (!res.ok) {
        throw new Error("Failed");
      }

      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteMessage(id: number) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    setDeleteId(id);
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setContacts((prev) =>
          prev.filter((item) => item.id !== id)
        );
        alert("Message deleted successfully.");
      } else {
        alert("Delete Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setDeleteId(null);
    }
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase()) ||
    contact.email.toLowerCase().includes(search.toLowerCase()) ||
    contact.subject.toLowerCase().includes(search.toLowerCase()) ||
    contact.message.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          <div className="relative inline-block">
            <div className="w-12 h-12 border-4 border-[#081B37]/20 border-t-[#081B37] rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-[#081B37] font-medium">Loading messages...</p>
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
                Contact Messages
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                Manage all contact form submissions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#081B37]/10 px-4 py-2 rounded-xl">
                <span className="text-sm font-semibold text-[#081B37]">
                  Total: {contacts.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Inbox size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Total</p>
                <p className="text-xl font-bold text-[#081B37]">{contacts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">This Week</p>
                <p className="text-xl font-bold text-[#081B37]">
                  {contacts.filter(c => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(c.createdAt) >= weekAgo;
                  }).length}
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
                <p className="text-xs text-gray-500 font-medium">Unique</p>
                <p className="text-xl font-bold text-[#081B37]">
                  {new Set(contacts.map(c => c.email)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Today</p>
                <p className="text-xl font-bold text-[#081B37]">
                  {contacts.filter(c => {
                    const today = new Date().toDateString();
                    return new Date(c.createdAt).toDateString() === today;
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#081B37]/20 focus:border-[#081B37] transition-all text-[#081B37] placeholder-gray-400"
                placeholder="Search messages..."
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
                  <Eye size={18} />
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
                  <EyeOff size={18} />
                </button>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {filteredContacts.length} {filteredContacts.length === 1 ? 'message' : 'messages'}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {filteredContacts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-[#081B37]">No messages found</h3>
            <p className="text-gray-500 mt-2 text-sm">
              {search ? 'Try adjusting your search terms' : 'All contact messages will appear here'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#081B37]/10 rounded-full flex items-center justify-center">
                        <User size={20} className="text-[#081B37]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#081B37]">
                          {contact.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteMessage(contact.id)}
                      disabled={deleteId === contact.id}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      {deleteId === contact.id ? (
                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={14} className="text-gray-400" />
                      <a href={`mailto:${contact.email}`} className="hover:text-[#081B37] hover:underline">
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={14} className="text-gray-400" />
                      <a href={`tel:${contact.phone}`} className="hover:text-[#081B37] hover:underline">
                        {contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs font-semibold text-[#081B37]">Subject</p>
                    <p className="text-sm text-gray-700 mt-1">{contact.subject}</p>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-semibold text-[#081B37]">Message</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                      {contact.message}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {new Date(contact.createdAt).toLocaleString()}
                    </span>
                    <a
                      href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      Reply
                    </a>
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
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        Name
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      <div className="flex items-center gap-2">
                        <Mail size={16} />
                        Email
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        Phone
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact, index) => (
                    <tr
                      key={contact.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#081B37]/10 rounded-full flex items-center justify-center">
                            <User size={14} className="text-[#081B37]" />
                          </div>
                          <span className="font-medium text-[#081B37]">
                            {contact.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-blue-600 hover:underline flex items-center gap-1.5 text-sm"
                        >
                          <Mail size={14} />
                          {contact.email}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-gray-600 hover:text-[#081B37] flex items-center gap-1.5 text-sm"
                        >
                          <Phone size={14} />
                          {contact.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                          {contact.subject}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all hover:shadow-md"
                            aria-label="Reply"
                            title="Reply"
                          >
                            <Mail size={17} />
                          </a>
                          <button
                            onClick={() => deleteMessage(contact.id)}
                            disabled={deleteId === contact.id}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Delete message"
                            title="Delete"
                          >
                            {deleteId === contact.id ? (
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
            {filteredContacts.length > 0 && (
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Showing {filteredContacts.length} of {contacts.length} messages
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