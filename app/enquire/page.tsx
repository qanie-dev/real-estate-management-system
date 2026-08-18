"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Building2,
  Target,
  Clock,
} from "lucide-react";

export default function EnquirePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    purpose: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    setStatus({
      type: null,
      message: "",
    });

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `${formData.propertyType} - ${formData.purpose}`,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message:
            "Your enquiry has been submitted successfully! Our team will contact you shortly.",
        });

        setFormData({
          name: "",
          phone: "",
          email: "",
          propertyType: "",
          purpose: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message:
            data.message ||
            "Failed to submit enquiry. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);

      setStatus({
        type: "error",
        message:
          "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white overflow-hidden">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative min-h-[360px] sm:min-h-[400px] flex items-center">

        <Image
          src="/images/Hero.jpeg"
          alt="Enquire Now"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-[#081B37]/80" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-20 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#C79A54]/20 px-4 py-2 rounded-full backdrop-blur-sm border border-[#C79A54]/30">

            <Building2
              size={16}
              className="text-[#C79A54] flex-shrink-0"
            />

            <span className="text-[#C79A54] text-xs sm:text-sm font-medium uppercase tracking-wider">
              HomeLuxe Pakistan
            </span>

          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-5 sm:mt-6 tracking-tight">
            Enquire Now
          </h1>

          {/* Divider */}
          <div className="w-16 sm:w-20 h-1 bg-[#C79A54] rounded-full mt-4 mx-auto" />

          {/* Description */}
          <p className="text-gray-200 mt-5 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-7 sm:leading-relaxed">
            Looking to buy, sell or rent a property? Fill out the
            enquiry form below and one of our property consultants
            will contact you shortly.
          </p>

        </div>
      </section>


      {/* =====================================================
          ENQUIRY SECTION
      ====================================================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FDF8F2] to-white">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">

            {/* =================================================
                LEFT INFO CARD
            ================================================== */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#081B37] to-[#1a3a5c] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 text-white shadow-xl lg:shadow-2xl">

              {/* Availability */}
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">

                <Clock
                  size={16}
                  className="text-[#C79A54]"
                />

                <span className="text-xs font-medium text-gray-300">
                  Available 24/7
                </span>

              </div>


              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl font-bold mt-5 sm:mt-6">
                Why Choose HomeLuxe?
              </h2>


              {/* Description */}
              <p className="text-gray-300 mt-4 sm:mt-6 leading-7 sm:leading-relaxed text-sm sm:text-base">
                We connect buyers, sellers and investors with
                premium residential and commercial properties
                throughout Pakistan.
              </p>


              {/* Contact Details */}
              <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-12">

                {/* Address */}
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">

                  <div className="p-2 bg-[#C79A54]/20 rounded-lg h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center flex-shrink-0">

                    <MapPin
                      className="text-[#C79A54]"
                      size={20}
                    />

                  </div>

                  <div className="min-w-0">

                    <h3 className="font-semibold text-white text-sm sm:text-base">
                      Office Address
                    </h3>

                    <p className="text-gray-300 text-xs sm:text-sm mt-1 leading-5">
                      Office #12, Main Boulevard,
                      Gulberg III, Lahore
                    </p>

                  </div>

                </div>


                {/* Phone */}
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">

                  <div className="p-2 bg-[#C79A54]/20 rounded-lg h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center flex-shrink-0">

                    <Phone
                      className="text-[#C79A54]"
                      size={20}
                    />

                  </div>

                  <div className="min-w-0">

                    <h3 className="font-semibold text-white text-sm sm:text-base">
                      Phone
                    </h3>

                    <a
                      href="tel:+923001234567"
                      className="text-gray-300 text-xs sm:text-sm hover:text-[#C79A54] transition-colors block mt-1"
                    >
                      +92 300 1234567
                    </a>

                  </div>

                </div>


                {/* Email */}
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">

                  <div className="p-2 bg-[#C79A54]/20 rounded-lg h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center flex-shrink-0">

                    <Mail
                      className="text-[#C79A54]"
                      size={20}
                    />

                  </div>

                  <div className="min-w-0">

                    <h3 className="font-semibold text-white text-sm sm:text-base">
                      Email
                    </h3>

                    <a
                      href="mailto:info@homeluxe.pk"
                      className="text-gray-300 text-xs sm:text-sm hover:text-[#C79A54] transition-colors block mt-1 break-all"
                    >
                      info@homeluxe.pk
                    </a>

                  </div>

                </div>

              </div>


              {/* Trust Section */}
              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10">

                <div className="flex items-center gap-3">

                  <div className="flex -space-x-2 flex-shrink-0">

                    <div className="w-8 h-8 rounded-full bg-[#C79A54]/30 border-2 border-[#081B37] flex items-center justify-center text-xs font-bold text-white">
                      A
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#C79A54]/20 border-2 border-[#081B37] flex items-center justify-center text-xs font-bold text-white">
                      B
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#C79A54]/10 border-2 border-[#081B37] flex items-center justify-center text-xs font-bold text-white">
                      C
                    </div>

                  </div>

                  <p className="text-xs sm:text-sm text-gray-300">
                    Trusted by 1000+ clients
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                RIGHT FORM
            ================================================== */}
            <div className="lg:col-span-3 bg-white rounded-2xl sm:rounded-3xl shadow-xl lg:shadow-2xl p-5 sm:p-8 lg:p-10 border border-gray-100">

              {/* Form Header */}
              <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#081B37]">
                    Property Enquiry Form
                  </h2>

                  <p className="text-gray-500 mt-2 text-xs sm:text-sm leading-5">
                    Complete the form below and we'll get back to
                    you as soon as possible.
                  </p>

                </div>

                <div className="p-2 bg-[#081B37]/5 rounded-xl flex-shrink-0">

                  <Target
                    size={20}
                    className="text-[#081B37]"
                  />

                </div>

              </div>


              {/* =================================================
                  SUCCESS MESSAGE
              ================================================== */}
              {status.type === "success" && (
                <div className="mt-6 p-4 sm:p-5 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">

                  <div className="p-1 bg-green-100 rounded-full flex-shrink-0">

                    <CheckCircle
                      size={18}
                      className="text-green-600"
                    />

                  </div>

                  <div>

                    <p className="font-semibold text-green-800">
                      Success!
                    </p>

                    <p className="text-green-700 text-sm mt-1">
                      {status.message}
                    </p>

                  </div>

                </div>
              )}


              {/* =================================================
                  ERROR MESSAGE
              ================================================== */}
              {status.type === "error" && (
                <div className="mt-6 p-4 sm:p-5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">

                  <div className="p-1 bg-red-100 rounded-full flex-shrink-0">

                    <AlertCircle
                      size={18}
                      className="text-red-600"
                    />

                  </div>

                  <div>

                    <p className="font-semibold text-red-800">
                      Error!
                    </p>

                    <p className="text-red-700 text-sm mt-1">
                      {status.message}
                    </p>

                  </div>

                </div>
              )}


              {/* =================================================
                  FORM
              ================================================== */}
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-7 sm:mt-8"
              >

                {/* Full Name */}
                <div className="relative md:col-span-2">

                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                    <User size={18} />

                  </div>

                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 font-medium"
                  />

                </div>


                {/* Phone */}
                <div className="relative">

                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                    <Phone size={18} />

                  </div>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 font-medium"
                  />

                </div>


                {/* Email */}
                <div className="relative">

                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                    <Mail size={18} />

                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 font-medium"
                  />

                </div>


                {/* Property Type */}
                <div className="relative">

                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">

                    <Home size={18} />

                  </div>

                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-10 py-3 sm:py-3.5 text-sm sm:text-base text-[#081B37] focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 font-medium appearance-none cursor-pointer"
                  >

                    <option value="">
                      Property Type
                    </option>

                    <option value="House">
                      House
                    </option>

                    <option value="Apartment">
                      Apartment
                    </option>

                    <option value="Villa">
                      Villa
                    </option>

                    <option value="Commercial">
                      Commercial
                    </option>

                    <option value="Plot">
                      Plot
                    </option>

                  </select>

                </div>


                {/* Purpose */}
                <div className="relative">

                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-base text-[#081B37] focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 font-medium appearance-none cursor-pointer"
                  >

                    <option value="">
                      Purpose
                    </option>

                    <option value="Buy">
                      Buy Property
                    </option>

                    <option value="Sell">
                      Sell Property
                    </option>

                    <option value="Rent">
                      Rent Property
                    </option>

                    <option value="Investment">
                      Investment
                    </option>

                  </select>

                </div>


                {/* Message */}
                <div className="relative md:col-span-2">

                  <div className="absolute left-4 top-4 text-gray-400">

                    <MessageSquare size={18} />

                  </div>

                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 font-medium resize-none"
                  />

                </div>


                {/* Submit Button */}
                <div className="md:col-span-2">

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#081B37] to-[#1a3a5c] hover:from-[#1a3a5c] hover:to-[#081B37] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base"
                  >

                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

                        <span>
                          Submitting...
                        </span>
                      </>
                    ) : (
                      <>
                        <span>
                          Submit Enquiry
                        </span>

                        <Send
                          size={18}
                          className="transition-transform"
                        />
                      </>
                    )}

                  </button>

                  <p className="text-[11px] sm:text-xs text-gray-400 text-center mt-3 leading-5">
                    By submitting, you agree to our Privacy Policy
                    and Terms of Service
                  </p>

                </div>

              </form>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}