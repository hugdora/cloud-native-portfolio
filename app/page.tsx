import Hero from "@/components/sections/hero";
import FeaturedProjects from "@/components/sections/featured-projects";
import Capabilities from "@/components/sections/capabilities";
import ArchitectureSnapshot from "@/components/sections/architecture-snapshot";
import TechnicalWriting from "@/components/sections/technical-writing";
import CTA from "@/components/sections/cta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
      <Capabilities />
      <ArchitectureSnapshot />
      <TechnicalWriting />
      <CTA />
    </main>
  );
}