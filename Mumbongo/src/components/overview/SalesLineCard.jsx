import DashboardCard from "../dashboard/DashboardCard";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const money = (n) => new Intl.NumberFormat("fr-FR").format(Number(n || 0));

export default function SalesLineCard({ title, currency = "CDF", loading, data = [] }) {
  return (
    <DashboardCard
      title={title}
      subtitle="Évolution des ventes — synchronisé aux données"
      right={<span className="text-xs text-slate-300">{currency}</span>}
    >
      {loading ? (
        <div className="text-slate-400">Chargement…</div>
      ) : (
        <div className="h-[260px] w-full min-h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeOpacity={0.15} />
              <XAxis dataKey="date" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
              <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "rgba(10,12,18,0.96)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 12,
                  color: "#e2e8f0",
                }}
                formatter={(value) => [`${money(value)} ${currency}`, "Ventes"]}
              />
              <Line
                type="monotone"
                dataKey="total"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
}
