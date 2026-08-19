import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Building2,
  ShieldCheck,
  Search,
  BadgeDollarSign,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search Properties",
    description:
      "Browse verified houses, apartments, plots and commercial properties across Pakistan.",
  },
  {
    icon: Home,
    title: "Visit the Property",
    description:
      "Schedule a visit with our agents to inspect the property before making a decision.",
  },
  {
    icon: BadgeDollarSign,
    title: "Negotiate the Price",
    description:
      "We help you negotiate the best market price with complete transparency.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Documentation",
    description:
      "Our legal experts verify documents and complete the buying process safely.",
  },
];

const benefits = [
  "Verified Property Listings",
  "Legal Documentation Assistance",
  "Professional Property Consultants",
  "Best Market Prices",
  "Safe & Secure Transactions",
  "Bank Financing Guidance",
];

export default function BuyPropertyPage() {
  return (
    <main className="bg-[#FDF8F2] overflow-hidden">

      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[420px] sm:min-h-[460px] lg:h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/buy.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#081B37]/75" />

        <div className="relative z-10 min-h-[420px] sm:min-h-[460px] lg:h-[500px] flex flex-col justify-center items-center text-center px-5 sm:px-8">

          <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[#C79A54] font-semibold text-xs sm:text-sm">
            HomeLuxe Pakistan
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-4 leading-tight">
            Buy Property
          </h1>

          <div className="w-16 sm:w-20 h-1 bg-[#C79A54] rounded-full mt-5" />

          <p className="text-gray-200 mt-6 max-w-3xl text-base sm:text-lg lg:text-xl leading-7 sm:leading-8">
            Buy your dream home, apartment, plot or commercial property
            with confidence and complete professional guidance.
          </p>

        </div>
      </section>


      {/* ================= ABOUT ================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">

            {/* Image */}
            <div className="w-full">

              <Image
                src="/images/buybanner.jpg"
                alt="Buy Property"
                width={650}
                height={500}
                className="w-full h-auto rounded-2xl sm:rounded-3xl object-cover"
              />

            </div>

            {/* Content */}
            <div>

              <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-sm">
                Buy With Confidence
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E3D] mt-4 leading-tight">
                Find the Perfect Property
              </h2>

              <p className="text-gray-600 leading-7 sm:leading-8 mt-6 sm:mt-8 text-base sm:text-lg">
                Whether you're looking for a family home, luxury villa,
                apartment, residential plot or commercial investment,
                HomeLuxe Pakistan provides verified listings and expert
                assistance throughout the buying journey.
              </p>

              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-3 mt-8 sm:mt-10 bg-[#0B1E3D] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-[#16335F] transition w-full sm:w-auto"
              >
                Browse Properties
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ================= BUYING PROCESS ================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FDF8F2]">

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-8">

          <div className="text-center max-w-3xl mx-auto">

            <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-sm">
              Buying Process
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E3D] mt-3 leading-tight">
              Simple Steps to Own Your Property
            </h2>

          </div>


          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 mt-10 sm:mt-14 lg:mt-16">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 sm:p-7 lg:p-8 shadow-md hover:shadow-xl transition"
                >

                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#C79A54]/10 flex items-center justify-center">

                    <Icon
                      size={30}
                      className="text-[#C79A54]"
                    />

                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] mt-5 sm:mt-6 leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-7 mt-3 sm:mt-4 text-sm sm:text-base">
                    {step.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* ================= BENEFITS ================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">

        <div className="max-w-6xl mx-auto px-5 sm:px-8">

          <div className="text-center max-w-3xl mx-auto">

            <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-sm">
              Why Choose Us
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E3D] mt-3 leading-tight">
              Benefits of Buying Through HomeLuxe
            </h2>

          </div>


          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-14 lg:mt-16">

            {benefits.map((item) => (

              <div
                key={item}
                className="bg-[#FDF8F2] rounded-xl p-4 sm:p-5 lg:p-6 flex items-center gap-3 sm:gap-4"
              >

                <CheckCircle
                  className="text-[#C79A54] flex-shrink-0"
                  size={22}
                />

                <span className="text-base sm:text-lg font-medium text-[#0B1E3D]">
                  {item}
                </span>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#081B37]">

        <div className="max-w-4xl mx-auto text-center px-5 sm:px-8">

          <Building2
            className="mx-auto text-[#C79A54]"
            size={48}
          />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-6 sm:mt-8 leading-tight">
            Ready to Buy Your Dream Property?
          </h2>

          <p className="text-gray-300 mt-5 sm:mt-6 leading-7 sm:leading-8 text-base sm:text-lg">
            Browse our latest listings or contact our property experts
            for personalized recommendations.
          </p>


          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 lg:gap-6 mt-8 sm:mt-10">

            <Link
              href="/properties"
              className="w-full sm:w-auto bg-[#C79A54] hover:bg-[#B88942] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl transition text-center"
            >
              View Properties
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto border border-white text-white hover:bg-white hover:text-[#081B37] px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl transition text-center"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}