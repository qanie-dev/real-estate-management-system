
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

export default function ApartmentsPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApartments();
  }, []);

  async function fetchApartments() {
    try {
      const res = await fetch("/api/properties");
      const data = await res.json();

      const apartments = data.filter(
        (item: any) => item.category?.name === "Apartment"
      );

      setProperties(apartments);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF8F2] px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#0B1E3D] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 text-sm sm:text-base">
            Loading apartments...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#FDF8F2] overflow-hidden">

      {/* ================= HERO ================= */}

      <section
        className="
          relative
          h-[300px]
          sm:h-[330px]
          md:h-[350px]
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: "url('/images/apartment.jpg')",
        }}
      >

        {/* Overlay */}

        <div className="absolute inset-0 bg-[#081B37]/75" />

        {/* Hero Content */}

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6">

          <p className="uppercase tracking-[2px] sm:tracking-[4px] text-[#C79A54] text-xs sm:text-sm font-semibold">
            HomeLuxe Pakistan
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 sm:mt-4">
            Apartments
          </h1>

          <div className="w-16 sm:w-20 h-1 bg-[#C79A54] rounded-full mt-4" />

          <p className="text-gray-200 mt-4 sm:mt-5 max-w-xl md:max-w-2xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7">
            Explore premium apartments available for sale across
            Pakistan's leading cities.
          </p>

        </div>

      </section>


      {/* ================= APARTMENTS SECTION ================= */}

      <section className="py-12 sm:py-16 md:py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}

          <div className="text-center mb-9 sm:mb-12 md:mb-14">

            <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] text-xs sm:text-sm font-semibold">
              Featured Apartments
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1E3D] mt-3 leading-tight">
              Find Your Perfect Apartment
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-7">
              Browse our collection of quality apartments in some of
              Pakistan's most desirable locations.
            </p>

          </div>


          {/* ================= NO APARTMENTS ================= */}

          {properties.length === 0 ? (

            <div className="text-center py-16 sm:py-20">

              <p className="text-xl sm:text-2xl text-gray-500">
                No apartments found
              </p>

              <p className="text-gray-400 text-sm sm:text-base mt-3">
                Please check back later for available apartments.
              </p>

            </div>

          ) : (

            /* ================= CARDS ================= */

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 md:gap-8">

              {properties.map((apartment) => (

                <div
                  key={apartment.id}
                  className="
                    bg-white
                    rounded-2xl
                    overflow-hidden
                    shadow-md
                    hover:shadow-2xl
                    transition-all
                    duration-300
                    group
                    flex
                    flex-col
                  "
                >

                  {/* ================= IMAGE ================= */}

                  <div className="relative h-56 sm:h-60 md:h-64 lg:h-72 overflow-hidden">

                    <Image
                      src={apartment.image || "/images/placeholder.jpg"}
                      alt={apartment.title}
                      fill
                      className="
                        object-cover
                        group-hover:scale-110
                        transition-transform
                        duration-500
                      "
                    />

                    {/* Status */}

                    <span className="
                      absolute
                      top-3
                      left-3
                      sm:top-4
                      sm:left-4
                      bg-[#C79A54]
                      text-white
                      px-3
                      sm:px-4
                      py-1.5
                      sm:py-2
                      rounded-lg
                      text-xs
                      sm:text-sm
                      font-medium
                    ">
                      {apartment.status}
                    </span>

                  </div>


                  {/* ================= CONTENT ================= */}

                  <div className="p-5 sm:p-6 flex flex-col flex-1">

                    {/* Title */}

                    <h3 className="
                      text-xl
                      sm:text-2xl
                      font-bold
                      text-[#0B1E3D]
                      leading-tight
                    ">
                      {apartment.title}
                    </h3>


                    {/* City */}

                    <div className="flex items-start gap-2 mt-3 text-gray-500 text-sm sm:text-base">

                      <MapPin
                        size={17}
                        className="flex-shrink-0 mt-0.5 text-[#C79A54]"
                      />

                      <span>
                        {apartment.city}
                      </span>

                    </div>


                    {/* Property Features */}

                    <div className="
                      grid
                      grid-cols-3
                      gap-2
                      sm:gap-3
                      mt-6
                      text-gray-600
                      text-xs
                      sm:text-sm
                    ">

                      {/* Bedrooms */}

                      <div className="
                        flex
                        flex-col
                        sm:flex-row
                        items-center
                        justify-center
                        gap-1
                        sm:gap-2
                        text-center
                      ">

                        <BedDouble
                          size={18}
                          className="text-[#C79A54] flex-shrink-0"
                        />

                        <span>
                          {apartment.bedrooms} Beds
                        </span>

                      </div>


                      {/* Bathrooms */}

                      <div className="
                        flex
                        flex-col
                        sm:flex-row
                        items-center
                        justify-center
                        gap-1
                        sm:gap-2
                        text-center
                      ">

                        <Bath
                          size={18}
                          className="text-[#C79A54] flex-shrink-0"
                        />

                        <span>
                          {apartment.bathrooms} Baths
                        </span>

                      </div>


                      {/* Area */}

                      <div className="
                        flex
                        flex-col
                        sm:flex-row
                        items-center
                        justify-center
                        gap-1
                        sm:gap-2
                        text-center
                      ">

                        <Square
                          size={18}
                          className="text-[#C79A54] flex-shrink-0"
                        />

                        <span>
                          {apartment.area}
                        </span>

                      </div>

                    </div>


                    {/* ================= BOTTOM ================= */}

                    <div className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:justify-between
                      sm:items-center
                      gap-4
                      mt-7
                      sm:mt-8
                    ">

                      {/* Price */}

                      <h4 className="
                        text-xl
                        sm:text-2xl
                        font-bold
                        text-[#C79A54]
                        break-words
                      ">
                        PKR{" "}
                        {Number(apartment.price).toLocaleString()}
                      </h4>


                      {/* Details Button */}

                      <Link
                        href={`/properties/${apartment.id}`}
                        className="
                          w-full
                          sm:w-auto
                          bg-[#0B1E3D]
                          hover:bg-[#16335F]
                          text-white
                          px-5
                          py-3
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          gap-2
                          transition
                          text-sm
                          sm:text-base
                          font-medium
                        "
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
