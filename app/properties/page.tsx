
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  BedDouble,
  Bath,
  Square,
  ArrowRight,
} from "lucide-react";

interface Property {
  id: number;
  title: string;
  city: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  status: string;
  category?: {
    id: number;
    name: string;
  };
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      const res = await fetch("/api/properties");

      if (!res.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FDF8F2] flex justify-center items-center px-6">
        <div className="text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto border-4 border-[#081B37] border-t-transparent rounded-full animate-spin"></div>

          <p className="text-lg sm:text-xl font-semibold text-[#081B37] mt-5">
            Loading Properties...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FDF8F2] min-h-screen">

      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[300px] sm:h-[350px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Hero.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-[#081B37]/70" />

        <div className="relative z-10 min-h-[300px] sm:h-full flex flex-col justify-center items-center text-center px-5 sm:px-6">

          <p className="uppercase tracking-[2px] sm:tracking-[4px] text-[#C79A54] font-semibold text-xs sm:text-sm">
            HomeLuxe Pakistan
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 sm:mt-4">
            All Properties
          </h1>

          <p className="text-gray-200 mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7">
            Browse all available properties including houses, apartments,
            commercial buildings and residential plots.
          </p>

        </div>
      </section>


      {/* ================= PROPERTIES ================= */}
      <section className="py-12 sm:py-16 lg:py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-5 mb-8 sm:mb-10">

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#081B37]">
              Available Properties
            </h2>

            <p className="text-gray-500 text-sm sm:text-base">
              {properties.length} Properties Found
            </p>

          </div>


          {/* ================= EMPTY STATE ================= */}
          {properties.length === 0 ? (

            <div className="text-center py-16 sm:py-20 px-4">

              <h3 className="text-2xl sm:text-3xl font-bold text-[#081B37]">
                No Properties Found
              </h3>

              <p className="text-gray-500 mt-3 sm:mt-4 text-sm sm:text-base">
                Please add some properties from the Admin Dashboard.
              </p>

            </div>

          ) : (

            /* ================= PROPERTY GRID ================= */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">

              {properties.map((property) => (

                <div
                  key={property.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
                >

                  {/* IMAGE */}
                  <div className="relative h-60 sm:h-64 md:h-72">

                    <Image
                      src={property.image || "/images/no-image.jpg"}
                      alt={property.title}
                      fill
                      className="object-cover hover:scale-110 transition duration-500"
                    />

                    {/* STATUS */}
                    <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#C79A54] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm">
                      {property.status}
                    </span>

                    {/* CATEGORY */}
                    {property.category && (
                      <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#081B37] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm max-w-[45%] truncate">
                        {property.category.name}
                      </span>
                    )}

                  </div>


                  {/* CONTENT */}
                  <div className="p-5 sm:p-6">

                    {/* TITLE */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#081B37] leading-tight break-words">
                      {property.title}
                    </h3>


                    {/* LOCATION */}
                    <div className="flex items-start gap-2 mt-3 text-gray-500 text-sm sm:text-base">

                      <MapPin
                        size={17}
                        className="flex-shrink-0 mt-0.5"
                      />

                      <span className="break-words">
                        {property.city}, {property.location}
                      </span>

                    </div>


                    {/* PROPERTY DETAILS */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 text-gray-600 text-xs sm:text-sm">

                      <div className="flex items-center justify-center gap-1 sm:gap-2 bg-[#FDF8F2] rounded-lg py-2 px-1">

                        <BedDouble
                          size={17}
                          className="flex-shrink-0"
                        />

                        <span>
                          {property.bedrooms} Beds
                        </span>

                      </div>


                      <div className="flex items-center justify-center gap-1 sm:gap-2 bg-[#FDF8F2] rounded-lg py-2 px-1">

                        <Bath
                          size={17}
                          className="flex-shrink-0"
                        />

                        <span>
                          {property.bathrooms} Baths
                        </span>

                      </div>


                      <div className="flex items-center justify-center gap-1 sm:gap-2 bg-[#FDF8F2] rounded-lg py-2 px-1 min-w-0">

                        <Square
                          size={17}
                          className="flex-shrink-0"
                        />

                        <span className="truncate">
                          {property.area}
                        </span>

                      </div>

                    </div>


                    {/* PRICE + DETAILS */}
                    <div className="flex flex-col xs:flex-row sm:flex-col md:flex-row xl:flex-col 2xl:flex-row justify-between items-stretch sm:items-start md:items-center xl:items-start 2xl:items-center gap-4 mt-7 sm:mt-8">

                      {/* PRICE */}
                      <h4 className="text-xl sm:text-2xl font-bold text-[#C79A54] break-words">
                        ₨ {Number(property.price).toLocaleString()}
                      </h4>


                      {/* DETAILS BUTTON */}
                      <Link
                        href={`/properties/${property.id}`}
                        className="bg-[#081B37] hover:bg-[#16335F] text-white px-4 sm:px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition text-sm sm:text-base w-full sm:w-auto"
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

        </div>

      </section>

    </main>
  );
}
