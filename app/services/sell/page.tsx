
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Camera,
  Users,
  BadgeDollarSign,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    icon: Building2,
    title: "List Your Property",
    description:
      "Submit your property details including location, price and specifications.",
  },
  {
    icon: Camera,
    title: "Professional Marketing",
    description:
      "We advertise your property using high-quality photos and digital marketing.",
  },
  {
    icon: Users,
    title: "Connect with Buyers",
    description:
      "Our experts connect your property with genuine and verified buyers.",
  },
  {
    icon: BadgeDollarSign,
    title: "Close the Deal",
    description:
      "Receive the best market value with complete legal documentation support.",
  },
];

const benefits = [
  "Free Property Evaluation",
  "Verified Buyers Only",
  "Professional Marketing",
  "Legal Documentation Support",
  "Fast Selling Process",
  "Maximum Market Value",
];

export default function SellPropertyPage() {
  return (
    <main className="bg-[#FDF8F2] overflow-hidden">

      {/* Hero */}
      <section
        className="relative min-h-[360px] sm:min-h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/sell.jfif')",
        }}
      >
        <div className="absolute inset-0 bg-[#081B37]/75" />

        <div className="relative z-10 min-h-[360px] sm:min-h-[400px] flex flex-col justify-center items-center text-center px-5 sm:px-6 py-16">

          <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[#C79A54] font-semibold text-xs sm:text-sm">
            HomeLuxe Pakistan
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 leading-tight">
            Sell Property
          </h1>

          <p className="text-gray-200 mt-5 sm:mt-6 max-w-3xl text-base sm:text-lg leading-7 sm:leading-8">
            Sell your house, apartment, plot or commercial property
            quickly with trusted real estate professionals.
          </p>

        </div>
      </section>

      {/* About */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">

            {/* Image */}
            <div className="w-full">
              <Image
                src="/images/sellbanner.jfif"
                alt="Sell Property"
                width={650}
                height={500}
                className="w-full h-auto rounded-2xl sm:rounded-3xl object-cover"
              />
            </div>

            {/* Content */}
            <div>

              <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-sm">
                Sell With Confidence
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E3D] mt-3 sm:mt-4 leading-tight">
                Get the Best Value for Your Property
              </h2>

              <p className="text-gray-600 leading-7 sm:leading-8 mt-6 sm:mt-8 text-base">
                HomeLuxe Pakistan helps homeowners and investors sell
                residential and commercial properties quickly through
                verified buyers, professional marketing and transparent
                legal procedures.
              </p>

              <Link
                href="/enquire"
                className="inline-flex items-center justify-center gap-3 mt-7 sm:mt-10 bg-[#0B1E3D] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-[#16335F] transition w-full sm:w-auto"
              >
                List Your Property
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* Selling Process */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FDF8F2]">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="text-center">

            <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-sm">
              Selling Process
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1E3D] mt-3 leading-tight">
              Sell Your Property in Four Easy Steps
            </h2>

          </div>

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
                      className="text-[#C79A54] sm:hidden"
                    />

                    <Icon
                      size={34}
                      className="text-[#C79A54] hidden sm:block"
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

      {/* Benefits */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">

        <div className="max-w-6xl mx-auto px-5 sm:px-6">

          <div className="text-center">

            <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-sm">
              Why Choose HomeLuxe
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1E3D] mt-3 leading-tight">
              Benefits of Selling With Us
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-14 lg:mt-16">

            {benefits.map((benefit) => (

              <div
                key={benefit}
                className="bg-[#FDF8F2] rounded-xl p-4 sm:p-5 lg:p-6 flex items-center gap-3 sm:gap-4"
              >

                <CheckCircle
                  size={22}
                  className="text-[#C79A54] shrink-0 sm:w-6 sm:h-6"
                />

                <span className="text-base sm:text-lg font-medium text-[#0B1E3D]">
                  {benefit}
                </span>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#081B37]">

        <div className="max-w-4xl mx-auto text-center px-5 sm:px-6">

          <ShieldCheck
            size={50}
            className="mx-auto text-[#C79A54] sm:w-[60px] sm:h-[60px]"
          />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-6 sm:mt-8 leading-tight">
            Ready to Sell Your Property?
          </h2>

          <p className="text-gray-300 mt-5 sm:mt-6 leading-7 sm:leading-8 text-base sm:text-lg">
            Let HomeLuxe Pakistan help you find the right buyer,
            complete legal formalities and get the best market value.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">

            <Link
              href="/enquire"
              className="bg-[#C79A54] hover:bg-[#B88942] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl transition w-full sm:w-auto text-center"
            >
              Enquire Now
            </Link>

            <Link
              href="/contact"
              className="border border-white text-white hover:bg-white hover:text-[#081B37] px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl transition w-full sm:w-auto text-center"
            >
              Contact Us
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}