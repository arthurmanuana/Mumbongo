import SaleStatusPill from "./SaleStatusPill";

export default function SalesCardsMobile({ items, onOpen }) {
  return (
    <div className="md:hidden space-y-3">
      {items.map((s) => (
        <div
          key={s.id}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.05] transition"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-slate-100 font-semibold">{s.customer || "Client"}</div>
              <div className="text-xs text-slate-400 mt-1">{s.date}</div>
            </div>
            <SaleStatusPill type={s.payment_type} />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-slate-300">Total</div>
            <div className="text-slate-100 font-semibold">{s.total_amount} CDF</div>
          </div>

          <button
            className="btn btn-sm w-full btn-outline border-white/15 text-slate-100 mt-3"
            onClick={() => onOpen(s)}
          >
            Détails
          </button>
        </div>
      ))}

      {items.length === 0 && (
        <div className="text-center text-slate-400 py-10">Aucune vente trouvée.</div>
      )}
    </div>
  );
}
