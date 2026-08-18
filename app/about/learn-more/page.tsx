import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Building2,
  Users,
  BadgeCheck,
  Target,
} from "lucide-react";

export default function LearnMorePage() {
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="relative h-[360px] sm:h-[420px]">

        <Image
          src="/images/Hero.jpeg"
          alt="Learn More About HomeLuxe"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#081B37]/75" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-5 sm:px-6">

          <p className="uppercase tracking-[2px] sm:tracking-[4px] text-[#C79A54] font-semibold text-xs sm:text-sm">
            HomeLuxe Pakistan
          </p>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mt-3 sm:mt-4 leading-tight">
            Learn More About Us
          </h1>

          <p className="text-gray-200 max-w-3xl mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8">
            Discover who we are, what we believe in, and why thousands
            of buyers, sellers and investors trust HomeLuxe Pakistan.
          </p>

        </div>

      </section>

      {/* Story */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FDF8F2]">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Image */}
            <div className="w-full flex justify-center">

              <Image
                src="/images/about.jfif"
                alt="HomeLuxe Office"
                width={500}
                height={500}
                className="w-full max-w-[500px] h-auto rounded-2xl sm:rounded-3xl object-cover"
              />

            </div>

            {/* Content */}
            <div>

              <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-sm">
                Our Story
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E3D] mt-4 sm:mt-5 leading-tight">
                Helping Pakistan Find
                Better Properties
              </h2>

              <p className="text-gray-600 mt-6 sm:mt-8 leading-7 sm:leading-8">
                HomeLuxe Pakistan was established with one mission—
                making real estate simple, transparent and trustworthy.
                We help people buy, sell and rent residential,
                commercial and investment properties across Pakistan.
              </p>

              <p className="text-gray-600 mt-4 sm:mt-5 leading-7 sm:leading-8">
                From luxury villas in DHA to apartments in Bahria Town
                and commercial investments in Islamabad, our experienced
                consultants guide every client with honesty and
                professionalism.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Why Us */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="text-center mb-10 sm:mb-14 lg:mb-16">

            <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-sm">
              Why HomeLuxe
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E3D] mt-3 sm:mt-4 leading-tight">
              What Makes Us Different
            </h2>

          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

            <div className="text-center p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <Building2
                className="mx-auto text-[#C79A54]"
                size={42}
              />

              <h3 className="font-bold text-gray-700 text-lg sm:text-xl mt-5 sm:mt-6">
                Premium Listings
              </h3>

              <p className="text-gray-600 mt-3 sm:mt-4 leading-7">
                Verified residential and commercial properties.
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <Users
                className="mx-auto text-[#C79A54]"
                size={42}
              />

              <h3 className="font-bold text-gray-700 text-lg sm:text-xl mt-5 sm:mt-6">
                Expert Team
              </h3>

              <p className="text-gray-600 mt-3 sm:mt-4 leading-7">
                Experienced real estate professionals across Pakistan.
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <BadgeCheck
                className="mx-auto text-[#C79A54]"
                size={42}
              />

              <h3 className="font-bold text-gray-700 text-lg sm:text-xl mt-5 sm:mt-6">
                Trusted Service
              </h3>

              <p className="text-gray-600 mt-3 sm:mt-4 leading-7">
                Transparent deals and customer satisfaction.
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <Target
                className="mx-auto text-[#C79A54]"
                size={42}
              />

              <h3 className="font-bold text-gray-700 text-lg sm:text-xl mt-5 sm:mt-6">
                Smart Investment
              </h3>

              <p className="text-gray-600 mt-3 sm:mt-4 leading-7">
                Helping investors choose profitable opportunities.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FDF8F2]">

        <div className="max-w-5xl mx-auto px-5 sm:px-6 text-center">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E3D] leading-tight">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-14 text-gray-700 text-left">

            {[
              "Integrity & Transparency",
              "Verified Property Listings",
              "Professional Customer Support",
              "Safe Investments",
              "Market Knowledge",
              "Long-Term Client Relationships",
            ].map((value) => (

              <div
                key={value}
                className="flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >

                <CheckCircle
                  className="text-[#C79A54] flex-shrink-0"
                  size={22}
                />

                <span className="font-medium text-sm sm:text-base">
                  {value}
                </span>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#081B37]">

        <div className="max-w-4xl mx-auto text-center px-5 sm:px-6">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to Find Your Dream Property?
          </h2>

          <p className="text-gray-300 mt-5 sm:mt-6 leading-7 sm:leading-8 text-base sm:text-lg">
            Browse our latest listings or contact our experts for
            personalized property recommendations.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">

            <Link
              href="/properties"
              className="bg-[#C79A54] hover:bg-[#B88942] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-3 transition w-full sm:w-auto"
            >
              View Properties
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/contact"
              className="border border-white text-white hover:bg-white hover:text-[#081B37] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition w-full sm:w-auto text-center"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}