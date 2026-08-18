import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExploreCategories from "@/components/ExploreCategories";
import FeaturedProperties from "@/components/FeaturedProperties";
import WhyChooseUs from "@/components/WhyChooseUs";
import AgentsSection from "@/components/AgentsSection";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Brands from "@/components/Brands";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ExploreCategories />
      <FeaturedProperties />
      <WhyChooseUs />
      <AgentsSection />
      <Testimonials />
      <CTASection />
      <Brands />
      <Footer />
    </>
  );
}