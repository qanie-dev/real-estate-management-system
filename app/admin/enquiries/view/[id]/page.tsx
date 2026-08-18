"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  FileText,
  Calendar,
  MessageSquare,
  Download,
  Printer,
  Trash2,
  Reply,
  Clock,
  CheckCircle,
} from "lucide-react";

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function ViewEnquiryPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchEnquiry();
  }, []);

  async function fetchEnquiry() {
    try {
      const res = await fetch(`/api/enquiries/${params.id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch enquiry");
      }

      const data = await res.json();
      setEnquiry(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load enquiry");
      router.push("/admin/enquiries");
    } finally {
      setLoading(false);
    }
  }

  async function deleteEnquiry() {
    const confirmDelete = confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmDelete) return;

    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/enquiries/${params.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Enquiry deleted successfully.");
        router.push("/admin/enquiries");
      } else {
        alert("Delete failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setDeleteLoading(false);
    }
  }

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          <div className="relative inline-block">
            <div className="w-12 h-12 border-4 border-[#081B37]/20 border-t-[#081B37] rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-[#081B37] font-medium">Loading enquiry...</p>
        </div>
      </div>
    );
  }

  if (!enquiry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-[#081B37]">Enquiry Not Found</h2>
          <p className="text-gray-500 mt-2">The enquiry you're looking for doesn't exist</p>
          <button
            onClick={() => router.push("/admin/enquiries")}
            className="mt-6 bg-[#081B37] text-white px-6 py-3 rounded-xl hover:bg-[#1a3a5c] transition-all"
          >
            Back to Enquiries
          </button>
        </div>
      </div>
    );
  }

  const getTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="group bg-white hover:bg-gray-50 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 border border-gray-100 hover:-translate-y-0.5"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-[#081B37]">Back to Enquiries</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all hover:shadow-md"
            >
              <Printer size={18} />
              Print
            </button>
            <button
              onClick={deleteEnquiry}
              disabled={deleteLoading}
              className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleteLoading ? (
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Trash2 size={18} />
              )}
              Delete
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-[#081B37] to-[#1a3a5c] px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                  <MessageSquare className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Enquiry Details
                  </h1>
                  <p className="text-blue-200/80 text-sm mt-0.5">
                    View complete enquiry information
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <Clock size={16} className="text-blue-200" />
                <span className="text-sm text-blue-200 font-medium">
                  {getTimeAgo(enquiry.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Quick Info Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Name</p>
                  <p className="text-sm font-semibold text-[#081B37]">{enquiry.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mail size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Email</p>
                  <a href={`mailto:${enquiry.email}`} className="text-sm font-semibold text-green-600 hover:underline">
                    {enquiry.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Phone size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Phone</p>
                  <a href={`tel:${enquiry.phone}`} className="text-sm font-semibold text-purple-600 hover:underline">
                    {enquiry.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar size={18} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Date</p>
                  <p className="text-sm font-semibold text-[#081B37]">
                    {new Date(enquiry.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#081B37] mb-2">
                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  Subject
                </div>
              </label>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[#081B37] font-medium">
                {enquiry.subject}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-[#081B37] mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} />
                  Message
                </div>
              </label>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5 min-h-[200px] text-[#081B37] whitespace-pre-wrap leading-relaxed">
                {enquiry.message}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
              <a
                href={`mailto:${enquiry.email}?subject=Re: ${enquiry.subject}`}
                className="flex-1 min-w-[150px] bg-gradient-to-r from-[#081B37] to-[#1a3a5c] text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:scale-[1.02] font-medium"
              >
                <Reply size={18} />
                Reply via Email
              </a>
              <a
                href={`tel:${enquiry.phone}`}
                className="flex-1 min-w-[150px] bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:scale-[1.02] font-medium"
              >
                <Phone size={18} />
                Call Now
              </a>
              <button
                onClick={handlePrint}
                className="flex-1 min-w-[150px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-md font-medium"
              >
                <Download size={18} />
                Print / Download
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-4 shadow-lg">
            <h4 className="text-sm font-semibold text-[#081B37] mb-2">📊 Status</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">Enquiry received and waiting for response</span>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-4 shadow-lg">
            <h4 className="text-sm font-semibold text-[#081B37] mb-2">💡 Quick Tip</h4>
            <p className="text-xs text-gray-600">Respond to enquiries promptly to provide the best customer experience</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-4 shadow-lg">
            <h4 className="text-sm font-semibold text-[#081B37] mb-2">🕐 Timeline</h4>
            <p className="text-xs text-gray-600">Received {getTimeAgo(enquiry.createdAt)}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(enquiry.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}