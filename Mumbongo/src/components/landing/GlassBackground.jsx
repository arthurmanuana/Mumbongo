/**
 * GlassBackground (premium)
 * - Dark + glows contrôlés
 * - Plus "SaaS premium" et moins "random blobs"
 */
export default function GlassBackground({ children }) {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* Glows */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gold glow */}
        <div
          className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(245,185,66,0.28), transparent 60%)" }}
        />
        {/* Mint glow */}
        <div
          className="absolute top-40 -left-44 h-[520px] w-[520px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(46,229,157,0.18), transparent 60%)" }}
        />
        {/* Subtle blue glow */}
        <div
          className="absolute bottom-[-240px] right-[-220px] h-[620px] w-[620px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(80,140,255,0.10), transparent 60%)" }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}
