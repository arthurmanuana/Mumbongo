import Reveal from "../ui/Reveal";

export default function FaqSection() {
  const faqs = [
    {
      q: "Est-ce que MobiStock est gratuit ?",
      a: "Oui, la version V1 est gratuite pour démarrer. Certaines options avancées pourront devenir payantes plus tard, mais vous serez toujours prévenu à l’avance.",
    },
    {
      q: "Ça marche sur téléphone ?",
      a: "Oui, le site est conçu mobile-first. Tu peux gérer ton stock et tes ventes depuis un navigateur sur Android/iPhone ou PC.",
    },
    {
      q: "Et si la connexion est faible ?",
      a: "L’interface est pensée pour être légère. On optimise l’expérience pour rester fluide même avec une connexion moyenne.",
    },
    {
      q: "Mes données sont-elles protégées ?",
      a: "Oui. Chaque boutique a ses propres données, et l’accès est sécurisé par authentification.",
    },
    {
      q: "Puis-je ajouter plusieurs vendeurs ?",
      a: "C’est prévu dans la version Équipe (à venir). Pour la V1, on démarre simple et efficace.",
    },
  ];

  return (
    <section id="faq" className="mt-14 sm:mt-20">
      <div className="text-center">
        <Reveal>
          <p className="text-sm font-medium" style={{ color: "var(--mint)" }}>
            FAQ
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-2 text-2xl sm:text-4xl font-semibold tracking-tight">
            Questions fréquentes
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-3 mx-auto max-w-2xl text-base" style={{ color: "var(--muted)" }}>
            Des réponses simples, sans blabla.
          </p>
        </Reveal>
      </div>

      <div className="mt-8 space-y-3">
        {faqs.map((f, idx) => (
          <Reveal key={f.q} delay={0.04 * idx}>
            <div
              className="collapse collapse-arrow rounded-2xl border backdrop-blur-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.10)",
              }}
            >
              <input type="checkbox" />
              <div className="collapse-title text-base font-semibold">{f.q}</div>
              <div className="collapse-content">
                <p style={{ color: "var(--muted)" }}>{f.a}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
