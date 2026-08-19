
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  city: string;
  status: string;
  image: string;
  description: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");

      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await res.json();

      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#081B37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="bg-white overflow-hidden">

      {/* ================= HERO ================= */}

      <section className="relative h-[300px] sm:h-[340px] md:h-[380px]">

        <Image
          src="/images/commercial.jpg"
          alt="Projects"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#081B37]/75" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6">

          <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[#C79A54] text-xs sm:text-sm font-semibold">
            HomeLuxe Pakistan
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 sm:mt-4">
            Our Projects
          </h1>

          <div className="w-16 sm:w-20 h-1 bg-[#C79A54] rounded-full mt-4" />

          <p className="text-gray-200 mt-4 sm:mt-5 max-w-xl md:max-w-2xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7 px-2">
            Explore premium residential and commercial projects
            across Pakistan.
          </p>

        </div>

      </section>


      {/* ================= PROJECTS SECTION ================= */}

      <section className="py-14 sm:py-18 md:py-24 bg-[#FDF8F2]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Heading */}

          <div className="text-center mb-10 sm:mb-12 md:mb-16">

            <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] text-xs sm:text-sm font-semibold">
              Featured Projects
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1E3D] mt-3 sm:mt-4 leading-tight">
              Top Housing Projects in Pakistan
            </h2>

            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-7">
              Discover carefully selected residential and commercial
              projects offering excellent locations and investment
              opportunities.
            </p>

          </div>


          {/* ================= NO PROJECTS ================= */}

          {projects.length === 0 ? (

            <div className="text-center py-16 sm:py-20">

              <h2 className="text-xl sm:text-2xl text-gray-500">
                No Projects Found
              </h2>

              <p className="text-gray-400 mt-3 text-sm sm:text-base">
                Please check back later for new projects.
              </p>

            </div>

          ) : (

            /* ================= PROJECT GRID ================= */

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 lg:gap-10">

              {projects.map((project) => (

                <div
                  key={project.id}
                  className="
                    bg-white
                    rounded-2xl
                    overflow-hidden
                    shadow-md
                    hover:shadow-xl
                    transition-all
                    duration-300
                    group
                    flex
                    flex-col
                  "
                >

                  {/* ================= IMAGE ================= */}

                  <div className="relative h-52 sm:h-56 md:h-60 lg:h-64 overflow-hidden">

                    <Image
                      src={project.image || "/images/no-image.jpg"}
                      alt={project.title}
                      fill
                      className="
                        object-cover
                        group-hover:scale-110
                        transition-transform
                        duration-500
                      "
                    />

                  </div>


                  {/* ================= CONTENT ================= */}

                  <div className="p-5 sm:p-6 md:p-7 flex flex-col flex-1">

                    {/* Status */}

                    <div>

                      <span className="inline-block bg-[#C79A54] text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                        {project.status}
                      </span>

                    </div>


                    {/* Title */}

                    <h3 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] mt-4 sm:mt-5 leading-tight">
                      {project.title}
                    </h3>


                    {/* Location */}

                    <div className="flex items-start gap-2 mt-4 text-gray-600 text-sm sm:text-base">

                      <MapPin
                        size={18}
                        className="flex-shrink-0 mt-0.5 text-[#C79A54]"
                      />

                      <span>
                        {project.city}
                      </span>

                    </div>


                    {/* Investment */}

                    <div className="flex items-start gap-2 mt-3 text-gray-600 text-sm sm:text-base">

                      <Calendar
                        size={18}
                        className="flex-shrink-0 mt-0.5 text-[#C79A54]"
                      />

                      <span>
                        Available for Investment
                      </span>

                    </div>


                    {/* Description */}

                    <p className="text-gray-600 leading-6 sm:leading-7 mt-4 sm:mt-5 text-sm sm:text-base line-clamp-3">
                      {project.description}
                    </p>


                    {/* View Details */}

                    <div className="mt-auto pt-6 sm:pt-8">

                      <Link
                        href={`/projects/${project.id}`}
                        className="
                          inline-flex
                          items-center
                          gap-2 sm:gap-3
                          text-[#0B1E3D]
                          font-semibold
                          text-sm sm:text-base
                          hover:text-[#C79A54]
                          transition-colors
                          group/link
                        "
                      >

                        <span>
                          View Details
                        </span>

                        <ArrowRight
                          size={18}
                          className="
                            transition-transform
                            duration-300
                            group-hover/link:translate-x-1
                          "
                        />

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
