import DropdownSelect from "../ui/DropdownSelect";


export default function ProductsToolbar({
  query,
  setQuery,
  status,
  setStatus,
  lowOnly,
  setLowOnly,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-3">
      {/* search */}
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Rechercher un produit..."
          className="input w-full bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-500"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          ⌕
        </span>
      </div>

      {/* status */}
     <DropdownSelect
  label="Statut"
  value={status}
  onChange={setStatus}
  options={[
    { value: "all", label: "Tous" },
    { value: "active", label: "Actifs" },
    { value: "inactive", label: "Inactifs" },
  ]}
/>


      {/* low stock */}
      <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <input
          type="checkbox"
          className="checkbox checkbox-sm"
          checked={lowOnly}
          onChange={(e) => setLowOnly(e.target.checked)}
        />
        <span className="text-sm text-slate-200">Stock faible</span>
      </label>
    </div>
  );
}
