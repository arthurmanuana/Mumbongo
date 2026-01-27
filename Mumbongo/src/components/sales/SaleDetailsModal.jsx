import { useMemo } from "react";
import { useSaleDetails } from "../../hooks/useSaleDetails";

const money = (n) => new Intl.NumberFormat("fr-FR").format(Number(n || 0));

export default function SaleDetailsModal({ open, onClose, sale }) {
  const saleId = sale?.id;
  const { data: items = [], isLoading } = useSaleDetails(saleId, open);

  const computedTotal = useMemo(() => {
    return items.reduce((s, it) => s + Number(it.line_total ?? it.qty * it.unit_price), 0);
  }, [items]);

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box max-w-2xl border border-white/10 bg-[rgba(10,12,18,0.96)] backdrop-blur-xl text-slate-100">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">Détails de la vente</h3>
            <p className="text-sm text-slate-400 mt-1">
              ID: <span className="text-slate-200">{saleId || "-"}</span>
            </p>
          </div>

          <button className="btn btn-sm btn-ghost text-slate-200" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <div className="text-xs text-slate-400">Type</div>
            <div className="font-semibold mt-1">
              {sale?.payment_type === "CREDIT" ? "Crédit" : "Payée"}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <div className="text-xs text-slate-400">Client</div>
            <div className="font-semibold mt-1">{sale?.customer || "—"}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <div className="text-xs text-slate-400">Total</div>
            <div className="font-semibold mt-1">{money(sale?.total_amount)} CDF</div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="font-semibold">Lignes</div>
            <div className="text-xs text-slate-400">
              Total calculé: <span className="text-slate-200">{money(computedTotal)} CDF</span>
            </div>
          </div>

          <div className="p-4">
            {isLoading ? (
              <div className="text-slate-400">Chargement…</div>
            ) : items.length === 0 ? (
              <div className="text-slate-400">Aucune ligne trouvée.</div>
            ) : (
              <div className="space-y-2">
                {items.map((it) => (
                  <div
                    key={it.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3"
                  >
                    <div>
                      <div className="font-semibold">{it.product?.name || "Produit"}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        Qté: <span className="text-slate-200">{it.qty}</span> • PU:{" "}
                        <span className="text-slate-200">{money(it.unit_price)} CDF</span>
                      </div>
                    </div>

                    <div className="font-semibold">
                      {money(it.line_total ?? it.qty * it.unit_price)} CDF
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="btn btn-outline border-white/15 text-slate-100" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>

      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
}
