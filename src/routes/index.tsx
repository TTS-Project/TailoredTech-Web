import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/tts/Nav";
import { Footer } from "@/components/tts/Footer";
import { Hero, Projects, About, Contact } from "@/components/tts/Home";
import { ServiceCatalog } from "@/components/tts/ServiceCatalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tailored Tech Solutions — AI Product Studio" },
      {
        name: "description",
        content:
          "Tailored Tech Solutions builds production AI agents, platforms, and mobile apps for clients — and owns a portfolio of products including Terra Farming and Big League Swings. Studio of Andrew Gwaltney.",
      },
      { property: "og:title", content: "Tailored Tech Solutions — AI Product Studio" },
      {
        property: "og:description",
        content:
          "Custom AI systems and software, built for clients who need it done right — and built the same way for the products we own outright.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://tailoredtechsolutions.org/" },
      { name: "twitter:title", content: "Tailored Tech Solutions — AI Product Studio" },
      {
        name: "twitter:description",
        content:
          "Custom AI systems and software, built for clients who need it done right — and built the same way for the products we own outright.",
      },
    ],
    links: [{ rel: "canonical", href: "https://tailoredtechsolutions.org/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Tailored Tech Solutions",
          url: "https://tailoredtechsolutions.org",
          telephone: "+1-940-601-5260",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Nipomo",
            addressRegion: "CA",
            postalCode: "93444",
            addressCountry: "US",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-void min-h-screen">
      <Nav />
      <main>
        <Hero />
        <ServiceCatalog />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
