
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  House,
  Building2,
  BriefcaseBusiness,
  MapPinned,
  ArrowRight,
} from "lucide-react";

interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
}

export default function ExploreCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/properties/categories");

      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await res.json();
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-14 sm:py-16 lg:py-22 pb-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center">
            <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-xs sm:text-sm">
              Explore Categories
            </p>

            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1E3D] leading-tight">
              Find Properties That Match Your Lifestyle
            </h2>
          </div>

          {/* Loading */}
          <div className="flex justify-center items-center py-16 sm:py-20">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#C79A54] border-t-transparent rounded-full animate-spin" />
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="py-14 sm:py-16 lg:py-22 pb-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-xs sm:text-sm">
            Explore Categories
          </p>

          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#0B1E3D] leading-tight">
            Find Properties That Match Your Lifestyle
          </h2>

        </div>

        {/* Cards */}
        {categories.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <p className="text-gray-500 text-base sm:text-xl">
              No categories available
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 mt-10 sm:mt-12 lg:mt-16">

            {categories.map((item) => {

              const Icon =
                item.name.toLowerCase() === "house"
                  ? House
                  : item.name.toLowerCase() === "apartment"
                  ? Building2
                  : item.name.toLowerCase() === "commercial"
                  ? BriefcaseBusiness
                  : MapPinned;

              return (
                <Link
                  key={item.id}
                  href={`/properties/category/${item.name.toLowerCase()}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 block"
                >

                  {/* Image */}
                  <div className="relative h-52 sm:h-56 md:h-60 overflow-hidden">
                    <Image
                      src={item.image || "/images/house.jfif"}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative px-5 sm:px-6 pb-7 sm:pb-8 pt-10 sm:pt-11 text-center">

                    {/* Floating Icon */}
                    <div className="absolute -top-7 sm:-top-8 left-5 sm:left-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0B1E3D] text-white flex items-center justify-center shadow-lg group-hover:bg-[#C79A54] transition">

                      <Icon
                        size={24}
                        className="sm:w-7 sm:h-7"
                      />

                    </div>

                    {/* Category Name */}
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#0B1E3D] break-words">
                      {item.name}
                    </h3>

                    {/* Property Count */}
                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                      {item.count} Properties
                    </p>

                  </div>

                </Link>
              );
            })}

          </div>
        )}

        {/* Button */}
        <div className="mt-10 sm:mt-12 lg:mt-16 flex justify-center px-2">

          <Link
            href="/properties"
            className="w-full sm:w-auto bg-[#0B1E3D] hover:bg-[#16335F] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition text-sm sm:text-base font-medium"
          >
            View All Properties
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </section>
  );
}