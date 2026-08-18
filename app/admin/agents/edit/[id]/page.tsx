"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Image as ImageIcon,
  FileText,
  X,
  Upload,
  RefreshCw,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function EditAgentPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    designation: "",
    email: "",
    phone: "",
    image: "",
    experience: "",
    address: "",
    description: "",
    facebook: "",
    instagram: "",
    linkedin: "",
  });

  useEffect(() => {
    fetchAgent();
  }, []);

  async function fetchAgent() {
    try {
      const res = await fetch(`/api/agents/${id}`);

      if (!res.ok) {
        setError("Agent not found.");
        setTimeout(() => router.push("/admin/agents"), 2000);
        return;
      }

      const data = await res.json();

      setForm({
        name: data.name || "",
        designation: data.designation || "",
        email: data.email || "",
        phone: data.phone || "",
        image: data.image || "",
        experience: data.experience || "",
        address: data.address || "",
        description: data.description || "",
        facebook: data.facebook || "",
        instagram: data.instagram || "",
        linkedin: data.linkedin || "",
      });
    } catch (error) {
      console.error(error);
      setError("Failed to load agent.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let imageUrl = form.image;

      // Upload image if selected
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await uploadRes.json();

        if (!uploadRes.ok) {
          setError(uploadResult.message || "Image upload failed");
          setSaving(false);
          return;
        }

        imageUrl = uploadResult.imageUrl;
      }

      const res = await fetch(`/api/agents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          image: imageUrl,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Agent updated successfully.");
        router.push("/admin/agents");
      } else {
        setError(data.message || "Failed to update agent.");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    
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

  const removeNewImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const removeCurrentImage = async () => {
    if (!confirm("Remove current image?")) return;
    setForm({ ...form, image: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          <div className="relative inline-block">
            <div className="w-12 h-12 border-4 border-[#081B37]/20 border-t-[#081B37] rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-[#081B37] font-medium">Loading agent...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#081B37] tracking-tight">
              Edit Agent
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Update agent profile information
            </p>
          </div>

          <button
            onClick={() => router.push("/admin/agents")}
            className="group bg-white hover:bg-gray-50 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 border border-gray-100 hover:-translate-y-0.5"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-[#081B37]">Back to Agents</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#081B37] to-[#1a3a5c] px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                <RefreshCw className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Edit Agent Profile
                </h2>
                <p className="text-blue-200/80 text-sm mt-0.5">
                  Update the agent's information below
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mx-8 mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
              <X size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#081B37] mb-2">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      Name <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 font-medium"
                      placeholder="Enter agent name"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <div className={`h-2 w-2 rounded-full ${form.name ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-300`}></div>
                    </div>
                  </div>
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-sm font-semibold text-[#081B37] mb-2">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} />
                      Designation <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={form.designation}
                      onChange={(e) =>
                        setForm({ ...form, designation: e.target.value })
                      }
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 font-medium"
                      placeholder="Senior Property Consultant"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <div className={`h-2 w-2 rounded-full ${form.designation ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-300`}></div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#081B37] mb-2">
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      Email <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 font-medium"
                      placeholder="agent@homeluxe.pk"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <div className={`h-2 w-2 rounded-full ${form.email ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-300`}></div>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-[#081B37] mb-2">
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      Phone <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 font-medium"
                      placeholder="+92 300 1234567"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <div className={`h-2 w-2 rounded-full ${form.phone ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-300`}></div>
                    </div>
                  </div>
                </div>

                {/* Image Section */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#081B37] mb-2">
                    <div className="flex items-center gap-2">
                      <ImageIcon size={16} />
                      Agent Image
                    </div>
                  </label>

                  {/* Current Image */}
                  {form.image && !imagePreview && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Current Image</p>
                      <div className="relative group inline-block">
                        <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
                          <img
                            src={form.image}
                            alt="Current agent"
                            className="w-32 h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button
                              type="button"
                              onClick={removeCurrentImage}
                              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500 text-center">
                          Hover to remove • Click × to delete
                        </p>
                      </div>
                    </div>
                  )}

                  {/* New Image Preview */}
                  {imagePreview && (
                    <div className="relative group mb-4">
                      <div className="relative rounded-xl overflow-hidden border-2 border-[#C79A54] border-dashed bg-gray-50">
                        <img
                          src={imagePreview}
                          alt="New agent preview"
                          className="w-32 h-32 object-cover mx-auto"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={removeNewImage}
                            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                          >
                            <X size={24} />
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-green-600 font-medium text-center">
                        ✓ New image ready to upload
                      </p>
                    </div>
                  )}

                  {/* Upload Area */}
                  <div className="relative">
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#C79A54] hover:bg-[#C79A54]/5 transition-all duration-300 group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="p-3 bg-[#C79A54]/10 rounded-full group-hover:bg-[#C79A54]/20 transition-colors duration-300">
                          <Upload className="w-8 h-8 text-[#C79A54]" />
                        </div>
                        <p className="mt-3 text-sm font-medium text-[#081B37]">
                          {form.image ? 'Click to change image' : 'Click to upload image'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          SVG, PNG, JPG (Recommended: 400x400px)
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
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-semibold text-[#081B37] mb-2">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} />
                      Experience
                    </div>
                  </label>
                  <input
                    type="text"
                    value={form.experience}
                    onChange={(e) =>
                      setForm({ ...form, experience: e.target.value })
                    }
                    placeholder="8 Years"
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 font-medium"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-[#081B37] mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      Address
                    </div>
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    placeholder="Gulberg III, Lahore"
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 font-medium"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#081B37] mb-2">
                    <div className="flex items-center gap-2">
                      <FileText size={16} />
                      Description
                    </div>
                  </label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Write a brief description about the agent..."
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 font-medium resize-none"
                  />
                  <div className="flex justify-between mt-1.5">
                    <p className="text-xs text-gray-500">Provide a brief description of the agent</p>
                    <span className="text-xs text-gray-400">{form.description.length} characters</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="md:col-span-2">
                  <h3 className="text-sm font-semibold text-[#081B37] mb-3">Social Links</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        <div className="flex items-center gap-1.5">
                          <FaFacebookF size={14} className="text-blue-600" />
                          Facebook
                        </div>
                      </label>
                      <input
                        type="text"
                        value={form.facebook}
                        onChange={(e) =>
                          setForm({ ...form, facebook: e.target.value })
                        }
                        placeholder="https://facebook.com/username"
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        <div className="flex items-center gap-1.5">
                          <FaInstagram size={14} className="text-pink-600" />
                          Instagram
                        </div>
                      </label>
                      <input
                        type="text"
                        value={form.instagram}
                        onChange={(e) =>
                          setForm({ ...form, instagram: e.target.value })
                        }
                        placeholder="https://instagram.com/username"
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        <div className="flex items-center gap-1.5">
                          <FaLinkedinIn size={14} className="text-blue-700" />
                          LinkedIn
                        </div>
                      </label>
                      <input
                        type="text"
                        value={form.linkedin}
                        onChange={(e) =>
                          setForm({ ...form, linkedin: e.target.value })
                        }
                        placeholder="https://linkedin.com/in/username"
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2.5 text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.push("/admin/agents")}
                  className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all hover:shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="group bg-gradient-to-r from-[#081B37] to-[#1a3a5c] hover:from-[#1a3a5c] hover:to-[#081B37] text-white px-8 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg font-medium"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} className="group-hover:scale-110 transition-transform" />
                      <span>Update Agent</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Quick Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-4 shadow-lg">
            <h4 className="text-sm font-semibold text-[#081B37] mb-2">📝 Tips</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Update agent details to keep information current</li>
              <li>• Replace images for better visual representation</li>
              <li>• Changes will reflect immediately on the site</li>
            </ul>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-4 shadow-lg">
            <h4 className="text-sm font-semibold text-[#081B37] mb-2">⚡ Quick Info</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Image: {form.image ? '✅ Set' : '❌ Not set'}</li>
              <li>• New image: {imageFile ? '✅ Selected' : '❌ None'}</li>
              <li>• Agent ID: {id}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}