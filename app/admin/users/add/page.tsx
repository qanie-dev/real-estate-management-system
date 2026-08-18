"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Lock,
} from "lucide-react";

export default function AddUserPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("User added successfully.");
        router.push("/admin/users");
      } else {
        alert(data.message || "Failed to add user.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-3xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-4xl font-bold text-[#081B37]">
              Add Admin User
            </h1>

            <p className="text-gray-500 mt-2">
              Create a new administrator account.
            </p>

          </div>

          <Link
            href="/admin/users"
            className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >

          {/* Name */}

          <div>

            <label className="font-semibold text-gray-700 flex items-center gap-2 mb-2">

              <User size={18} />

              Full Name

            </label>

            <input
              type="text"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#081B37]"
              placeholder="Enter full name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

          </div>

          {/* Email */}

          <div>

            <label className="font-semibold text-gray-700 flex items-center gap-2 mb-2">

              <Mail size={18} />

              Email Address

            </label>

            <input
              type="email"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#081B37]"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

          </div>

          {/* Password */}

          <div>

            <label className="font-semibold text-gray-700 flex items-center gap-2 mb-2">

              <Lock size={18} />

              Password

            </label>

            <input
              type="password"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#081B37]"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

          </div>

          {/* Confirm Password */}
                    <div>
            <label className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
              <Lock size={18} />
              Confirm Password
            </label>

            <input
              type="password"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#081B37]"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#081B37] hover:bg-[#16335F] disabled:opacity-50 text-white px-8 py-3 rounded-xl transition"
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save User"}
            </button>

            <Link
              href="/admin/users"
              className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition text-gray-700 font-medium"
            >
              Cancel
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
}