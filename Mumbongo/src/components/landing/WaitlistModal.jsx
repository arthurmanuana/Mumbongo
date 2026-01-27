export default function WaitlistModal() {
  return (
    <dialog id="waitlist_modal" className="modal">
      <div
        className="modal-box rounded-3xl border backdrop-blur-xl"
        style={{
          background: "rgba(6,8,15,0.92)",
          borderColor: "rgba(255,255,255,0.12)",
        }}
      >
        <h3 className="font-semibold text-xl">Rejoindre la liste d’attente</h3>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Laisse ton contact. On te prévient dès que les packs Pro/Équipe sont prêts.
        </p>

        <div className="mt-5 space-y-3">
          <input
            type="text"
            placeholder="Nom / Boutique"
            className="input w-full border"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)" }}
          />
          <input
            type="text"
            placeholder="Téléphone (WhatsApp) ou Email"
            className="input w-full border"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)" }}
          />
          <textarea
            placeholder="Optionnel : ton besoin (multi-vendeurs, rapports, export...)"
            className="textarea w-full border"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)" }}
          />
        </div>

        <div className="modal-action">
          <form method="dialog" className="flex gap-2 w-full">
            <button className="btn btn-outline flex-1" style={{ borderColor: "rgba(255,255,255,0.18)", color: "var(--text)" }}>
              Annuler
            </button>
            <button
              className="btn flex-1 border-0 text-black font-semibold"
              style={{ background: "linear-gradient(90deg, var(--gold), var(--gold2))" }}
            >
              Envoyer
            </button>
          </form>
        </div>

        <p className="mt-3 text-xs" style={{ color: "var(--muted)" }}>
          On ne spam pas. 1 message quand c’est prêt.
        </p>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
