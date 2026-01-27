import { Link } from "react-router-dom";
import GlassBackground from "../../components/landing/GlassBackground";

/**
 * AuthLayout
 * - Réutilisable pour Login/Register
 * - Même vibe visuelle que la landing
 */
export default function AuthLayout({ title, subtitle, children }) {
  return (
    <GlassBackground>
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Top mini-nav */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="h-9 w-9 rounded-xl border"
              style={{
                background:
                  "linear-gradient(135deg, rgba(245,185,66,0.25), rgba(46,229,157,0.18))",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            />
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">MobiStock</div>
              <div className="text-xs" style={{ color: "var(--muted)" }}>
                Stock • Ventes • Dettes
              </div>
            </div>
          </Link>

          <Link to="/" className="btn btn-ghost btn-sm">
            Retour
          </Link>
        </div>

        {/* Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left: marketing / reassurance */}
          <div
            className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl"
            style={{
              background: "linear-gradient(180deg, var(--card), var(--card2))",
              borderColor: "rgba(255,255,255,0.10)",
            }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--mint)" }}>
              Accès sécurisé
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              {title}
            </h1>
            <p className="mt-3 text-base" style={{ color: "var(--muted)" }}>
              {subtitle}
            </p>

            <div className="mt-6 space-y-3 text-sm" style={{ color: "var(--muted)" }}>
              <div className="flex gap-2">
                <span>✅</span>
                <p>Mobile-first : pensé pour la RDC, rapide sur téléphone.</p>
              </div>
              <div className="flex gap-2">
                <span>✅</span>
                <p>Données protégées : chaque boutique garde ses infos.</p>
              </div>
              <div className="flex gap-2">
                <span>✅</span>
                <p>V1 gratuite : tu es averti avant toute évolution payante.</p>
              </div>
            </div>

            <div
              className="mt-7 rounded-2xl border p-4 text-sm"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.10)",
                color: "var(--muted)",
              }}
            >
              Astuce : utilise un mot de passe fort pour protéger ta boutique.
            </div>
          </div>

          {/* Right: form */}
          <div
            className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl shadow-xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(255,255,255,0.10)",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </GlassBackground>
  );
}
