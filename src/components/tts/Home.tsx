import { Link } from "@tanstack/react-router";
import {
  Bot,
  Boxes,
  Smartphone,
  BarChart3,
  ShieldCheck,
  Compass,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import terraLogo from "@/assets/terra-logo.png";
import blsLogo from "@/assets/big-league-swings-logo.png";

// Public-folder asset (not a module import) — already deployed under /public/hero.
const heroImg = "/hero/Gemini_Generated_Image_31m5uu31m5uu31m5.jpeg";

const SERVICES = [
  {
    Icon: Bot,
    title: "AI Automation & Agents",
    body: "Autonomous agents and workflow automation that replace manual operations — not just assist them.",
  },
  {
    Icon: Boxes,
    title: "Product Development",
    body: "Full-cycle build: architecture through production-grade ship. No prototypes handed off unfinished.",
  },
  {
    Icon: Smartphone,
    title: "Web & Mobile Platforms",
    body: "Cross-platform apps and web systems architected to scale past MVP, not rebuilt at year two.",
  },
  {
    Icon: BarChart3,
    title: "Data & Analytics",
    body: "Pipelines, dashboards, and decision systems built on your real data, not a demo dataset.",
  },
  {
    Icon: ShieldCheck,
    title: "Security & Compliance",
    body: "Auth, secrets, and access architected correctly from day one — not patched after an incident.",
  },
  {
    Icon: Compass,
    title: "Strategy & Advisory",
    body: "Technical direction for founders who want a second opinion before they commit budget.",
  },
];

const STUDIO_VENTURES = [
  { name: "IPOFirm", status: "Active venture" },
  { name: "SNAP/EBT SaaS", status: "In development" },
  { name: "Tequila brand", status: "Active venture" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden scroll-mt-[68px]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(9,9,15,0.96) 0%, rgba(9,9,15,0.88) 38%, rgba(13,26,58,0.55) 70%, rgba(26,13,58,0.35) 100%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-[1.2fr_0.8fr] gap-14 items-center">
        {/* Left: positioning */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-gold-dim">
            AI Product Studio
          </div>
          <h1 className="mt-5 font-display text-4xl md:text-6xl font-extrabold tracking-tighter leading-none text-chrome">
            We build the AI systems{" "}
            <span className="text-gold">other studios pitch.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-secondary-soft leading-relaxed max-w-[58ch]">
            Tailored Tech Solutions designs and ships production AI agents, platforms,
            and mobile apps — for clients who need it built right, and for products we
            build and own ourselves.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--gold-bright)] text-[#09090f] font-bold text-sm tracking-wide hover:brightness-110 transition-all"
            >
              Start a Project <ArrowRight size={16} />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gold-dim text-gold text-sm font-semibold tracking-wide hover:bg-[var(--gold-glow)] hover:border-gold transition-all"
            >
              See What We've Built
            </a>
          </div>
        </div>

        {/* Right: the dual model, stated plainly */}
        <div className="grid gap-5">
          <div className="rounded-2xl border border-subtle bg-[rgba(17,17,38,0.55)] backdrop-blur-sm p-6">
            <div className="text-[11px] font-mono uppercase tracking-widest text-gold-dim">
              Model 01
            </div>
            <div className="mt-2 font-display text-xl font-bold text-chrome">
              Consulting
            </div>
            <p className="mt-2 text-sm text-secondary-soft leading-relaxed">
              We build for founders and businesses who need custom AI or software done —
              premium engagements, production standards.
            </p>
          </div>
          <div className="rounded-2xl border border-subtle bg-[rgba(17,17,38,0.55)] backdrop-blur-sm p-6">
            <div className="text-[11px] font-mono uppercase tracking-widest text-gold-dim">
              Model 02
            </div>
            <div className="mt-2 font-display text-xl font-bold text-chrome">
              Owned Products
            </div>
            <p className="mt-2 text-sm text-secondary-soft leading-relaxed">
              Consulting funds a portfolio we build and own outright — Terra Farming,
              Big League Swings, and more in development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-deep scroll-mt-[68px]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="max-w-[640px]">
          <div className="text-[11px] font-mono uppercase tracking-widest text-gold-dim">
            What We Do
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-chrome">
            For companies that need it built.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-subtle rounded-2xl overflow-hidden border border-subtle">
          {SERVICES.map(({ Icon, title, body }) => (
            <div key={title} className="bg-[#0d0d1a] p-8">
              <span className="inline-flex w-10 h-10 rounded-md items-center justify-center border border-gold-dim bg-[var(--gold-glow)]">
                <Icon size={18} className="text-gold" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-chrome">
                {title}
              </h3>
              <p className="mt-2 text-sm text-secondary-soft leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 scroll-mt-[68px]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="max-w-[640px]">
          <div className="text-[11px] font-mono uppercase tracking-widest text-gold-dim">
            What We've Built
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-chrome">
            Products we build and own.
          </h2>
          <p className="mt-4 text-secondary-soft leading-relaxed">
            Proof we build what we sell — not case studies, live products.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <Link
            to="/projects/terra-farming"
            className="group rounded-2xl border border-subtle bg-[#0d0d1a] p-8 flex flex-col hover:border-gold-dim transition-colors"
          >
            <div className="flex items-center justify-between">
              <img src={terraLogo} alt="Terra Farming" className="h-10 w-auto" />
              <ArrowUpRight
                size={18}
                className="text-muted-soft group-hover:text-gold transition-colors"
              />
            </div>
            <h3 className="mt-6 font-display text-xl font-bold text-chrome">
              Terra Farming
            </h3>
            <p className="mt-2 text-sm text-secondary-soft leading-relaxed">
              Philippine agriculture marketplace. Five roles, one platform — Buyer,
              Farmer, Driver, Admin, HQ.
            </p>
          </Link>

          <Link
            to="/projects/big-league-swings"
            className="group rounded-2xl border border-subtle bg-[#0d0d1a] p-8 flex flex-col hover:border-gold-dim transition-colors"
          >
            <div className="flex items-center justify-between">
              <img src={blsLogo} alt="Big League Swings" className="h-10 w-auto" />
              <ArrowUpRight
                size={18}
                className="text-muted-soft group-hover:text-gold transition-colors"
              />
            </div>
            <h3 className="mt-6 font-display text-xl font-bold text-chrome">
              Big League Swings
            </h3>
            <p className="mt-2 text-sm text-secondary-soft leading-relaxed">
              Mobile batting analytics platform, built with former MLB player Denny
              Hocking.
            </p>
          </Link>
        </div>

        <div className="mt-10 rounded-2xl border border-subtle p-8">
          <div className="text-[11px] font-mono uppercase tracking-widest text-gold-dim mb-5">
            In the Studio
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {STUDIO_VENTURES.map((v) => (
              <div key={v.name}>
                <div className="font-display text-base font-bold text-chrome">
                  {v.name}
                </div>
                <div className="mt-1 text-xs font-mono text-muted-soft">{v.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-deep scroll-mt-[68px]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-gold-dim">
            Who We Are
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-chrome">
            Built by operators, not marketers.
          </h2>
        </div>
        <div className="text-secondary-soft leading-relaxed space-y-5 text-base">
          <p>
            Tailored Tech Solutions was founded by Andrew Gwaltney.
            We run a dual-model studio: consulting engagements that fund an in-house
            portfolio of products we build and own outright. Based in Casper, WY.
          </p>
          <p>
            Our founder is also a licensed structural engineer. Rigor isn't a value
            statement here — it's a professional standard we're licensed to hold
            ourselves to.
          </p>
          <p className="text-chrome font-medium">
            We're not a budget dev shop. We take on work we can be proud to own.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 scroll-mt-[68px]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="max-w-[640px]">
          <div className="text-[11px] font-mono uppercase tracking-widest text-gold-dim">
            Get In Touch
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-chrome">
            Two doors. Pick yours.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-subtle p-8">
            <h3 className="font-display text-xl font-bold text-chrome">
              Need something built
            </h3>
            <p className="mt-2 text-sm text-secondary-soft leading-relaxed">
              Founders and businesses looking for custom AI or software work.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a
                href="mailto:gwaltney@tailoredtechsolutions.org"
                className="block text-gold hover:underline"
              >
                gwaltney@tailoredtechsolutions.org
              </a>
              <div className="text-chrome-mid">(940) 601-5260</div>
            </div>
          </div>

          <div className="rounded-2xl border border-subtle p-8">
            <h3 className="font-display text-xl font-bold text-chrome">
              Using one of our products
            </h3>
            <p className="mt-2 text-sm text-secondary-soft leading-relaxed">
              Terra Farming and Big League Swings users and support.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a
                href="https://terrafarming.io"
                target="_blank"
                rel="noreferrer"
                className="block text-gold hover:underline"
              >
                terrafarming.io
              </a>
              <a
                href="https://bigleagueswings.com"
                target="_blank"
                rel="noreferrer"
                className="block text-gold hover:underline"
              >
                bigleagueswings.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
