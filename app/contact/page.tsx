"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  User,
  MessageSquare,
  Building2,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message:
            "Your message has been sent successfully! We'll get back to you soon.",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message:
            data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);

      setStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white overflow-hidden">

      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="relative min-h-[360px] sm:min-h-[400px] flex items-center">

        <Image
          src="/images/plot.jfif"
          alt="Contact Us"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-[#081B37]/80" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-20 text-center">

          <div className="inline-flex items-center gap-2 bg-[#C79A54]/20 px-4 py-2 rounded-full backdrop-blur-sm border border-[#C79A54]/30">

            <Building2
              size={16}
              className="text-[#C79A54] flex-shrink-0"
            />

            <span className="text-[#C79A54] text-xs sm:text-sm font-medium uppercase tracking-wider">
              Get In Touch
            </span>

          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-5 tracking-tight">
            Contact Us
          </h1>

          <div className="w-16 sm:w-20 h-1 bg-[#C79A54] rounded-full mt-4 mx-auto" />

          <p className="text-gray-200 mt-5 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-7 sm:leading-relaxed">
            We'd love to hear from you. Whether you're buying,
            selling or investing, our team is ready to help.
          </p>

        </div>
      </section>


      {/* =========================
          CONTACT SECTION
      ========================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FDF8F2] to-white">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* =========================
                LEFT SIDE
            ========================== */}
            <div>

              <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[#C79A54] font-semibold text-xs sm:text-sm">
                Get In Touch
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#081B37] mt-4 leading-tight">
                Let's Discuss
                <br />
                <span className="text-[#C79A54]">
                  Your Property
                </span>
              </h2>

              <p className="text-gray-600 leading-7 sm:leading-relaxed mt-5 sm:mt-6 max-w-xl">
                Have questions about buying, selling or renting a
                property? Contact us today and our team will get
                back to you as soon as possible.
              </p>


              {/* Contact Details */}
              <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-12">

                {/* Address */}
                <div className="flex items-start gap-4 sm:gap-5 p-3 sm:p-4 rounded-xl hover:bg-white/60 transition-colors group">

                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C79A54] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">

                    <MapPin
                      className="text-white"
                      size={20}
                    />

                  </div>

                  <div className="min-w-0">

                    <h3 className="font-bold text-lg sm:text-xl text-[#081B37]">
                      Office Address
                    </h3>

                    <p className="text-gray-600 mt-1 text-sm sm:text-base leading-6">
                      Gulberg III, Lahore, Pakistan
                    </p>

                  </div>

                </div>


                {/* Phone */}
                <div className="flex items-start gap-4 sm:gap-5 p-3 sm:p-4 rounded-xl hover:bg-white/60 transition-colors group">

                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C79A54] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">

                    <Phone
                      className="text-white"
                      size={20}
                    />

                  </div>

                  <div className="min-w-0">

                    <h3 className="font-bold text-lg sm:text-xl text-[#081B37]">
                      Phone
                    </h3>

                    <a
                      href="tel:+923001234567"
                      className="text-gray-600 mt-1 hover:text-[#C79A54] transition-colors block text-sm sm:text-base break-words"
                    >
                      +92 300 1234567
                    </a>

                  </div>

                </div>


                {/* Email */}
                <div className="flex items-start gap-4 sm:gap-5 p-3 sm:p-4 rounded-xl hover:bg-white/60 transition-colors group">

                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C79A54] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">

                    <Mail
                      className="text-white"
                      size={20}
                    />

                  </div>

                  <div className="min-w-0">

                    <h3 className="font-bold text-lg sm:text-xl text-[#081B37]">
                      Email
                    </h3>

                    <a
                      href="mailto:info@homeluxe.pk"
                      className="text-gray-600 mt-1 hover:text-[#C79A54] transition-colors block text-sm sm:text-base break-all"
                    >
                      info@homeluxe.pk
                    </a>

                  </div>

                </div>


                {/* Office Hours */}
                <div className="flex items-start gap-4 sm:gap-5 p-3 sm:p-4 rounded-xl hover:bg-white/60 transition-colors group">

                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C79A54] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">

                    <Clock
                      className="text-white"
                      size={20}
                    />

                  </div>

                  <div>

                    <h3 className="font-bold text-lg sm:text-xl text-[#081B37]">
                      Office Hours
                    </h3>

                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      Monday - Saturday
                    </p>

                    <p className="text-gray-600 text-sm sm:text-base">
                      9:00 AM - 6:00 PM
                    </p>

                  </div>

                </div>

              </div>


              {/* Trust Box */}
              <div className="mt-8 sm:mt-10 p-5 sm:p-6 bg-[#081B37]/5 rounded-2xl border border-[#081B37]/10">

                <div className="flex items-center gap-3 sm:gap-4">

                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#C79A54]/20 rounded-full flex items-center justify-center flex-shrink-0">

                    <Building2
                      size={20}
                      className="text-[#C79A54]"
                    />

                  </div>

                  <div className="min-w-0">

                    <p className="font-semibold text-[#081B37] text-sm sm:text-base">
                      Trusted by 1000+ Clients
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      4.9 ★★★★★ Google Reviews
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* =========================
                RIGHT SIDE FORM
            ========================== */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-5 sm:p-8 lg:p-10 border border-gray-100">

              <div className="flex items-start justify-between gap-4 mb-6 sm:mb-8">

                <div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#081B37]">
                    Send Us a Message
                  </h3>

                  <p className="text-gray-500 mt-1 text-xs sm:text-sm">
                    We'll respond within 24 hours
                  </p>

                </div>

                <div className="p-2 bg-[#081B37]/5 rounded-xl flex-shrink-0">

                  <MessageSquare
                    size={20}
                    className="text-[#081B37]"
                  />

                </div>

              </div>


              {/* Success Message */}
              {status.type === "success" && (
                <div className="mb-6 p-4 sm:p-5 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">

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


              {/* Error Message */}
              {status.type === "error" && (
                <div className="mb-6 p-4 sm:p-5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">

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


              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-5"
              >

                {/* Name */}
                <div className="relative">

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
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 font-medium"
                  />

                </div>


                {/* Subject */}
                <div className="relative">

                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <MessageSquare size={18} />
                  </div>

                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base text-[#081B37] placeholder-gray-400 focus:outline-none focus:border-[#C79A54] focus:bg-white focus:ring-4 focus:ring-[#C79A54]/10 transition-all duration-300 font-medium"
                  />

                </div>


                {/* Message */}
                <div className="relative">

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


                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#081B37] to-[#1a3a5c] hover:from-[#1a3a5c] hover:to-[#081B37] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base"
                >

                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

                      <span>
                        Sending...
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        Send Message
                      </span>

                      <Send
                        size={18}
                        className="transition-transform"
                      />
                    </>
                  )}

                </button>


                <p className="text-[11px] sm:text-xs text-gray-400 text-center mt-4 leading-5">
                  By submitting, you agree to our Privacy Policy
                  and Terms of Service
                </p>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          GOOGLE MAP
      ========================== */}
      <section className="h-[350px] sm:h-[400px] lg:h-[450px] relative">

        <iframe
          src="https://www.google.com/maps?q=Gulberg+Lahore&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          title="HomeLuxe Office Location"
        />

        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg border border-gray-200 max-w-[90%]">

          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#081B37] font-medium whitespace-nowrap">

            <MapPin
              size={15}
              className="text-[#C79A54] flex-shrink-0"
            />

            <span>
              Find us on Google Maps
            </span>

            <ArrowRight
              size={13}
              className="flex-shrink-0"
            />

          </div>

        </div>

      </section>

    </main>
  );
}