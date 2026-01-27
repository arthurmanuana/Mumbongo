import DashboardCard from "./DashboardCard";

function Kpi({ label, value, hint, accent = "gold" }) {
  const accentStyle =
    accent === "mint"
      ? { background: "linear-gradient(90deg, rgba(46,229,157,0.22), rgba(46,229,157,0.08))" }
      : { background: "linear-gradient(90deg, rgba(245,185,66,0.24), rgba(245,185,66,0.08))" };

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-4 overflow-hidden">
      <div className="absolute inset-0 opacity-70" style={accentStyle} />
      <div className="relative">
        <div className="text-xs text-slate-300">{label}</div>
        <div className="mt-2 text-2xl font-semibold text-slate-100">{value}</div>
        <div className="mt-1 text-xs text-slate-400">{hint}</div>
      </div>
    </div>
  );
}

export default function KpiGrid() {
  return (
    <DashboardCard
      title="Résumé"
      subtitle="Indicateurs clés (exemple visuel — on branchera les données ensuite)"
      right={<span className="badge badge-outline border-white/15 text-slate-200">Live</span>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Kpi label="Produits en stock" value="128" hint="Total produits actifs" accent="mint" />
        <Kpi label="Ventes aujourd’hui" value="12" hint="+ 4 vs hier" accent="gold" />
        <Kpi label="Dettes ouvertes" value="7" hint="À relancer cette semaine" accent="gold" />
        <Kpi label="Stock faible" value="9" hint="Sous le seuil défini" accent="mint" />
      </div>
    </DashboardCard>
  );
}
