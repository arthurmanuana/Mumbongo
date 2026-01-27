import DashboardCard from "../dashboard/DashboardCard";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

const money = (n) => new Intl.NumberFormat("fr-FR").format(Number(n || 0));

export default function DebtsDonutCard({
  title,
  currency = "CDF",
  loading,
  data,
}) {
  const chartData = [
    { name: "Ouvertes", value: Number(data?.openAmount || 0) },
    { name: "Payées", value: Number(data?.paidAmount || 0) },
  ];

  return (
    <DashboardCard
      title={title}
      subtitle="Répartition des dettes — ouvert vs payé"
      right={<span className="text-xs text-slate-300">{currency}</span>}
    >
      {loading ? (
        <div className="text-slate-400">Chargement…</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          <div className="h-[220px] w-full min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,12,18,0.96)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    color: "#e5e7eb", // ✅ TEXTE CLAIR
                  }}
                  itemStyle={{
                    color: "#e5e7eb", // ✅ texte ligne
                  }}
                  formatter={(value, name) => [
                    `${money(value)} ${currency}`,
                    name,
                  ]}
                />

                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="60%"
                  outerRadius="85%"
                  paddingAngle={3}
                >
                  {/* pas de couleurs imposées ici ? ok, mais recharts exige des cells si on veut du contraste.
                      On garde 2 couleurs sobres compatibles dark. */}
                  <Cell fill="rgba(245,185,66,0.85)" />
                  <Cell fill="rgba(46,229,157,0.75)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="text-xs text-slate-400">Dettes ouvertes</div>
              <div className="text-lg font-semibold text-slate-100">
                {data?.openCount ?? 0}
              </div>
              <div className="text-sm text-slate-300">
                {money(data?.openAmount ?? 0)} {currency}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="text-xs text-slate-400">Dettes payées</div>
              <div className="text-lg font-semibold text-slate-100">
                {data?.paidCount ?? 0}
              </div>
              <div className="text-sm text-slate-300">
                {money(data?.paidAmount ?? 0)} {currency}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardCard>
  );
}
