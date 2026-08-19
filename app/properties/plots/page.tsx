
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Square,
  ArrowRight,
  Search,
} from "lucide-react";

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  city: string;
  location: string;
  category: {
    id: number;
    name: string;
  };
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  featured: boolean;
  status: string;
}

export default function PlotPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPlots();
  }, []);

  async function fetchPlots() {
    try {
      const res = await fetch("/api/properties");

      if (!res.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await res.json();

      const plots = data.filter(
        (item: any) => item.category?.name === "Plot"
      );

      setProperties(plots);
    } catch (error) {
      console.error("Error fetching plots:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProperties = properties.filter(
    (property) =>
      property.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      property.city
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      property.location
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FDF8F2] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#081B37] border-t-transparent rounded-full animate-spin"></div>

          <p className="text-base sm:text-xl text-gray-600">
            Loading Plots...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FDF8F2] min-h-screen">

      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[360px] sm:h-[400px] lg:h-[430px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/plot.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#081B37]/75" />

        <div className="relative z-10 min-h-[360px] sm:h-full flex flex-col items-center justify-center text-center px-5 sm:px-6">

          <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[#C79A54] font-semibold text-xs sm:text-sm">
            HomeLuxe Pakistan
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-3 sm:mt-4 leading-tight">
            Plots & Land
          </h1>

          <div className="w-16 sm:w-20 h-1 bg-[#C79A54] rounded-full mt-4 sm:mt-5" />

          <p className="text-gray-200 mt-5 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed">
            Find your perfect piece of land for residential or
            commercial development across Pakistan.
          </p>

        </div>
      </section>

      {/* ================= SEARCH ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6">

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

            <div className="relative flex-1">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search by city, location or plot size..."
                className="w-full border-2 border-gray-200 rounded-xl pl-11 pr-4 py-3.5 sm:py-4 text-sm sm:text-base outline-none focus:border-[#C79A54] focus:ring-4 focus:ring-[#C79A54]/10 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>

            <button
              type="button"
              className="w-full sm:w-auto bg-[#0B1E3D] hover:bg-[#16335F] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition font-medium"
            >
              <Search size={18} />
              Search
            </button>

          </div>

        </div>

      </section>

      {/* ================= PROPERTIES ================= */}
      <section className="py-16 sm:py-20 lg:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Heading */}
          <div className="text-center mb-10 sm:mb-14">

            <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-xs sm:text-sm">
              Land Listings
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E3D] mt-3 leading-tight">
              Invest in Your Future with the Perfect Plot
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
              Explore premium plots and land opportunities in
              prime locations across Pakistan.
            </p>

          </div>

          {/* Empty State */}
          {filteredProperties.length === 0 ? (

            <div className="text-center py-16 sm:py-20 px-4">

              <div className="w-16 h-16 mx-auto bg-[#C79A54]/10 rounded-full flex items-center justify-center mb-5">
                <MapPin
                  size={28}
                  className="text-[#C79A54]"
                />
              </div>

              <p className="text-xl sm:text-2xl text-gray-500">
                {properties.length === 0
                  ? "No plots found"
                  : "No plots match your search"}
              </p>

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-5 text-[#C79A54] font-semibold hover:underline"
                >
                  Clear Search
                </button>
              )}

            </div>

          ) : (

            /* Property Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">

              {filteredProperties.map((property) => (

                <div
                  key={property.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                >

                  {/* Image */}
                  <div className="relative h-60 sm:h-64 lg:h-72 overflow-hidden">

                    <Image
                      src={
                        property.image ||
                        "/images/placeholder.jpg"
                      }
                      alt={property.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover hover:scale-110 transition duration-500"
                    />

                    {/* Status */}
                    <span
                      className={`absolute top-3 sm:top-4 left-3 sm:left-4 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-md ${
                        property.status === "Featured"
                          ? "bg-[#C79A54]"
                          : property.status === "Premium"
                          ? "bg-purple-600"
                          : property.status === "New"
                          ? "bg-blue-600"
                          : "bg-green-600"
                      }`}
                    >
                      {property.status || "Available"}
                    </span>

                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6">

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] leading-snug">
                      {property.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-start gap-2 mt-3 text-gray-500 text-sm sm:text-base">

                      <MapPin
                        size={17}
                        className="flex-shrink-0 mt-0.5"
                      />

                      <span>
                        {property.location}, {property.city}
                      </span>

                    </div>

                    {/* Property Information */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 text-gray-600">

                      <div className="flex items-center gap-2">

                        <Square size={18} />

                        <span>
                          {property.area}
                        </span>

                      </div>

                      <div className="flex items-center gap-2 text-xs sm:text-sm bg-[#FDF8F2] px-3 py-2 rounded-full w-fit">

                        <span className="text-[#C79A54] font-semibold">
                          Category:
                        </span>

                        <span className="capitalize">
                          {property.category?.name || "Plot"}
                        </span>

                      </div>

                    </div>

                    {/* Price + Details */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-7 sm:mt-8">

                      <div>
                        <p className="text-xs text-gray-400 mb-1">
                          Price
                        </p>

                        <h4 className="text-xl sm:text-2xl font-bold text-[#C79A54]">
                          PKR{" "}
                          {Number(property.price).toLocaleString()}
                        </h4>
                      </div>

                      <Link
                        href={`/properties/${property.id}`}
                        className="w-full sm:w-auto bg-[#0B1E3D] hover:bg-[#16335F] text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition"
                      >
                        Details

                        <ArrowRight size={16} />
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

          {/* Results Count */}
          {!loading && filteredProperties.length > 0 && (

            <div className="mt-8 sm:mt-10 text-center text-sm sm:text-base text-gray-500">

              Showing{" "}
              <span className="font-semibold text-[#0B1E3D]">
                {filteredProperties.length}
              </span>{" "}
              plots

              {searchTerm && (
                <>
                  {" "}
                  matching{" "}
                  <span className="font-semibold text-[#C79A54]">
                    "{searchTerm}"
                  </span>
                </>
              )}

            </div>

          )}

        </div>

      </section>

    </main>
  );
}
