import Reveal from "../ui/Reveal";

/**
 * FeaturesSection (SEO + Marketing)
 * - Value props claires pour vendre
 * - Mobile-first
 * - Cartes glass + reveal
 */
export default function FeaturesSection() {
  const features = [
    {
      title: "Stock en temps réel",
      desc: "Saisis les produits, vois les quantités, et évite les ruptures sans calculs compliqués.",
      icon: "📦",
    },
    {
      title: "Ventes en 10 secondes",
      desc: "Enregistre une vente rapidement, même sur téléphone, et garde un historique propre.",
      icon: "⚡",
    },
    {
      title: "Dettes clients maîtrisées",
      desc: "Suis qui doit quoi, relance facilement, et récupère ton argent sans confusion.",
      icon: "🤝",
    },
    {
      title: "Dashboard clair",
      desc: "Un résumé simple : ventes, dettes, stock faible — pour décider vite et bien.",
      icon: "📊",
    },
    {
      title: "Pensé pour la RDC",
      desc: "Simple, léger, adapté aux réalités terrain. Fonctionne bien même avec connexion faible.",
      icon: "🇨🇩",
    },
    {
      title: "SaaS sécurisé",
      desc: "Chaque boutique a ses données protégées. Tu gardes le contrôle, sans stress.",
      icon: "🔒",
    },
  ];

  return (
    <section id="features" className="mt-14 sm:mt-20">
      <div className="text-center">
        <Reveal>
          <p className="text-sm font-medium" style={{ color: "var(--mint)" }}>
            Fonctionnalités
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mt-2 text-2xl sm:text-4xl font-semibold tracking-tight">
            Tout ce qu’il faut pour{" "}
            <span style={{ color: "var(--gold)" }}>gérer une boutique</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-3 mx-auto max-w-2xl text-base" style={{ color: "var(--muted)" }}>
            Mumbongo est conçu pour être rapide, simple et agréable — sans surcharge, sans jargon,
            juste l’essentiel pour vendre et contrôler.
          </p>
        </Reveal>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {features.map((f, idx) => (
          <Reveal key={f.title} delay={0.06 * (idx % 3)}>
            <div
              className="rounded-3xl border backdrop-blur-xl shadow-lg p-5 hover:translate-y-[-2px] transition-transform"
              style={{
                background: "linear-gradient(180deg, var(--card), var(--card2))",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-11 w-11 rounded-2xl grid place-items-center border"
                  style={{
                    borderColor: "rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  <span className="text-xl">{f.icon}</span>
                </div>
                <h3 className="font-semibold text-lg">{f.title}</h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {f.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
