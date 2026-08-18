"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, User, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  designation: string;
  message: string;
  rating: number;
  image?: string;
  active?: boolean;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();

      const activeTestimonials = data.filter(
        (item: Testimonial) => item.active !== false
      );

      setTestimonials(activeTestimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={17}
        fill={index < rating ? "#D4A017" : "none"}
        className={
          index < rating ? "text-[#D4A017]" : "text-gray-300"
        }
      />
    ));
  };

  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#D4A017] border-t-transparent rounded-full animate-spin" />

            <p className="text-gray-500 font-medium text-sm sm:text-base">
              Loading testimonials...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl sm:text-5xl mb-4">
            💬
          </div>

          <p className="text-gray-500 text-base sm:text-lg">
            No testimonials available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">

          <div className="inline-flex items-center gap-2 bg-[#D4A017]/10 px-3 sm:px-4 py-2 rounded-full">
            <span className="uppercase tracking-[2px] sm:tracking-[3px] text-[#D4A017] font-semibold text-xs sm:text-sm">
              Testimonials
            </span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#082B5C] leading-tight">
            What Our Clients Say
          </h2>

          <p className="mt-4 sm:mt-5 max-w-2xl mx-auto text-gray-600 text-sm sm:text-base leading-7 sm:leading-relaxed px-2">
            Hear from our satisfied clients who found their dream
            properties through HomeLuxe.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-1 sm:px-6 lg:px-10">

          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0 px-1 sm:px-2 lg:px-4"
                >

                  {/* Card */}
                  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 md:p-12 lg:p-14 max-w-4xl mx-auto border border-gray-100">

                    <div className="flex flex-col items-center text-center">

                      {/* Rating */}
                      <div className="flex flex-wrap items-center justify-center gap-1 mb-5">

                        <div className="flex items-center gap-0.5 sm:gap-1">
                          {renderStars(item.rating)}
                        </div>

                        <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-400">
                          ({item.rating}/5)
                        </span>

                      </div>

                      {/* Testimonial */}
                      <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-7 sm:leading-8 md:leading-relaxed max-w-3xl">
                        "{item.message}"
                      </p>

                      {/* Client */}
                      <div className="flex items-center gap-3 sm:gap-4 mt-7 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-100 w-full max-w-sm">

                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">

                          {item.image ? (
                            <Image
                              src={
                                item.image.startsWith("/")
                                  ? item.image
                                  : `/images/${item.image}`
                              }
                              alt={item.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User
                              size={24}
                              className="text-gray-400"
                            />
                          )}

                        </div>

                        <div className="text-left min-w-0">

                          <h4 className="font-bold text-[#082B5C] text-base sm:text-lg truncate">
                            {item.name}
                          </h4>

                          <p className="text-[#D4A017] font-medium text-xs sm:text-sm mt-1">
                            {item.designation}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 sm:left-1 md:left-2 lg:left-3 top-1/2 -translate-y-1/2 bg-white shadow-lg sm:shadow-xl rounded-full w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center hover:bg-[#082B5C] hover:text-white transition-all duration-300 border border-gray-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 sm:right-1 md:right-2 lg:right-3 top-1/2 -translate-y-1/2 bg-white shadow-lg sm:shadow-xl rounded-full w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center hover:bg-[#082B5C] hover:text-white transition-all duration-300 border border-gray-200"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>
            </>
          )}

        </div>

        {/* Dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-7 sm:mt-8">

            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#D4A017] w-7 sm:w-8"
                    : "bg-gray-300 hover:bg-gray-400 w-2.5"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}

          </div>
        )}

        {/* Counter */}
        <div className="text-center mt-5">
          <p className="text-xs sm:text-sm text-gray-400">
            {currentIndex + 1} of {testimonials.length}
          </p>
        </div>

      </div>
    </section>
  );
}