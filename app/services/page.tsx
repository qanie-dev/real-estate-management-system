
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Building2,
  KeyRound,
  Briefcase,
  Landmark,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string | null;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const res = await fetch("/api/services");

      if (!res.ok) {
        throw new Error("Failed to fetch services");
      }

      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Get icon based on service title
  const getIcon = (title: string) => {
    const titleLower = title.toLowerCase();

    if (titleLower.includes("buy")) return Home;
    if (titleLower.includes("sell")) return Building2;
    if (titleLower.includes("rent")) return KeyRound;
    if (titleLower.includes("management")) return Briefcase;
    if (
      titleLower.includes("investment") ||
      titleLower.includes("consult")
    )
      return Landmark;
    if (titleLower.includes("verification")) return ClipboardCheck;

    return Home;
  };

  return (
    <main className="bg-[#FDF8F2] overflow-hidden">

      {/* Hero */}
      <section
        className="relative min-h-[350px] sm:min-h-[380px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/services.jfif')",
        }}
      >
        <div className="absolute inset-0 bg-[#081B37]/75" />

        <div className="relative z-10 min-h-[350px] sm:min-h-[380px] flex flex-col justify-center items-center text-center px-5 sm:px-6 py-16">

          <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[#C79A54] font-semibold text-xs sm:text-sm">
            HomeLuxe Pakistan
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 leading-tight">
            Our Services
          </h1>

          <p className="text-gray-200 mt-5 sm:mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8">
            Professional real estate solutions for buying, selling,
            renting and investing across Pakistan.
          </p>

        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 lg:py-24">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* Section Heading */}
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">

            <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-sm">
              What We Offer
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E3D] mt-3 leading-tight">
              Complete Real Estate Services
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto mt-4 sm:mt-5 leading-7 text-sm sm:text-base">
              From finding your dream property to managing investments,
              HomeLuxe Pakistan provides reliable real estate solutions.
            </p>

          </div>

          {/* Services Grid */}
          {loading ? (

            <div className="flex justify-center py-16 sm:py-20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#C79A54] border-t-transparent rounded-full animate-spin" />
            </div>

          ) : services.length === 0 ? (

            <div className="text-center py-16 sm:py-20">

              <h3 className="text-xl sm:text-2xl font-semibold text-gray-500">
                No Services Found
              </h3>

              <p className="text-gray-400 mt-2">
                Please check back later.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">

              {services.map((service) => {

                const Icon = getIcon(service.title);

                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group"
                  >

                    {/* Image */}
                    <div className="relative h-52 sm:h-56 lg:h-60 overflow-hidden">

                      <Image
                        src={service.image || "/images/no-image.jpg"}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-500"
                      />

                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-7 lg:p-8">

                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-[#C79A54]/10 flex items-center justify-center">

                        <Icon
                          size={28}
                          className="text-[#C79A54]"
                        />

                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] mt-5 sm:mt-6 leading-tight">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-7 sm:leading-8 mt-3 sm:mt-4 text-sm sm:text-base">
                        {service.description}
                      </p>

                      {/* Link */}
                      <Link
                        href={`/services/${service.id}`}
                        className="inline-flex items-center gap-2 mt-6 sm:mt-8 font-semibold text-[#0B1E3D] hover:text-[#C79A54] transition"
                      >
                        Learn More
                        <ArrowRight size={18} />
                      </Link>

                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </div>
      </section>

    </main>
  );
}