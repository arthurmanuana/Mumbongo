import { useState } from "react";
import Reveal from "../ui/Reveal";
import BillingToggle from "./BillingToggle";
import WaitlistModal from "./WaitlistModal";

function PricingCard({ variant = "normal", title, desc, price, perks, cta, onCta }) {
  const isFeatured = variant === "featured";

  return (
    <div
      className={[
        "relative rounded-3xl border p-6 sm:p-7 backdrop-blur-xl shadow-lg transition-transform",
        "hover:-translate-y-1",
      ].join(" ")}
      style={{
        background: "rgba(255,255,255,0.04)",
        borderColor: isFeatured ? "rgba(245,185,66,0.45)" : "rgba(255,255,255,0.10)",
        boxShadow: isFeatured
          ? "0 0 0 1px rgba(245,185,66,0.35), 0 20px 60px rgba(0,0,0,0.35)"
          : "0 20px 60px rgba(0,0,0,0.30)",
      }}
    >
      {/* Glow subtil featured */}
      {isFeatured && (
        <div
          className="pointer-events-none absolute -inset-1 rounded-[28px] opacity-60"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(245,185,66,0.22), transparent 55%), radial-gradient(circle at 70% 70%, rgba(46,229,157,0.12), transparent 55%)",
            filter: "blur(10px)",
          }}
        />
      )}

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              {desc}
            </p>
          </div>

          {isFeatured && (
            <span
              className="text-xs px-3 py-1 rounded-full border"
              style={{
                borderColor: "rgba(245,185,66,0.45)",
                color: "var(--gold)",
                background: "rgba(245,185,66,0.08)",
              }}
            >
              Populaire
            </span>
          )}
        </div>

        <div className="mt-6">
          <div className="text-4xl font-semibold">
            {price}
            {price !== "—" && <span className="text-base font-medium" style={{ color: "var(--muted)" }}>/mo</span>}
          </div>
          <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
            {price === "—" ? "Disponible bientôt (V2)" : "Sans engagement • Annulation facile"}
          </p>
        </div>

        <ul className="mt-6 space-y-2 text-sm" style={{ color: "var(--muted)" }}>
          {perks.map((p) => (
            <li key={p}>✅ {p}</li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onCta}
          className={[
            "btn mt-7 w-full border-0 font-semibold",
            isFeatured ? "" : "",
          ].join(" ")}
          style={{
            background: isFeatured
              ? "linear-gradient(90deg, var(--gold), var(--gold2))"
              : "rgba(255,255,255,0.06)",
            color: isFeatured ? "#000" : "var(--text)",
            border: isFeatured ? "none" : "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {cta}
        </button>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const [billing, setBilling] = useState("monthly");

  // On garde des prix placeholder (car pas encore vendu), mais la structure est prête
  const pricePro = billing === "monthly" ? "—" : "—";

  return (
    <section id="pricing" className="mt-14 sm:mt-20">
      <div className="text-center">
        <Reveal>
          <p className="text-sm font-medium" style={{ color: "var(--mint)" }}>
            Tarifs
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mt-2 text-2xl sm:text-4xl font-semibold tracking-tight">
            Une tarification simple,{" "}
            <span style={{ color: "var(--gold)" }}>sans surprise</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-3 mx-auto max-w-2xl text-base" style={{ color: "var(--muted)" }}>
            La V1 est gratuite. Les packs Pro/Équipe arrivent ensuite. Tu choisis mensuel ou annuel, et tu restes informé.
          </p>
        </Reveal>

        <BillingToggle value={billing} onChange={setBilling} />
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        <Reveal>
          <PricingCard
            title="Gratuit (V1)"
            desc="Parfait pour démarrer et mettre de l’ordre dans ton stock."
            price="0$"
            perks={[
              "Produits + quantités",
              "Ventes + historique",
              "Dettes clients",
              "Dashboard simple",
            ]}
            cta="Commencer gratuitement"
            onCta={() => (window.location.href = "/register")}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <PricingCard
            variant="featured"
            title="Pro (bientôt)"
            desc="Rapports, export, gains de temps… pour les boutiques ambitieuses."
            price={pricePro}
            perks={[
              "Rapports avancés",
              "Export PDF/Excel",
              "Sauvegarde & historique",
              "Support prioritaire",
            ]}
            cta="Rejoindre la liste d’attente"
            onCta={() => document.getElementById("waitlist_modal")?.showModal()}
          />
        </Reveal>

        <Reveal delay={0.12}>
          <PricingCard
            title="Équipe (bientôt)"
            desc="Pour plusieurs vendeurs : rôles, permissions et contrôle."
            price="—"
            perks={[
              "Multi-utilisateurs",
              "Rôles & permissions",
              "Historique par vendeur",
              "Sécurité renforcée",
            ]}
            cta="Être notifié"
            onCta={() => document.getElementById("waitlist_modal")?.showModal()}
          />
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <div
          className="mt-6 rounded-2xl border p-4 text-sm backdrop-blur-xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.10)",
            color: "var(--muted)",
          }}
        >
          🔔 <span style={{ color: "var(--text)" }}>Transparence :</span> si une fonctionnalité devient payante,
          tu seras averti dans l’app avec un délai avant activation.
        </div>
      </Reveal>

      {/* Modal */}
      <WaitlistModal />
    </section>
  );
}
