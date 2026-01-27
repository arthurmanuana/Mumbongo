import SaleStatusPill from "./SaleStatusPill";

export default function SalesTable({ items, onOpen }) {
  return (
    <div className="hidden md:block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <table className="table w-full">
        <thead>
          <tr className="text-slate-300">
            <th>Date</th>
            <th>Client</th>
            <th>Type</th>
            <th>Total</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s) => (
            <tr key={s.id} className="hover:bg-white/[0.04]">
              <td className="text-slate-300">{s.date}</td>
              <td className="text-slate-100 font-medium">{s.customer || "—"}</td>
              <td><SaleStatusPill type={s.payment_type} /></td>
              <td className="text-slate-200">{s.total_amount} CDF</td>
              <td className="text-right">
                <button className="btn btn-sm btn-ghost text-slate-100" onClick={() => onOpen(s)}>
                  Détails
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-slate-400 py-8">
                Aucune vente trouvée.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
