import DashboardCard from "./DashboardCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Ouvertes", value: 7 },
  { name: "Payées", value: 12 },
];

const COLORS = ["rgba(245,185,66,0.95)", "rgba(46,229,157,0.85)"];

export default function DebtsDonutCard() {
  return (
    <DashboardCard
      title="Dettes"
      subtitle="Répartition ouverte / payée"
      right={<span className="badge badge-outline border-white/15 text-slate-200">Semaine</span>}
    >
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={2}>
              {data.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "rgba(10,12,18,0.92)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="text-xs text-slate-400">Ouvertes</div>
          <div className="text-lg font-semibold text-slate-100">7</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="text-xs text-slate-400">Payées</div>
          <div className="text-lg font-semibold text-slate-100">12</div>
        </div>
      </div>
    </DashboardCard>
  );
}
