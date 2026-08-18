import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  BadgeCheck,
  CircleDollarSign,
  Headset,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "Verified Properties",
    description:
      "All properties are carefully verified to give you complete peace of mind.",
    icon: ShieldCheck,
  },
  {
    title: "Expert Guidance",
    description:
      "Get professional advice from experienced real estate consultants.",
    icon: BadgeCheck,
  },
  {
    title: "Best Price Guarantee",
    description:
      "We help you find the best property at the most competitive price.",
    icon: CircleDollarSign,
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated team is available anytime to answer your questions.",
    icon: Headset,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 pb-2 bg-[#FDF8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">

          {/* Left Side */}
          <div>

            <p className="uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] text-xs sm:text-sm font-semibold">
              Why Choose Us
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E3D] leading-tight mt-3 sm:mt-4">
              We Make Property
              <br className="hidden sm:block" />
              {" "}Buying Simple & Safe
            </h2>

            <p className="text-gray-600 text-sm sm:text-base mt-5 sm:mt-7 leading-7 sm:leading-8 max-w-xl">
              With years of experience in the real estate industry,
              we provide trusted property solutions with transparency,
              expert guidance, and complete customer satisfaction.
            </p>

            {/* Button */}
            <Link
              href="/about/learn-more"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 mt-7 sm:mt-9 bg-[#0B1E3D] hover:bg-[#16335F] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition text-sm sm:text-base font-medium"
            >
              Learn More About Us
              <ArrowRight size={18} />
            </Link>

            {/* Decorative Image */}
            <div className="mt-5 sm:mt-6 w-full max-w-[420px]">
              <Image
                src="/images/why.png"
                alt="Why choose HomeLuxe"
                width={420}
                height={100}
                className="w-full h-auto rounded-xl"
              />
            </div>

          </div>

          {/* Right Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">

            {features.map((item, index) => {

              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 shadow-md hover:shadow-xl transition duration-300 group"
                >

                  {/* Icon */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F7F2E8] flex items-center justify-center group-hover:bg-[#C79A54] transition">

                    <Icon
                      size={26}
                      className="text-[#C79A54] group-hover:text-white transition sm:w-[30px] sm:h-[30px]"
                    />

                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#0B1E3D] mt-5 sm:mt-6">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base leading-6 sm:leading-7 mt-3 sm:mt-4">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}