
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  BedDouble,
  Bath,
  Square,
  ArrowRight,
} from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();

  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";
  const price = searchParams.get("price") || "";

  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, [location, category, price]);

  async function fetchProperties() {
    try {
      setLoading(true);

      const res = await fetch("/api/properties");

      if (!res.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await res.json();

      let filtered = data;

      // Location Filter
      if (location) {
        filtered = filtered.filter((item: any) =>
          item.city?.toLowerCase().includes(location.toLowerCase())
        );
      }

      // Category Filter
      if (category) {
        filtered = filtered.filter(
          (item: any) => item.category?.name === category
        );
      }

      // Price Filter
      if (price) {
        filtered = filtered.filter((item: any) => {
          const propertyPrice = Number(item.price);

          switch (price) {
            case "50":
              return propertyPrice <= 5000000;

            case "100":
              return (
                propertyPrice > 5000000 &&
                propertyPrice <= 10000000
              );

            case "200":
              return (
                propertyPrice > 10000000 &&
                propertyPrice <= 20000000
              );

            case "500":
              return (
                propertyPrice > 20000000 &&
                propertyPrice <= 50000000
              );

            case "501":
              return propertyPrice > 50000000;

            default:
              return true;
          }
        });
      }

      setProperties(filtered);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FDF8F2] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 border-4 border-[#081B37] border-t-transparent rounded-full animate-spin"></div>

          <p className="text-xl text-gray-600 mt-5">
            Loading properties...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FDF8F2] min-h-screen">

      {/* Hero */}
      <section className="bg-[#081B37] py-16 sm:py-20 text-center px-6">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Search Results
        </h1>

        <p className="text-gray-300 mt-4 text-base sm:text-lg">
          {properties.length}{" "}
          {properties.length === 1 ? "Property" : "Properties"} Found
        </p>

      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {properties.length === 0 ? (
          <div className="text-center py-16 sm:py-20 px-4">

            <h2 className="text-2xl sm:text-3xl font-bold text-[#081B37]">
              No Properties Found
            </h2>

            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Try another location, category or price range.
            </p>

            <Link
              href="/properties"
              className="inline-flex items-center gap-2 mt-7 bg-[#081B37] text-white px-6 py-3 rounded-xl hover:bg-[#16335F] transition"
            >
              Browse Properties
              <ArrowRight size={17} />
            </Link>

          </div>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">

            {properties.map((property: any) => (

              <div
                key={property.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              >

                {/* Image */}
                <div className="relative h-56 sm:h-64 md:h-72">

                  <Image
                    src={
                      property.image ||
                      "/images/placeholder.jpg"
                    }
                    alt={property.title}
                    fill
                    className="object-cover"
                  />

                  <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#C79A54] text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg">
                    {property.status || "Available"}
                  </span>

                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">

                  <h2 className="text-xl sm:text-2xl font-bold text-[#081B37] line-clamp-2">
                    {property.title}
                  </h2>

                  <div className="flex items-start gap-2 mt-3 text-gray-500 text-sm sm:text-base">

                    <MapPin
                      size={18}
                      className="shrink-0 mt-0.5"
                    />

                    <span>
                      {property.location
                        ? `${property.location}, `
                        : ""}
                      {property.city}
                    </span>

                  </div>

                  {/* Property Features */}
                  <div className="grid grid-cols-3 gap-2 mt-6 text-gray-600 text-sm">

                    <div className="flex items-center justify-center gap-1.5">
                      <BedDouble size={17} />
                      <span>{property.bedrooms || 0}</span>
                    </div>

                    <div className="flex items-center justify-center gap-1.5">
                      <Bath size={17} />
                      <span>{property.bathrooms || 0}</span>
                    </div>

                    <div className="flex items-center justify-center gap-1.5">
                      <Square size={17} />
                      <span className="truncate">
                        {property.area || "N/A"}
                      </span>
                    </div>

                  </div>

                  {/* Price + Details */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-7">

                    <h3 className="text-xl sm:text-2xl font-bold text-[#C79A54]">
                      ₨ {Number(property.price).toLocaleString()}
                    </h3>

                    <Link
                      href={`/properties/${property.id}`}
                      className="w-full sm:w-auto justify-center bg-[#081B37] text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-[#16335F] transition"
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

      </section>

    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#FDF8F2] flex items-center justify-center px-6">
          <div className="text-center">

            <div className="mx-auto w-12 h-12 border-4 border-[#081B37] border-t-transparent rounded-full animate-spin"></div>

            <p className="text-xl text-gray-600 mt-5">
              Loading search results...
            </p>

          </div>
        </main>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
