import DropdownSelect from "../ui/DropdownSelect";

export default function SalesToolbar({
  query,
  setQuery,
  payType,
  setPayType,
  period,
  setPeriod,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-3">
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher : client, note, montant..."
          className="input w-full bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-500"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          ⌕
        </span>
      </div>

      <DropdownSelect
        label="Type"
        value={payType}
        onChange={setPayType}
        options={[
          { value: "all", label: "Tous" },
          { value: "PAID", label: "Payées" },
          { value: "CREDIT", label: "Crédit" },
        ]}
      />

      <DropdownSelect
        label="Période"
        value={period}
        onChange={setPeriod}
        options={[
          { value: "7d", label: "7 jours" },
          { value: "today", label: "Aujourd’hui" },
          { value: "30d", label: "30 jours" },
        ]}
      />
    </div>
  );
}
