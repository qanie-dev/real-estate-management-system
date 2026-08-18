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

  const [desktopDropdown, setDesktopDropdown] = useState<
    "properties" | "services" | null
  >(null);

  const [mobileDropdown, setMobileDropdown] = useState<
    "properties" | "services" | null
  >(null);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);

  /* ================= SCROLL ================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ================= DESKTOP OUTSIDE CLICK ================= */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node)
      ) {
        setDesktopDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ================= CLOSE MOBILE MENU ================= */

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
  };

  /* ================= MOBILE DROPDOWN ================= */

  const toggleMobileDropdown = (
    dropdown: "properties" | "services"
  ) => {
    setMobileDropdown((current) =>
      current === dropdown ? null : dropdown
    );
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-md backdrop-blur-md"
          : "bg-white"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= NAVBAR ================= */}

        <div className="flex min-h-[76px] items-center justify-between">

          {/* ================= LOGO ================= */}

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
            ref={desktopDropdownRef}
            className="hidden items-center lg:flex lg:gap-6 xl:gap-8"
          >
            <nav className="flex items-center gap-5 xl:gap-7">

              {/* HOME */}

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

              {/* ================= PROPERTIES ================= */}

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setDesktopDropdown(
                      desktopDropdown === "properties"
                        ? null
                        : "properties"
                    )
                  }
                  className={`flex items-center gap-1 border-b-2 pb-1 font-medium transition ${
                    pathname.startsWith("/properties") ||
                    desktopDropdown === "properties"
                      ? "border-[#C79A54] text-[#C79A54]"
                      : "border-transparent text-gray-700 hover:text-[#C79A54]"
                  }`}
                >
                  Properties

                  <ChevronDown
                    size={17}
                    className={`transition-transform ${
                      desktopDropdown === "properties"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {desktopDropdown === "properties" && (
                  <div className="absolute left-0 top-10 z-[100] w-60 rounded-xl border border-gray-200 bg-white py-2 shadow-xl">

                    <Link
                      href="/properties"
                      className="block px-5 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      All Properties
                    </Link>

                    <Link
                      href="/properties/houses"
                      className="block px-5 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      Houses
                    </Link>

                    <Link
                      href="/properties/apartments"
                      className="block px-5 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      Apartments
                    </Link>

                    <Link
                      href="/properties/plots"
                      className="block px-5 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      Plots
                    </Link>

                    <Link
                      href="/properties/commercial"
                      className="block px-5 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      Commercial
                    </Link>

                  </div>
                )}
              </div>

              {/* ================= SERVICES ================= */}

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setDesktopDropdown(
                      desktopDropdown === "services"
                        ? null
                        : "services"
                    )
                  }
                  className={`flex items-center gap-1 border-b-2 pb-1 font-medium transition ${
                    pathname.startsWith("/services") ||
                    desktopDropdown === "services"
                      ? "border-[#C79A54] text-[#C79A54]"
                      : "border-transparent text-gray-700 hover:text-[#C79A54]"
                  }`}
                >
                  Services

                  <ChevronDown
                    size={17}
                    className={`transition-transform ${
                      desktopDropdown === "services"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {desktopDropdown === "services" && (
                  <div className="absolute left-0 top-10 z-[100] w-60 rounded-xl border border-gray-200 bg-white py-2 shadow-xl">

                    <Link
                      href="/services"
                      className="block px-5 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      All Services
                    </Link>

                    <Link
                      href="/services/buy"
                      className="block px-5 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      Buy Property
                    </Link>

                    <Link
                      href="/services/sell"
                      className="block px-5 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      Sell Property
                    </Link>

                    <Link
                      href="/services/rent"
                      className="block px-5 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#C79A54]"
                    >
                      Rent Property
                    </Link>

                  </div>
                )}
              </div>

              {/* PROJECTS */}

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

              {/* ABOUT */}

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

              {/* CONTACT */}

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

            {/* ENQUIRE */}

            <Link
              href="/enquire"
              className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#0B1E3D] px-5 py-3 font-semibold text-white hover:bg-[#16335F] xl:px-7"
            >
              Enquire Now
              <ArrowRight size={18} />
            </Link>

          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}

          <button
            type="button"
            onClick={() => {
              setMobileOpen((current) => !current);
              setMobileDropdown(null);
            }}
            className="relative z-[10000] rounded-lg p-2 text-[#0B1E3D] hover:bg-gray-100 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </div>

        {/* ================= MOBILE MENU ================= */}

        {mobileOpen && (
          <div className="fixed left-0 right-0 top-[76px] z-[9999] max-h-[calc(100vh-76px)] overflow-y-auto bg-white shadow-xl lg:hidden">

            {/* HOME */}

            <Link
              href="/"
              onClick={() => {
                setMobileOpen(false);
                setMobileDropdown(null);
              }}
              className="block border-b border-gray-100 px-5 py-4 text-left font-medium text-gray-700"
            >
              Home
            </Link>

            {/* ================= PROPERTIES ================= */}

            <div className="border-b border-gray-100">

              <button
                type="button"
                onClick={() =>
                  toggleMobileDropdown("properties")
                }
                className="flex w-full items-center justify-between px-5 py-4 font-medium text-gray-700"
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
                    mobileDropdown === "properties"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {mobileDropdown === "properties" && (
                <div className="bg-gray-50 px-5 pb-3">

                  <Link
                    href="/properties"
                    className="block touch-manipulation border-b border-gray-200 py-4 text-sm text-gray-700 active:bg-gray-200"
                  >
                    All Properties
                  </Link>

                  <Link
                    href="/properties/houses"
                    className="block touch-manipulation border-b border-gray-200 py-4 text-sm text-gray-700 active:bg-gray-200"
                  >
                    Houses
                  </Link>

                  <Link
                    href="/properties/apartments"
                    className="block touch-manipulation border-b border-gray-200 py-4 text-sm text-gray-700 active:bg-gray-200"
                  >
                    Apartments
                  </Link>

                  <Link
                    href="/properties/plots"
                    className="block touch-manipulation border-b border-gray-200 py-4 text-sm text-gray-700 active:bg-gray-200"
                  >
                    Plots
                  </Link>

                  <Link
                    href="/properties/commercial"
                    className="block touch-manipulation py-4 text-sm text-gray-700 active:bg-gray-200"
                  >
                    Commercial
                  </Link>

                </div>
              )}
            </div>

            {/* ================= SERVICES ================= */}

            <div className="border-b border-gray-100">

              <button
                type="button"
                onClick={() =>
                  toggleMobileDropdown("services")
                }
                className="flex w-full items-center justify-between px-5 py-4 font-medium text-gray-700"
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
                    mobileDropdown === "services"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {mobileDropdown === "services" && (
                <div className="bg-gray-50 px-5 pb-3">

                  <Link
                    href="/services"
                    className="block touch-manipulation border-b border-gray-200 py-4 text-sm text-gray-700 active:bg-gray-200"
                  >
                    All Services
                  </Link>

                  <Link
                    href="/services/buy"
                    className="block touch-manipulation border-b border-gray-200 py-4 text-sm text-gray-700 active:bg-gray-200"
                  >
                    Buy Property
                  </Link>

                  <Link
                    href="/services/sell"
                    className="block touch-manipulation border-b border-gray-200 py-4 text-sm text-gray-700 active:bg-gray-200"
                  >
                    Sell Property
                  </Link>

                  <Link
                    href="/services/rent"
                    className="block touch-manipulation py-4 text-sm text-gray-700 active:bg-gray-200"
                  >
                    Rent Property
                  </Link>

                </div>
              )}
            </div>

            {/* PROJECTS */}

            <Link
              href="/projects"
              onClick={() => {
                setMobileOpen(false);
                setMobileDropdown(null);
              }}
              className="block border-b border-gray-100 px-5 py-4 text-left font-medium text-gray-700"
            >
              Projects
            </Link>

            {/* ABOUT */}

            <Link
              href="/about"
              onClick={() => {
                setMobileOpen(false);
                setMobileDropdown(null);
              }}
              className="block border-b border-gray-100 px-5 py-4 text-left font-medium text-gray-700"
            >
              About Us
            </Link>

            {/* CONTACT */}

            <Link
              href="/contact"
              onClick={() => {
                setMobileOpen(false);
                setMobileDropdown(null);
              }}
              className="block border-b border-gray-100 px-5 py-4 text-left font-medium text-gray-700"
            >
              Contact
            </Link>

            {/* ENQUIRE */}

            <div className="px-5 pb-6">
              <Link
                href="/enquire"
                onClick={() => {
                  setMobileOpen(false);
                  setMobileDropdown(null);
                }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1E3D] px-4 py-4 font-semibold text-white"
              >
                Enquire Now
                <ArrowRight size={18} />
              </Link>
            </div>

          </div>
        )}

      </div>
    </header>
  );
}