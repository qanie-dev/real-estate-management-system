
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Property {
  id: number;
  title: string;
  city: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  status: string;
  featured: boolean;
}

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProperties();
  }, []);

  async function getProperties() {
    try {
      const res = await fetch("/api/properties");
      const data = await res.json();

      console.log(data);

      if (Array.isArray(data)) {
        setProperties(data);
      } else if (data.properties && Array.isArray(data.properties)) {
        setProperties(data.properties);
      } else {
        setProperties([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const displayProperties = properties.filter(
    (property) => property.featured === true
  );

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-22 pb-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-xs sm:text-sm">
                Featured Properties
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1E3D] mt-3 leading-tight">
                Premium Properties Across Pakistan
              </h2>
            </div>

            <Link
              href="/properties"
              className="flex items-center gap-2 text-[#0B1E3D] font-semibold hover:text-[#C79A54] transition self-start sm:self-auto"
            >
              View All Properties
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="flex justify-center items-center py-16 sm:py-20">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#C79A54] border-t-transparent rounded-full animate-spin"></div>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-22 pb-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          <div className="max-w-2xl">
            <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-xs sm:text-sm">
              Featured Properties
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1E3D] mt-3 leading-tight">
              Premium Properties Across Pakistan
            </h2>
          </div>

          <Link
            href="/properties"
            className="flex items-center gap-2 text-[#0B1E3D] font-semibold hover:text-[#C79A54] transition self-start sm:self-auto whitespace-nowrap"
          >
            View All Properties
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* Cards */}
        {displayProperties.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <p className="text-gray-500 text-lg sm:text-xl">
              No featured properties available
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mt-10 sm:mt-14">

            {displayProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group w-full"
              >

                {/* Image */}
                <div className="relative h-56 sm:h-60 lg:h-64 overflow-hidden">

                  <Image
                    src={property.image || "/images/property1.jfif"}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />

                  {/* Status Badge */}
                  {["Featured", "Hot", "New"].includes(property.status) && (
                    <div
                      className={`absolute top-3 left-3 sm:top-4 sm:left-4 text-white text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg ${
                        property.status === "Featured"
                          ? "bg-[#C79A54]"
                          : property.status === "Hot"
                          ? "bg-red-600"
                          : "bg-green-600"
                      }`}
                    >
                      {property.status}
                    </div>
                  )}

                  {/* Featured Badge */}
                  {property.featured && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#C79A54] text-white text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full">
                      ★ Featured
                    </div>
                  )}

                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">

                  <h3 className="text-lg sm:text-xl font-bold text-[#0B1E3D] leading-snug">
                    {property.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-2 mt-3 text-gray-500">
                    <MapPin size={16} className="flex-shrink-0" />

                    <span className="text-sm truncate">
                      {property.city}
                    </span>
                  </div>

                  {/* Property Info */}
                  <div className="grid grid-cols-3 gap-2 mt-5 sm:mt-6 text-gray-500">

                    <div className="flex items-center justify-center sm:justify-start gap-1.5">
                      <BedDouble size={17} className="flex-shrink-0" />

                      <span className="text-xs sm:text-sm whitespace-nowrap">
                        {property.bedrooms} Beds
                      </span>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-1.5">
                      <Bath size={17} className="flex-shrink-0" />

                      <span className="text-xs sm:text-sm whitespace-nowrap">
                        {property.bathrooms} Baths
                      </span>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-1.5">
                      <Square size={17} className="flex-shrink-0" />

                      <span className="text-xs sm:text-sm whitespace-nowrap">
                        {property.area}
                      </span>
                    </div>

                  </div>

                  {/* Price + Details */}
                  <div className="border-t mt-5 sm:mt-6 pt-5 sm:pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <p className="text-xl sm:text-2xl font-bold text-[#C79A54]">
                      Rs. {Number(property.price).toLocaleString()}
                    </p>

                    <Link
                      href={`/properties/${property.id}`}
                      className="bg-[#0B1E3D] text-white px-5 py-3 rounded-lg hover:bg-[#16335F] transition text-center w-full sm:w-auto"
                    >
                      Details
                    </Link>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

        {/* Navigation Arrows */}
        <div className="flex justify-center sm:justify-end gap-3 mt-8 sm:mt-10">

          <button
            aria-label="Previous properties"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border hover:bg-[#0B1E3D] hover:text-white transition flex items-center justify-center"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            aria-label="Next properties"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border hover:bg-[#0B1E3D] hover:text-white transition flex items-center justify-center"
          >
            <ChevronRight size={20} />
          </button>

        </div>

      </div>
    </section>
  );
}