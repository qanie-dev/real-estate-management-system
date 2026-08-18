import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Users,
  ShieldCheck,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="relative h-[360px] sm:h-[400px]">

        <Image
          src="/images/why.png"
          alt="About HomeLuxe"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#081B37]/70" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-5 sm:px-6">

          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            About HomeLuxe
          </h1>

          <p className="text-gray-200 mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8">
            Helping families and investors discover their dream
            properties with trust, transparency and excellence.
          </p>

        </div>

      </section>

      {/* About */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FDF8F2]">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Image */}
            <div className="w-full flex justify-center">

              <Image
                src="/images/about.jfif"
                alt="About HomeLuxe"
                width={500}
                height={500}
                className="w-full max-w-[500px] h-auto rounded-2xl sm:rounded-3xl object-cover"
              />

            </div>

            {/* Content */}
            <div>

              <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-sm">
                About Us
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E3D] mt-4 sm:mt-5 leading-tight">
                We Help People Find
                Their Perfect Property
              </h2>

              <p className="text-gray-600 leading-7 sm:leading-8 mt-6 sm:mt-8">
                HomeLuxe is one of the leading real estate companies
                dedicated to helping clients buy, sell, and rent
                premium residential and commercial properties.
              </p>

              <p className="text-gray-600 leading-7 sm:leading-8 mt-4 sm:mt-5">
                Our experienced team ensures every customer receives
                honest advice, market expertise and complete support
                throughout the buying journey.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-8 sm:mt-10">

                <div className="flex items-center text-gray-600 gap-3">
                  <CheckCircle
                    className="text-[#C79A54] flex-shrink-0"
                    size={22}
                  />
                  <span>Verified Listings</span>
                </div>

                <div className="flex items-center text-gray-600 gap-3">
                  <CheckCircle
                    className="text-[#C79A54] flex-shrink-0"
                    size={22}
                  />
                  <span>Trusted Agents</span>
                </div>

                <div className="flex items-center text-gray-600 gap-3">
                  <CheckCircle
                    className="text-[#C79A54] flex-shrink-0"
                    size={22}
                  />
                  <span>Premium Locations</span>
                </div>

                <div className="flex items-center text-gray-600 gap-3">
                  <CheckCircle
                    className="text-[#C79A54] flex-shrink-0"
                    size={22}
                  />
                  <span>24/7 Customer Support</span>
                </div>

              </div>

              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-3 mt-8 sm:mt-12 bg-[#0B1E3D] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-[#16335F] transition w-full sm:w-auto"
              >
                Explore Properties
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Statistics */}
      <section className="py-14 sm:py-16 lg:py-20 bg-white">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 sm:gap-y-12 lg:gap-8">

            <div className="text-center">
              <Home
                className="mx-auto text-[#C79A54]"
                size={34}
              />

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 text-[#0B1E3D]">
                1500+
              </h3>

              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Properties
              </p>
            </div>

            <div className="text-center">
              <Users
                className="mx-auto text-[#C79A54]"
                size={34}
              />

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 text-[#0B1E3D]">
                800+
              </h3>

              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Happy Clients
              </p>
            </div>

            <div className="text-center">
              <ShieldCheck
                className="mx-auto text-[#C79A54]"
                size={34}
              />

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 text-[#0B1E3D]">
                100%
              </h3>

              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Verified Listings
              </p>
            </div>

            <div className="text-center">
              <Award
                className="mx-auto text-[#C79A54]"
                size={34}
              />

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 text-[#0B1E3D]">
                15+
              </h3>

              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Years Experience
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FDF8F2]">

        <div className="max-w-4xl mx-auto text-center px-5 sm:px-6">

          <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-sm">
            Our Mission
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E3D] mt-4 sm:mt-5 leading-tight">
            Making Real Estate
            <br className="hidden sm:block" />
            Easy & Transparent
          </h2>

          <p className="text-gray-600 leading-7 sm:leading-9 mt-6 sm:mt-8 text-base sm:text-lg">
            We believe buying a home should be exciting—not stressful.
            Our mission is to provide reliable property listings,
            professional guidance, and exceptional customer service
            so every client can make confident real estate decisions.
          </p>

        </div>

      </section>

    </main>
  );
}