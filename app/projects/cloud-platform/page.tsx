import Hero from "@/components/sections/hero";
import FeaturedProjects from "@/components/sections/featured-projects";
import ArchitectureSnapshot from "@/components/sections/architecture-snapshot";
import Capabilities from "@/components/sections/capabilities";
import TechnicalWriting from "@/components/sections/technical-writing";
import CTA from "@/components/sections/cta";

function Divider() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid var(--border)",
        margin: "0 32px",
      }}
    />
  );
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Divider />
      <FeaturedProjects />
      <Divider />
      <ArchitectureSnapshot />
      <Divider />
      <Capabilities />
      <Divider />
      <TechnicalWriting />
      <CTA />
    </main>
  );
}
