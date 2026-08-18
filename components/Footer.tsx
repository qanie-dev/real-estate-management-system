"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#081B37] text-white">

      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pb-7 sm:pb-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-14">

          {/* Company */}
          <div className="sm:col-span-2 lg:col-span-1">

            <h2 className="text-3xl font-bold">
              Home<span className="text-[#C79A54]">Luxe</span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-7 sm:leading-8 mt-5 sm:mt-6 max-w-md">
              HomeLuxe Pakistan is your trusted real estate partner,
              helping you buy, sell and rent residential and commercial
              properties across Pakistan with honesty, transparency
              and professional guidance.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8">

              <Link
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-[#C79A54] flex items-center justify-center transition duration-300"
              >
                <FaFacebookF size={17} />
              </Link>

              <Link
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-[#C79A54] flex items-center justify-center transition duration-300"
              >
                <FaInstagram size={17} />
              </Link>

              <Link
                href="#"
                aria-label="X"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-[#C79A54] flex items-center justify-center transition duration-300"
              >
                <FaXTwitter size={17} />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-[#C79A54] flex items-center justify-center transition duration-300"
              >
                <FaLinkedinIn size={17} />
              </Link>

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-7">
              Quick Links
            </h3>

            <ul className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">

              <li>
                <Link
                  href="/"
                  className="hover:text-[#C79A54] transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-[#C79A54] transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/properties"
                  className="hover:text-[#C79A54] transition"
                >
                  Properties
                </Link>
              </li>

              <li>
                <Link
                  href="/projects"
                  className="hover:text-[#C79A54] transition"
                >
                  Projects
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#C79A54] transition"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Services */}
          <div>

            <h3 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-7">
              Our Services
            </h3>

            <ul className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">

              <li>Buy Residential Property</li>
              <li>Sell Property</li>
              <li>Rent Property</li>
              <li>Commercial Property</li>
              <li>Real Estate Consultancy</li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-7">
              Contact Us
            </h3>

            <div className="space-y-5 sm:space-y-6">

              {/* Address */}
              <div className="flex items-start gap-3 sm:gap-4">

                <MapPin
                  size={21}
                  className="text-[#C79A54] mt-1 flex-shrink-0"
                />

                <p className="text-gray-300 text-sm sm:text-base leading-6 sm:leading-7">
                  Office #12, Main Boulevard,
                  Gulberg III, Lahore, Pakistan
                </p>

              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 sm:gap-4">

                <Phone
                  size={20}
                  className="text-[#C79A54] flex-shrink-0"
                />

                <p className="text-gray-300 text-sm sm:text-base break-all">
                  +92 300 1234567
                </p>

              </div>

              {/* Email */}
              <div className="flex items-center gap-3 sm:gap-4">

                <Mail
                  size={20}
                  className="text-[#C79A54] flex-shrink-0"
                />

                <p className="text-gray-300 text-sm sm:text-base break-all">
                  info@homeluxe.pk
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 mt-12 sm:mt-16 pt-9 sm:pt-12">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-7 sm:gap-8">

            {/* Newsletter Text */}
            <div className="w-full lg:max-w-2xl">

              <h3 className="text-xl sm:text-2xl font-semibold">
                Subscribe for Property Updates
              </h3>

              <p className="text-gray-300 text-sm sm:text-base leading-6 sm:leading-7 mt-2">
                Receive the latest property listings, investment
                opportunities and real estate news from across Pakistan.
              </p>

            </div>

            {/* Newsletter Form */}
            <div className="flex w-full lg:w-auto">

              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 lg:w-80 px-4 sm:px-5 py-3.5 sm:py-4 rounded-l-xl bg-white text-gray-800 outline-none text-sm sm:text-base"
              />

              <button
                aria-label="Subscribe"
                className="bg-[#C79A54] hover:bg-[#B88942] px-5 sm:px-6 rounded-r-xl transition flex items-center justify-center flex-shrink-0"
              >
                <Send size={19} />
              </button>

            </div>

          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 mt-9 sm:mt-12 pt-7 sm:pt-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            {/* Copyright */}
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} HomeLuxe. All Rights Reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 sm:gap-6 text-xs sm:text-sm">

              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-[#C79A54] transition"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-conditions"
                className="text-gray-400 hover:text-[#C79A54] transition"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/cookies-policy"
                className="text-gray-400 hover:text-[#C79A54] transition"
              >
                Cookies Policy
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}