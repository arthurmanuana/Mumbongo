import Reveal from "../ui/Reveal";

export default function FinalCtaSection() {
  return (
    <section id="contact" className="mt-14 sm:mt-20">
      <Reveal>
        <div
          className="rounded-3xl border p-6 sm:p-10 backdrop-blur-xl shadow-2xl overflow-hidden relative"
          style={{
            background: "rgba(255,255,255,0.04)",
            borderColor: "rgba(255,255,255,0.10)",
          }}
        >
          {/* Glow décoratif */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "rgba(245,185,66,0.15)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full blur-3xl"
            style={{ background: "rgba(46,229,157,0.12)" }}
          />

          <div className="relative">
            <p className="text-sm font-medium" style={{ color: "var(--mint)" }}>
              Prêt à démarrer ?
            </p>

            <h3 className="mt-2 text-2xl sm:text-4xl font-semibold tracking-tight">
              Passez de “cahier” à{" "}
              <span style={{ color: "var(--gold)" }}>une gestion claire</span>.
            </h3>

            <p className="mt-3 max-w-2xl text-base" style={{ color: "var(--muted)" }}>
              Créez votre compte et commencez à suivre stock, ventes et dettes en quelques minutes.
              V1 gratuite — et vous êtes averti avant toute évolution payante.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="/register"
                className="btn border-0 text-black font-semibold"
                style={{ background: "linear-gradient(90deg, var(--gold), var(--gold2))" }}
              >
                Commencer maintenant
              </a>

              <button
                type="button"
                className="btn btn-outline"
                style={{ borderColor: "rgba(255,255,255,0.16)", color: "var(--text)" }}
                onClick={() => document.getElementById("waitlist_modal")?.showModal()}
              >
                Être notifié (Pro/Équipe)
              </button>
            </div>

            <p className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
              Support : WhatsApp / Email • Réponse rapide.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
