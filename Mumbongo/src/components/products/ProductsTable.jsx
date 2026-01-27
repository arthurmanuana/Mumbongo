import ProductStatusPill from "./ProductStatusPill";

function fmtCDF(v) {
  try {
    return new Intl.NumberFormat("fr-FR").format(v) + " CDF";
  } catch {
    return `${v} CDF`;
  }
}

export default function ProductsTable({ items, onEdit }) {
  return (
    <div className="hidden md:block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <table className="table w-full">
        <thead>
          <tr className="text-slate-300">
            <th>Produit</th>
            <th>Prix</th>
            <th>Stock</th>
            <th>Seuil</th>
            <th>Statut</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => {
            const low = p.stock_qty <= p.low_stock_threshold;
            return (
              <tr key={p.id} className="hover:bg-white/[0.04]">
                <td className="text-slate-100 font-medium">{p.name}</td>
                <td className="text-slate-200">{fmtCDF(p.price)}</td>
                <td className={low ? "text-amber-300 font-semibold" : "text-slate-200"}>
                  {p.stock_qty}
                </td>
                <td className="text-slate-300">{p.low_stock_threshold}</td>
                <td>
                  <ProductStatusPill active={p.is_active} />
                </td>
                <td className="text-right">
                  <button
                    className="btn btn-sm btn-ghost text-slate-100"
                    onClick={() => onEdit(p)}
                  >
                    Éditer
                  </button>
                </td>
              </tr>
            );
          })}
          {items.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-slate-400 py-8">
                Aucun produit trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
