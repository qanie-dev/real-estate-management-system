"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  BedDouble,
  Bath,
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

export default function HousesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchHouses();
  }, []);

  async function fetchHouses() {
    try {
      const res = await fetch("/api/properties");

      if (!res.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await res.json();

      const houses = data.filter(
        (item: any) => item.category?.name === "Houses"
      );

      setProperties(houses);
    } catch (error) {
      console.error("Error fetching houses:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FDF8F2] flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#081B37] border-t-transparent rounded-full animate-spin"></div>

          <p className="text-base sm:text-xl text-gray-600">
            Loading Houses...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FDF8F2] overflow-hidden">

      {/* Hero */}
      <section
        className="relative h-[320px] sm:h-[350px] md:h-[380px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/house.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#081B37]/75" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 sm:px-6">

          <p className="uppercase tracking-[2px] sm:tracking-[4px] text-[#C79A54] font-semibold text-xs sm:text-sm">
            HomeLuxe Pakistan
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-3 sm:mt-4">
            Houses
          </h1>

          <p className="text-gray-200 mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7">
            Discover beautiful houses for sale across Pakistan's
            most desirable neighborhoods.
          </p>

        </div>
      </section>

      {/* Search */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20">

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">

          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">

            <div className="relative flex-1">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search by city, location or property..."
                className="w-full border border-gray-200 rounded-xl pl-11 pr-4 sm:pr-5 py-3.5 sm:py-4 outline-none text-sm sm:text-base text-gray-700 focus:border-[#C79A54] focus:ring-2 focus:ring-[#C79A54]/10 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>

            <button
              type="button"
              className="w-full lg:w-auto bg-[#0B1E3D] hover:bg-[#16335F] text-white px-8 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Search size={18} />
              Search
            </button>

          </div>

        </div>

      </section>

      {/* Properties */}
      <section className="py-14 sm:py-16 md:py-20">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center mb-10 sm:mb-12 md:mb-14">

            <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-xs sm:text-sm">
              House Listings
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1E3D] mt-3 leading-tight">
              Find Your Dream House
            </h2>

          </div>

          {/* Empty State */}
          {filteredProperties.length === 0 ? (

            <div className="text-center py-16 sm:py-20 px-4">

              <p className="text-xl sm:text-2xl text-gray-500">
                {properties.length === 0
                  ? "No houses found"
                  : "No houses match your search"}
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">

              {filteredProperties.map((property) => (

                <div
                  key={property.id}
                  className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
                >

                  {/* Image */}
                  <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">

                    <Image
                      src={
                        property.image ||
                        "/images/placeholder.jpg"
                      }
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover hover:scale-110 transition duration-500"
                    />

                    <span
                      className={`absolute top-3 left-3 sm:top-4 sm:left-4 text-white text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg ${
                        property.status === "Featured"
                          ? "bg-[#C79A54]"
                          : property.status === "Premium"
                          ? "bg-purple-600"
                          : property.status === "New"
                          ? "bg-blue-600"
                          : "bg-green-600"
                      }`}
                    >
                      {property.status || "For Sale"}
                    </span>

                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">

                    <h3 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] leading-tight">
                      {property.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-start gap-2 mt-3 text-gray-500 text-sm sm:text-base">

                      <MapPin
                        size={17}
                        className="flex-shrink-0 mt-0.5"
                      />

                      <span className="leading-6">
                        {property.location}, {property.city}
                      </span>

                    </div>

                    {/* Property Details */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 text-gray-600 text-xs sm:text-sm">

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center">

                        <BedDouble
                          size={18}
                          className="flex-shrink-0"
                        />

                        <span>
                          {property.bedrooms} Beds
                        </span>

                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center">

                        <Bath
                          size={18}
                          className="flex-shrink-0"
                        />

                        <span>
                          {property.bathrooms} Baths
                        </span>

                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center">

                        <Square
                          size={18}
                          className="flex-shrink-0"
                        />

                        <span>
                          {property.area}
                        </span>

                      </div>

                    </div>

                    {/* Price + Button */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-7 sm:mt-8">

                      <h4 className="text-xl sm:text-2xl font-bold text-[#C79A54]">
                        Rs.{" "}
                        {Number(
                          property.price
                        ).toLocaleString()}
                      </h4>

                      <Link
                        href={`/properties/${property.id}`}
                        className="w-full sm:w-auto justify-center bg-[#0B1E3D] hover:bg-[#16335F] text-white px-5 py-3 rounded-xl flex items-center gap-2 transition text-sm sm:text-base"
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
          {!loading &&
            filteredProperties.length > 0 && (
              <div className="mt-8 text-center text-sm sm:text-base text-gray-500 px-4">
                Showing {filteredProperties.length} houses
                {searchTerm &&
                  ` matching "${searchTerm}"`}
              </div>
            )}

        </div>

      </section>

    </main>
  );
}