"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Square,
  ArrowRight,
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
  type?: string;
}

export default function CommercialPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommercialProperties();
  }, []);

  async function fetchCommercialProperties() {
    try {
      const res = await fetch("/api/properties");
      const data = await res.json();

      const commercialProperties = data.filter(
        (item: any) => item.category?.name === "Commercial"
      );

      setProperties(commercialProperties);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#081B37] border-t-transparent rounded-full animate-spin"></div>

          <p className="text-base sm:text-xl text-gray-600">
            Loading Commercial Properties...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#FDF8F2] overflow-hidden">

      {/* Hero */}
      <section className="relative h-[320px] sm:h-[350px] md:h-[380px] bg-cover bg-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/commercial.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-[#081B37]/75" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 sm:px-6">

          <p className="uppercase tracking-[2px] sm:tracking-[4px] text-[#C79A54] font-semibold text-xs sm:text-sm">
            HomeLuxe Pakistan
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 sm:mt-4 leading-tight">
            Commercial Properties
          </h1>

          <p className="text-gray-200 mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7">
            Discover premium offices, plazas, shops and commercial
            investment opportunities across Pakistan.
          </p>

        </div>
      </section>

      {/* Properties */}
      <section className="py-14 sm:py-16 md:py-20">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center mb-10 sm:mb-12 md:mb-14">

            <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-xs sm:text-sm">
              Commercial Listings
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1E3D] mt-3 leading-tight">
              Grow Your Business with the Right Property
            </h2>

          </div>

          {/* Empty State */}
          {properties.length === 0 ? (
            <div className="text-center py-16 sm:py-20 px-4">

              <p className="text-xl sm:text-2xl text-gray-500">
                No commercial properties found
              </p>

            </div>
          ) : (

            /* Property Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">

              {properties.map((property) => (

                <div
                  key={property.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
                >

                  {/* Image */}
                  <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">

                    <Image
                      src={property.image || "/images/placeholder.jpg"}
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover hover:scale-110 transition duration-500"
                    />

                    <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#C79A54] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm">
                      {property.status}
                    </span>

                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">

                    <h3 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] leading-tight">
                      {property.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm sm:text-base">

                      <MapPin
                        size={17}
                        className="flex-shrink-0"
                      />

                      <span className="truncate">
                        {property.city}
                      </span>

                    </div>

                    {/* Property Information */}
                    <div className="flex flex-wrap gap-x-5 gap-y-3 mt-6 text-gray-600 text-sm sm:text-base">

                      <div className="flex items-center gap-2">

                        <Building2
                          size={18}
                          className="flex-shrink-0"
                        />

                        <span>
                          {property.type || "Commercial"}
                        </span>

                      </div>

                      <div className="flex items-center gap-2">

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
                        PKR{" "}
                        {Number(property.price).toLocaleString()}
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

        </div>

      </section>

    </main>
  );
}