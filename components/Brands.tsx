
import Image from "next/image";

const brands = [
  {
    name: "Bahria",
    image: "/images/bahria.jfif",
  },
  {
    name: "Zameen",
    image: "/images/zameen.jfif",
  },
  {
    name: "DHA",
    image: "/images/dha.jfif",
  },
  {
    name: "park-view-city",
    image: "/images/parkviewcity.jfif",
  },
  {
    name: "capital-smart-city",
    image: "/images/capitalsmartcity.jfif",
  },
];

export default function Brands() {
  return (
    <section className="py-10 sm:py-12 md:py-15 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <p className="text-center uppercase tracking-[2px] sm:tracking-[3px] text-[#C79A54] font-semibold text-xs sm:text-sm">
          Trusted By Leading Brands
        </p>

        {/* Brands */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 mt-8 sm:mt-12 items-center">

          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex justify-center items-center min-h-[70px] sm:min-h-[80px]"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                width={150}
                height={60}
                className="
                  w-auto
                  max-w-[120px]
                  sm:max-w-[135px]
                  lg:max-w-[150px]
                  h-auto
                  max-h-[50px]
                  sm:max-h-[60px]
                  object-contain
                  opacity-60
                  hover:opacity-100
                  transition duration-300
                "
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
