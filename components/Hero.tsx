
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Home,
  Search,
  ShieldCheck,
  Handshake,
  Headphones,
} from "lucide-react";

interface HeroData {
  id: number;
  backgroundImage: string;
  subHeading: string;
  heading: string;
  description: string;
  searchPlaceholder: string;
}

export default function Hero() {
  const router = useRouter();

  const [hero, setHero] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    fetchHero();
  }, []);

  async function fetchHero() {
    try {
      const res = await fetch("/api/hero");

      if (!res.ok) {
        throw new Error("Failed to fetch hero data");
      }

      const data = await res.json();
      setHero(data);
    } catch (error) {
      console.error("Error fetching hero data:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="relative flex min-h-[700px] w-full items-center justify-center overflow-hidden bg-[#081B37] px-4 sm:min-h-[750px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#C79A54] border-t-transparent sm:h-12 sm:w-12" />

          <p className="text-base text-white sm:text-lg">
            Loading...
          </p>
        </div>
      </section>
    );
  }

  if (!hero) {
    return (
      <section className="relative flex min-h-[700px] w-full items-center justify-center overflow-hidden bg-[#081B37] px-4 sm:min-h-[750px]">
        <p className="text-center text-lg text-white sm:text-xl">
          No hero data available
        </p>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            hero.backgroundImage || "/images/Hero.jpeg"
          })`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#081B37]/65" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-20 lg:pt-40">

        {/* Welcome */}
        <div className="mb-4 flex items-center gap-2 sm:mb-6 sm:gap-3">
          <div className="h-px w-6 bg-[#C79A54] sm:w-8" />

          <p className="text-xs font-medium uppercase tracking-[2px] text-[#D0A760] sm:text-sm sm:tracking-[3px]">
            {hero.subHeading || "Welcome To HomeLuxe"}
          </p>
        </div>

        {/* Heading */}
        <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.15] text-white sm:text-5xl md:text-6xl lg:text-6xl">
          {hero.heading || "Find Your Dream Property with Us"}
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300 sm:mt-5 sm:text-base sm:leading-8 md:text-lg">
          {hero.description ||
            "Discover premium homes, modern apartments, and commercial spaces in the best locations. Your perfect property is just a search away."}
        </p>

        {/* Search Box */}
        <div className="mt-7 w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl sm:mt-9">

          <div className="grid grid-cols-1 md:grid-cols-4">

            {/* Location */}
            <div className="flex items-center gap-3 border-b p-4 sm:gap-4 sm:p-6 md:border-b-0 md:border-r">
              <MapPin
                className="shrink-0 text-gray-500"
                size={24}
              />

              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 sm:text-sm">
                  Location
                </p>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={
                    hero.searchPlaceholder || "Enter location"
                  }
                  className="mt-1 w-full bg-transparent text-sm font-medium text-gray-800 outline-none placeholder:text-gray-400 sm:text-base"
                />
              </div>
            </div>

            {/* Property Type */}
            <div className="flex items-center gap-3 border-b p-4 sm:gap-4 sm:p-6 md:border-b-0 md:border-r">
              <Home
                className="shrink-0 text-gray-500"
                size={24}
              />

              <div className="min-w-0 w-full">
                <p className="mb-1 text-xs text-gray-500 sm:text-sm">
                  Property Type
                </p>

                <select
                  value={propertyType}
                  onChange={(e) =>
                    setPropertyType(e.target.value)
                  }
                  className="w-full cursor-pointer bg-transparent text-sm font-medium text-gray-500 outline-none sm:text-base"
                >
                  <option value="">All Types</option>

                  <option
                    className="text-black"
                    value="House"
                  >
                    House
                  </option>

                  <option
                    className="text-black"
                    value="Apartment"
                  >
                    Apartment
                  </option>

                  <option
                    className="text-black"
                    value="Villa"
                  >
                    Villa
                  </option>

                  <option
                    className="text-black"
                    value="Commercial"
                  >
                    Commercial
                  </option>

                  <option
                    className="text-black"
                    value="Plot"
                  >
                    Residential Plot
                  </option>
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div className="flex items-center gap-3 border-b p-4 sm:gap-4 sm:p-6 md:border-b-0 md:border-r">
              <span className="shrink-0 text-xl font-bold text-gray-500 sm:text-2xl">
                ₨
              </span>

              <div className="min-w-0 w-full">
                <p className="mb-1 text-xs text-gray-500 sm:text-sm">
                  Price Range
                </p>

                <select
                  value={priceRange}
                  onChange={(e) =>
                    setPriceRange(e.target.value)
                  }
                  className="w-full cursor-pointer bg-transparent text-sm font-medium text-gray-500 outline-none sm:text-base"
                >
                  <option value="">Any Price</option>

                  <option
                    className="text-black"
                    value="50"
                  >
                    Under ₨ 50 Lakh
                  </option>

                  <option
                    className="text-black"
                    value="100"
                  >
                    ₨ 50 Lakh - ₨ 1 Crore
                  </option>

                  <option
                    className="text-black"
                    value="200"
                  >
                    ₨ 1 Crore - ₨ 2 Crore
                  </option>

                  <option
                    className="text-black"
                    value="500"
                  >
                    ₨ 2 Crore - ₨ 5 Crore
                  </option>

                  <option
                    className="text-black"
                    value="501"
                  >
                    Above ₨ 5 Crore
                  </option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="button"
              onClick={() => {
                const params = new URLSearchParams();

                if (location) {
                  params.append("location", location);
                }

                if (propertyType) {
                  params.append("category", propertyType);
                }

                if (priceRange) {
                  params.append("price", priceRange);
                }

                router.push(
                  `/properties/search?${params.toString()}`
                );
              }}
              className="flex min-h-[64px] items-center justify-center gap-3 bg-[#C79A54] px-6 py-4 text-white transition-all hover:bg-[#b98a42] sm:min-h-[72px] md:h-full md:flex-col md:gap-2"
            >
              <Search size={25} />

              <span className="text-base font-semibold sm:text-lg">
                Search
              </span>
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-3 sm:gap-6 lg:mt-14 lg:flex lg:flex-wrap lg:gap-12">

          {/* Verified */}
          <div className="flex items-center gap-3 sm:gap-4">
            <ShieldCheck
              className="shrink-0 text-[#C79A54]"
              size={32}
            />

            <div>
              <h4 className="text-base font-semibold text-white sm:text-lg">
                Verified
              </h4>

              <p className="text-sm text-gray-300 sm:text-base">
                Properties
              </p>
            </div>
          </div>

          {/* Trusted */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Handshake
              className="shrink-0 text-[#C79A54]"
              size={32}
            />

            <div>
              <h4 className="text-base font-semibold text-white sm:text-lg">
                Trusted by
              </h4>

              <p className="text-sm text-gray-300 sm:text-base">
                Thousands
              </p>
            </div>
          </div>

          {/* Support */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Headphones
              className="shrink-0 text-[#C79A54]"
              size={32}
            />

            <div>
              <h4 className="text-base font-semibold text-white sm:text-lg">
                24 / 7 Expert
              </h4>

              <p className="text-sm text-gray-300 sm:text-base">
                Support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Mouse */}
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 sm:block lg:bottom-8">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white sm:h-12 sm:w-7">
          <div className="mt-2 h-3 w-1.5 animate-bounce rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
}
