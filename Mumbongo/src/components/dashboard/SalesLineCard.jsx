import DashboardCard from "./DashboardCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { day: "Lun", total: 18 },
  { day: "Mar", total: 24 },
  { day: "Mer", total: 16 },
  { day: "Jeu", total: 29 },
  { day: "Ven", total: 31 },
  { day: "Sam", total: 22 },
  { day: "Dim", total: 35 },
];

export default function SalesLineCard() {
  return (
    <DashboardCard
      title="Ventes (7 jours)"
      subtitle="Évolution des ventes — réactif aux filtres (à brancher)"
      right={<span className="text-xs text-slate-400">CDF</span>}
    >
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="day" stroke="rgba(148,163,184,0.8)" />
            <YAxis stroke="rgba(148,163,184,0.8)" />
            <Tooltip
              contentStyle={{
                background: "rgba(10,12,18,0.92)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                color: "#fff",
              }}
            />
            <Line type="monotone" dataKey="total" stroke="rgba(245,185,66,0.95)" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
