import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { HomeStylesSection } from "@/components/sections/home-styles-section"
import { TechnologySection } from "@/components/sections/technology-section"
import { VisionSection } from "@/components/sections/vision-section"
import { SubsidiesSection } from "@/components/sections/subsidies-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <HomeStylesSection />
        <TechnologySection />
        <VisionSection />
        <SubsidiesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
