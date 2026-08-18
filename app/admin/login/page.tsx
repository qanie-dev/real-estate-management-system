"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("admin", "true");
        sessionStorage.setItem("admin", "true");
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-[#F8F6F2]">
      {/* Left Side - Hero Section */}
      <div
        className="hidden lg:flex relative items-center justify-center"
        style={{
          backgroundImage: "url('/images/Hero.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#081B37]/85 backdrop-blur-sm" />

        <div className="relative z-10 text-center px-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-[#C79A54]/20 rounded-full blur-2xl"></div>
            <Image
              src="/images/Navbarlogo.png"
              alt="Logo"
              width={100}
              height={100}
              className="relative mx-auto"
            />
          </div>

          <h1 className="text-5xl font-bold text-white mt-2 tracking-tight">
            HOMELUXE
          </h1>

          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="w-12 h-0.5 bg-[#C79A54]"></span>
            <p className="uppercase tracking-[8px] text-[#C79A54] font-medium text-sm">
              Find • Invest • Live
            </p>
            <span className="w-12 h-0.5 bg-[#C79A54]"></span>
          </div>

          <div className="mt-10 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <p className="text-gray-200 leading-8 text-base max-w-lg mx-auto">
              Welcome to the HomeLuxe Administration Panel.
              <br />
              <span className="text-gray-300">
                Manage properties, projects, enquiries,
                contact messages and website content from one place.
              </span>
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-gray-400 text-xs">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-[#C79A54]" />
              <span>Secure Login</span>
            </div>
            <div className="w-px h-4 bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <span>⚡</span>
              <span>Fast Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#081B37]/5 rounded-2xl mb-4">
              <Shield size={28} className="text-[#081B37]" />
            </div>
            <h2 className="text-3xl font-bold text-[#081B37]">
              Admin Login
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Sign in to continue to your dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="admin@homeluxe.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-12 pr-4 py-3.5 text-[#081B37] placeholder-gray-400 outline-none focus:border-[#C79A54] focus:bg-white transition-all duration-300 font-medium"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-[#C79A54] hover:underline font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-12 pr-12 py-3.5 text-[#081B37] placeholder-gray-400 outline-none focus:border-[#C79A54] focus:bg-white transition-all duration-300 font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#081B37] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <span className="text-red-500">⚠️</span>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-gradient-to-r from-[#081B37] to-[#1a3a5c] hover:from-[#0F2C5C] hover:to-[#081B37] text-white rounded-xl py-4 font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">
              © {new Date().getFullYear()} HomeLuxe Real Estate Management System
            </p>
            <p className="text-center text-xs text-gray-400 mt-1">
              Secure • Reliable • Professional
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}