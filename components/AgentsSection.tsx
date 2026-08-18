
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

interface Agent {
  id: number;
  name: string;
  designation: string;
  image: string;
  active?: boolean;
}

export default function AgentsSection() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  async function fetchAgents() {
    try {
      const res = await fetch("/api/agents");
      const data = await res.json();

      setAgents(
        data.filter((agent: Agent) => agent.active !== false)
      );
    } catch (error) {
      console.error("Error fetching agents:", error);
    } finally {
      setLoading(false);
    }
  }

  /* Loading */
  if (loading) {
    return (
      <section className="bg-[#F8FAFC] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="flex flex-col items-center justify-center gap-4">

            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#D4A017] border-t-transparent rounded-full animate-spin" />

            <p className="text-gray-500 font-medium text-sm sm:text-base">
              Loading our team...
            </p>

          </div>

        </div>
      </section>
    );
  }

  /* Empty State */
  if (agents.length === 0) {
    return (
      <section className="bg-[#F8FAFC] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <p className="text-gray-500 text-base sm:text-lg">
            No agents available at the moment.
          </p>

        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F8FAFC] py-14 sm:py-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">

          <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#D4A017] font-semibold text-xs sm:text-sm">
            Meet Our Team
          </p>

          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#082B5C] leading-tight">
            Our Professional Agents
          </h2>

          <p className="mt-4 sm:mt-5 max-w-2xl mx-auto text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base px-2">
            Our experienced consultants are dedicated to helping you find
            the perfect property with trusted guidance and professional
            service.
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">

          {agents.map((agent) => (
            <div
              key={agent.id}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 w-full"
            >

              {/* Image */}
              <div className="relative h-[300px] sm:h-[340px] lg:h-[360px] overflow-hidden">

                <Image
                  src={
                    agent.image ||
                    "/images/placeholder-agent.jpg"
                  }
                  alt={agent.name}
                  fill
                  className="object-contain group-hover:scale-105 transition duration-500"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Social Icons */}
                <div
                  className="
                    absolute bottom-4 sm:bottom-5
                    left-1/2 -translate-x-1/2
                    flex gap-2 sm:gap-3
                    opacity-100 sm:opacity-0
                    sm:group-hover:opacity-100
                    transition duration-300
                  "
                >

                  <a
                    href="#"
                    className="bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-[#082B5C] hover:text-white transition shadow-md"
                    aria-label={`${agent.name} on Facebook`}
                  >
                    <FaFacebookF size={16} />
                  </a>

                  <a
                    href="#"
                    className="bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-[#082B5C] hover:text-white transition shadow-md"
                    aria-label={`${agent.name} on Instagram`}
                  >
                    <FaInstagram size={16} />
                  </a>

                  <a
                    href="#"
                    className="bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-[#082B5C] hover:text-white transition shadow-md"
                    aria-label={`${agent.name} on LinkedIn`}
                  >
                    <FaLinkedinIn size={16} />
                  </a>

                  <a
                    href={`mailto:${agent.name
                      .toLowerCase()
                      .replace(" ", ".")}@homeluxe.pk`}
                    className="bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-[#082B5C] hover:text-white transition shadow-md"
                    aria-label={`Email ${agent.name}`}
                  >
                    <Mail size={16} />
                  </a>

                </div>

              </div>

              {/* Content */}
              <div className="text-center py-6 sm:py-8 px-4 sm:px-6">

                <h3 className="text-xl sm:text-2xl font-bold text-[#082B5C] leading-tight">
                  {agent.name}
                </h3>

                <p className="mt-2 text-[#D4A017] font-semibold text-sm sm:text-base">
                  {agent.designation}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}