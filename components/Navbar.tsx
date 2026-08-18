
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<
    "properties" | "services" | null
  >(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close desktop dropdown when clicking outside.
  // IMPORTANT: Do not run this while the mobile menu is open.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Mobile menu is open, so let mobile Links handle the click normally.
      if (mobileOpen) {
        return;
      }

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const toggleMobileDropdown = (
    dropdown: "properties" | "services"
  ) => {
    setOpenDropdown(
      openDropdown === dropdown ? null : dropdown
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-md backdrop-blur-md"
          : "bg-white"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Navbar */}
        <div className="flex min-h-[76px] items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <Image
              src="/images/Navbarlogo.png"
              alt="HomeLuxe Logo"
              width={42}
              height={50}
              className="h-10 w-auto sm:h-[50px]"
            />

            <div className="min-w-0">
              <h1 className="text-[20px] font-bold leading-none text-[#0B1E3D] sm:text-[26px]">
                HOMELUXE
              </h1>

              <p className="mt-1 text-[8px] uppercase tracking-[2px] text-gray-500 sm:text-[10px] sm:tracking-[4px]">
                Find. Invest. Live.
              </p>
            </div>
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <div
            ref={dropdownRef}
            className="hidden items-center lg:flex lg:gap-6 xl:gap-8"
          >
            <nav className="flex items-center gap-5 xl:gap-7">

              {/* Home */}
              <Link
                href="/"
                className={`border-b-2 pb-1 font-medium transition ${
                  pathname === "/"
                    ? "border-[#C79A54] text-[#C79A54]"
                    : "border-transparent text-gray-700 hover:text-[#C79A54]"
                }`}
              >
                Home
              </Link>

              {/* Properties */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "properties"
                        ? null
                        : "properties"
                    )
                  }
                  className={`flex items-center gap-1 border-b-2 pb-1 font-medium transition ${
                    pathname.startsWith("/properties") ||
                    openDropdown === "properties"
                      ? "border-[#C79A54] text-[#C79A54]"
                      : "border-transparent text-gray-700 hover:text-[#C79A54]"
                  }`}
                >
                  Properties

                  <ChevronDown
                    size={17}
                    className={`transition-transform ${
                      openDropdown === "properties"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {openDropdown === "properties" && (
                  <div className="absolute left-0 top-10 z-50 w-60 rounded-xl border border-gray-200 bg-white py-2 shadow-xl">

                    <Link
                      href="/properties"
                      className="block px-5 py-3 text-gray-700 transition hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      All Properties
                    </Link>

                    <Link
                      href="/properties/houses"
                      className="block px-5 py-3 text-gray-700 transition hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      Houses
                    </Link>

                    <Link
                      href="/properties/apartments"
                      className="block px-5 py-3 text-gray-700 transition hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      Apartments
                    </Link>

                    <Link
                      href="/properties/plots"
                      className="block px-5 py-3 text-gray-700 transition hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      Plots
                    </Link>

                    <Link
                      href="/properties/commercial"
                      className="block px-5 py-3 text-gray-700 transition hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      Commercial
                    </Link>
                  </div>
                )}
              </div>

              {/* Services */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "services"
                        ? null
                        : "services"
                    )
                  }
                  className={`flex items-center gap-1 border-b-2 pb-1 font-medium transition ${
                    pathname.startsWith("/services") ||
                    openDropdown === "services"
                      ? "border-[#C79A54] text-[#C79A54]"
                      : "border-transparent text-gray-700 hover:text-[#C79A54]"
                  }`}
                >
                  Services

                  <ChevronDown
                    size={17}
                    className={`transition-transform ${
                      openDropdown === "services"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {openDropdown === "services" && (
                  <div className="absolute left-0 top-10 z-50 w-60 rounded-xl border border-gray-200 bg-white py-2 shadow-xl">

                    <Link
                      href="/services"
                      className="block px-5 py-3 text-gray-700 transition hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      All Services
                    </Link>

                    <Link
                      href="/services/buy"
                      className="block px-5 py-3 text-gray-700 transition hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      Buy Property
                    </Link>

                    <Link
                      href="/services/sell"
                      className="block px-5 py-3 text-gray-700 transition hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      Sell Property
                    </Link>

                    <Link
                      href="/services/rent"
                      className="block px-5 py-3 text-gray-700 transition hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      Rent Property
                    </Link>
                  </div>
                )}
              </div>

              {/* Projects */}
              <Link
                href="/projects"
                className={`border-b-2 pb-1 font-medium transition ${
                  pathname === "/projects"
                    ? "border-[#C79A54] text-[#C79A54]"
                    : "border-transparent text-gray-700 hover:text-[#C79A54]"
                }`}
              >
                Projects
              </Link>

              {/* About */}
              <Link
                href="/about"
                className={`border-b-2 pb-1 font-medium transition ${
                  pathname === "/about"
                    ? "border-[#C79A54] text-[#C79A54]"
                    : "border-transparent text-gray-700 hover:text-[#C79A54]"
                }`}
              >
                About Us
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className={`border-b-2 pb-1 font-medium transition ${
                  pathname === "/contact"
                    ? "border-[#C79A54] text-[#C79A54]"
                    : "border-transparent text-gray-700 hover:text-[#C79A54]"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Enquire */}
            <Link
              href="/enquire"
              className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#0B1E3D] px-5 py-3 font-semibold text-white transition hover:bg-[#16335F] xl:px-7"
            >
              Enquire Now
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(!mobileOpen);

              if (mobileOpen) {
                setOpenDropdown(null);
              }
            }}
            className="rounded-lg p-2 text-[#0B1E3D] transition hover:bg-gray-100 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileOpen && (
          <div className="relative z-50 max-h-[calc(100vh-90px)] overflow-y-auto border-t border-gray-100 bg-white pb-6 lg:hidden">

            {/* Home */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`block border-b border-gray-100 py-4 font-medium ${
                pathname === "/"
                  ? "text-[#C79A54]"
                  : "text-gray-700"
              }`}
            >
              Home
            </Link>

            {/* Mobile Properties */}
            <div className="border-b border-gray-100">
              <button
                type="button"
                onClick={() => toggleMobileDropdown("properties")}
                className="flex w-full items-center justify-between py-4 font-medium text-gray-700"
              >
                <span
                  className={
                    pathname.startsWith("/properties")
                      ? "text-[#C79A54]"
                      : ""
                  }
                >
                  Properties
                </span>

                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    openDropdown === "properties"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {openDropdown === "properties" && (
                <div className="mb-3 ml-4 border-l-2 border-[#C79A54] pl-4">

                  <Link
                    href="/properties"
                    onClick={closeMobileMenu}
                    className="block py-2.5 text-sm text-gray-600 hover:text-[#C79A54]"
                  >
                    All Properties
                  </Link>

                  <Link
                    href="/properties/houses"
                    onClick={closeMobileMenu}
                    className="block py-2.5 text-sm text-gray-600 hover:text-[#C79A54]"
                  >
                    Houses
                  </Link>

                  <Link
                    href="/properties/apartments"
                    onClick={closeMobileMenu}
                    className="block py-2.5 text-sm text-gray-600 hover:text-[#C79A54]"
                  >
                    Apartments
                  </Link>

                  <Link
                    href="/properties/plots"
                    onClick={closeMobileMenu}
                    className="block py-2.5 text-sm text-gray-600 hover:text-[#C79A54]"
                  >
                    Plots
                  </Link>

                  <Link
                    href="/properties/commercial"
                    onClick={closeMobileMenu}
                    className="block py-2.5 text-sm text-gray-600 hover:text-[#C79A54]"
                  >
                    Commercial
                  </Link>

                </div>
              )}
            </div>

            {/* Mobile Services */}
            <div className="border-b border-gray-100">
              <button
                type="button"
                onClick={() => toggleMobileDropdown("services")}
                className="flex w-full items-center justify-between py-4 font-medium text-gray-700"
              >
                <span
                  className={
                    pathname.startsWith("/services")
                      ? "text-[#C79A54]"
                      : ""
                  }
                >
                  Services
                </span>

                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    openDropdown === "services"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {openDropdown === "services" && (
                <div className="mb-3 ml-4 border-l-2 border-[#C79A54] pl-4">

                  <Link
                    href="/services"
                    onClick={closeMobileMenu}
                    className="block py-2.5 text-sm text-gray-600 hover:text-[#C79A54]"
                  >
                    All Services
                  </Link>

                  <Link
                    href="/services/buy"
                    onClick={closeMobileMenu}
                    className="block py-2.5 text-sm text-gray-600 hover:text-[#C79A54]"
                  >
                    Buy Property
                  </Link>

                  <Link
                    href="/services/sell"
                    onClick={closeMobileMenu}
                    className="block py-2.5 text-sm text-gray-600 hover:text-[#C79A54]"
                  >
                    Sell Property
                  </Link>

                  <Link
                    href="/services/rent"
                    onClick={closeMobileMenu}
                    className="block py-2.5 text-sm text-gray-600 hover:text-[#C79A54]"
                  >
                    Rent Property
                  </Link>

                </div>
              )}
            </div>

            {/* Projects */}
            <Link
              href="/projects"
              onClick={closeMobileMenu}
              className={`block border-b border-gray-100 py-4 font-medium ${
                pathname === "/projects"
                  ? "text-[#C79A54]"
                  : "text-gray-700"
              }`}
            >
              Projects
            </Link>

            {/* About */}
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className={`block border-b border-gray-100 py-4 font-medium ${
                pathname === "/about"
                  ? "text-[#C79A54]"
                  : "text-gray-700"
              }`}
            >
              About Us
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className={`block py-4 font-medium ${
                pathname === "/contact"
                  ? "text-[#C79A54]"
                  : "text-gray-700"
              }`}
            >
              Contact
            </Link>

            {/* Mobile Enquire */}
            <Link
              href="/enquire"
              onClick={closeMobileMenu}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1E3D] px-4 py-3.5 font-semibold text-white transition hover:bg-[#16335F]"
            >
              Enquire Now
              <ArrowRight size={18} />
            </Link>

          </div>
        )}
      </div>
    </header>
  );
}
