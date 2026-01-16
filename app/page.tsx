import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { PreviewGallery } from "@/components/home/PreviewGallery";
import { Footer } from "@/components/home/Footer";
import { SupporterWall } from "@/components/home/SupporterWall";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PreviewGallery />
        <SupporterWall />
        <Footer />
      </main>
    </>
  );
}
