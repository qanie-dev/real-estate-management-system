import Image from "next/image";
import Link from "next/link";
import {
  Home,
  KeyRound,
  Search,
  ShieldCheck,
  Building2,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Rentals",
    description:
      "Explore verified rental homes, apartments and commercial spaces across Pakistan.",
  },
  {
    icon: Home,
    title: "Schedule a Visit",
    description:
      "Visit your preferred property with our professional real estate consultants.",
  },
  {
    icon: KeyRound,
    title: "Finalize the Agreement",
    description:
      "We assist with rental agreements and ensure transparent documentation.",
  },
  {
    icon: ShieldCheck,
    title: "Move In",
    description:
      "Complete the process quickly and move into your new property with confidence.",
  },
];

const benefits = [
  "Verified Rental Properties",
  "Affordable Rental Options",
  "Secure Rental Agreements",
  "Residential & Commercial Rentals",
  "Professional Property Consultants",
  "Fast & Transparent Process",
];

export default function RentPropertyPage() {
  return (
    <main className="bg-[#FDF8F2] overflow-hidden">

      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[420px] sm:min-h-[460px] lg:h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/rent.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#081B37]/75" />

        <div className="relative z-10 min-h-[420px] sm:min-h-[460px] lg:h-[500px] flex flex-col items-center justify-center text-center px-5 sm:px-8">

          <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[#C79A54] font-semibold text-xs sm:text-sm">
            HomeLuxe Pakistan
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-4 leading-tight">
            Rent Property
          </h1>

          <div className="w-16 sm:w-20 h-1 bg-[#C79A54] rounded-full mt-5" />

          <p className="text-gray-200 mt-6 max-w-3xl text-base sm:text-lg lg:text-xl leading-7 sm:leading-8">
            Find the perfect rental home, apartment, office or shop in
            Pakistan with trusted property experts.
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
                src="/images/rentbanner.jfif"
                alt="Rent Property"
                width={650}
                height={500}
                className="w-full h-auto rounded-2xl sm:rounded-3xl object-cover"
              />

            </div>

            {/* Content */}
            <div>

              <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-sm">
                Rental Solutions
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E3D] mt-4 leading-tight">
                Find Your Ideal Rental Property
              </h2>

              <p className="text-gray-600 leading-7 sm:leading-8 mt-6 sm:mt-8 text-base sm:text-lg">
                Whether you're searching for a family home, luxury apartment,
                office space or commercial shop, HomeLuxe Pakistan offers
                verified rental listings with complete support from search
                to agreement.
              </p>

              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-3 mt-8 sm:mt-10 bg-[#0B1E3D] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-[#16335F] transition w-full sm:w-auto"
              >
                Browse Rentals
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ================= RENTAL PROCESS ================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FDF8F2]">

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-8">

          <div className="text-center max-w-3xl mx-auto">

            <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-sm">
              Rental Process
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E3D] mt-3 leading-tight">
              Renting Made Simple
            </h2>

          </div>


          {/* Process Cards */}
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
              Why Rent With Us
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E3D] mt-3 leading-tight">
              Benefits of Choosing HomeLuxe
            </h2>

          </div>


          {/* Benefits */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-14 lg:mt-16">

            {benefits.map((benefit) => (

              <div
                key={benefit}
                className="bg-[#FDF8F2] rounded-xl p-4 sm:p-5 lg:p-6 flex items-center gap-3 sm:gap-4"
              >

                <CheckCircle
                  className="text-[#C79A54] flex-shrink-0"
                  size={22}
                />

                <span className="text-base sm:text-lg font-medium text-[#0B1E3D]">
                  {benefit}
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
            size={48}
            className="mx-auto text-[#C79A54] sm:w-[60px] sm:h-[60px]"
          />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-6 sm:mt-8 leading-tight">
            Looking for a Rental Property?
          </h2>

          <p className="text-gray-300 mt-5 sm:mt-6 leading-7 sm:leading-8 text-base sm:text-lg">
            Explore our latest rental listings and let our experts help
            you find the perfect place to live or grow your business.
          </p>


          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 lg:gap-6 mt-8 sm:mt-10">

            <Link
              href="/properties"
              className="w-full sm:w-auto bg-[#C79A54] hover:bg-[#B88942] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl transition text-center"
            >
              View Rentals
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