import Reveal from "../ui/Reveal";
import { testimonials } from "../../data/testimonials";

/**
 * TestimonialsSection (FIXED)
 * - Marquee stable (track dupliqué)
 * - Fades plus doux aux extrémités
 * - Hover: border + glow coloré
 */

function TestimonialCard({ t }) {
  return (
    <div
      className={[
        "group shrink-0",
        "w-[260px] sm:w-[320px]",
        "rounded-3xl border p-4 sm:p-5",
        "backdrop-blur-xl transition-all duration-300",
        "hover:-translate-y-1",
      ].join(" ")}
      style={{
        background: "linear-gradient(180deg, var(--card), var(--card2))",
        borderColor: "rgba(255,255,255,0.10)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      }}
    >
      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: "0 0 0 1px rgba(245,185,66,0.55), 0 0 24px rgba(245,185,66,0.18)",
        }}
      />

      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-11 rounded-full ring-2 ring-white/10">
              <img src={t.avatar} alt={t.name} />
            </div>
          </div>
          <div>
            <p className="font-semibold leading-tight">{t.name}</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {t.role}
            </p>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          “{t.text}”
        </p>

        {/* Petite ligne dorée au hover */}
        <div
          className="mt-4 h-[1px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        />
      </div>
    </div>
  );
}

/**
 * Une rangée marquee: on duplique la liste 2x => loop parfait
 */
function MarqueeRow({ reverse = false }) {
  const list = [...testimonials, ...testimonials];

  return (
    <div className="marquee-outer">
      {/* Fades ultra doux */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 z-10"
        style={{
          background:
            "linear-gradient(90deg, var(--bg) 0%, rgba(6,8,15,0.85) 35%, rgba(6,8,15,0.0) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 z-10"
        style={{
          background:
            "linear-gradient(270deg, var(--bg) 0%, rgba(6,8,15,0.85) 35%, rgba(6,8,15,0.0) 100%)",
        }}
      />

      <div className={`marquee-track ${reverse ? "marquee-right" : "marquee-left"}`}>
        {list.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="mt-14 sm:mt-20">
      <div className="text-center">
        <Reveal>
          <p className="text-sm font-medium" style={{ color: "var(--mint)" }}>
            Témoignages
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mt-2 text-2xl sm:text-4xl font-semibold tracking-tight">
            Les commerçants aiment{" "}
            <span style={{ color: "var(--gold)" }}>la simplicité</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-3 mx-auto max-w-2xl text-base" style={{ color: "var(--muted)" }}>
            Une interface claire, des actions rapides et une vraie maîtrise du stock, des ventes et des dettes.
          </p>
        </Reveal>
      </div>

      {/* 1ère ligne */}
      <div className="mt-8">
        <MarqueeRow />
      </div>

      {/* 2ème ligne (desktop only) — espacée pour éviter toute “superposition” */}
      <div className="mt-6 hidden sm:block">
        <MarqueeRow reverse />
      </div>
    </section>
  );
}
