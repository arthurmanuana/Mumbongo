import DashboardCard from "./DashboardCard";

const rows = [
  { id: "#A102", client: "Sarah M.", total: "35,000 CDF", status: "PAYÉE" },
  { id: "#A103", client: "Patrick K.", total: "12,500 CDF", status: "CRÉDIT" },
  { id: "#A104", client: "Nadine L.", total: "18,000 CDF", status: "PAYÉE" },
];

function StatusPill({ status }) {
  const isCredit = status === "CRÉDIT";
  return (
    <span
      className="px-2 py-1 rounded-full text-xs border"
      style={{
        borderColor: isCredit ? "rgba(245,185,66,0.35)" : "rgba(46,229,157,0.35)",
        background: isCredit ? "rgba(245,185,66,0.08)" : "rgba(46,229,157,0.08)",
        color: isCredit ? "rgba(245,185,66,0.95)" : "rgba(46,229,157,0.95)",
      }}
    >
      {status}
    </span>
  );
}

export default function RecentSalesCard() {
  return (
    <DashboardCard
      title="Dernières ventes"
      subtitle="Vue rapide — filtre & recherche après"
      right={<button className="btn btn-sm btn-ghost text-slate-200">Voir tout</button>}
    >
      <div className="space-y-3">
        {rows.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.05] transition"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-100">
                  {r.id} • {r.client}
                </div>
                <div className="text-xs text-slate-400 mt-1">{r.total}</div>
              </div>
              <StatusPill status={r.status} />
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
