import ProductStatusPill from "./ProductStatusPill";

function fmtCDF(v) {
  try {
    return new Intl.NumberFormat("fr-FR").format(v) + " CDF";
  } catch {
    return `${v} CDF`;
  }
}

export default function ProductsCardsMobile({ items, onEdit }) {
  return (
    <div className="md:hidden space-y-3">
      {items.map((p) => {
        const low = p.stock_qty <= p.low_stock_threshold;
        return (
          <div
            key={p.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.05] transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-slate-100 font-semibold">{p.name}</div>
                <div className="text-xs text-slate-400 mt-1">{fmtCDF(p.price)}</div>
              </div>
              <ProductStatusPill active={p.is_active} />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="text-[11px] text-slate-400">Stock</div>
                <div className={low ? "text-amber-300 font-semibold" : "text-slate-100 font-semibold"}>
                  {p.stock_qty}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="text-[11px] text-slate-400">Seuil</div>
                <div className="text-slate-100 font-semibold">{p.low_stock_threshold}</div>
              </div>
            </div>

            <div className="mt-3">
              <button className="btn btn-sm w-full btn-outline border-white/15 text-slate-100"
                onClick={() => onEdit(p)}
              >
                Éditer
              </button>
            </div>
          </div>
        );
      })}

      {items.length === 0 && (
        <div className="text-center text-slate-400 py-10">
          Aucun produit trouvé.
        </div>
      )}
    </div>
  );
}
