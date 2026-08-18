import Link from "next/link";
import Image from "next/image";
import { PhoneCall, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">

          {/* Background Image */}
          <Image
            src="/images/Hero.jpeg"
            alt="Find your dream property"
            fill
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-[#081B37]/85" />

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-7 sm:gap-9 lg:gap-10 px-5 sm:px-8 md:px-10 lg:px-16 py-10 sm:py-12 lg:py-14">

            {/* Left Content */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6 text-center sm:text-left">

              {/* Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C79A54] flex items-center justify-center flex-shrink-0">

                <PhoneCall
                  size={28}
                  className="text-white sm:w-[34px] sm:h-[34px]"
                />

              </div>

              {/* Text */}
              <div>

                <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight">
                  Ready to Find Your Dream Property?
                </h2>

                <p className="text-gray-300 text-sm sm:text-base mt-3 leading-6 sm:leading-7 max-w-xl">
                  Let us help you find the perfect property,
                  whether you're buying, selling, or investing.
                </p>

              </div>

            </div>

            {/* Button */}
            <Link
              href="/enquire"
              className="w-full sm:w-auto bg-[#C79A54] hover:bg-[#B88942] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition text-sm sm:text-base font-semibold flex-shrink-0"
            >
              Enquire Now
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}