import DashboardCard from "./DashboardCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import DropdownSelect from "../ui/DropdownSelect";
import { useState } from "react";

const data = [
  { name: "Riz", stock: 20 },
  { name: "Sucre", stock: 8 },
  { name: "Lait", stock: 12 },
  { name: "Savon", stock: 6 },
  { name: "Farine", stock: 14 },
];

export default function StockBarsCard() {
  const [view, setView] = useState("top");

  return (
    <DashboardCard
      title="Stock actuel"
      subtitle="Produits principaux — utile pour repérer les ruptures"
      right={
        <DropdownSelect
          label="Top produits"
          value={view}
          onChange={setView}
          options={[
            { value: "top", label: "Top produits" },
            { value: "low", label: "Stock faible" },
          ]}
        />
      }
    >
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" stroke="rgba(148,163,184,0.8)" />
            <YAxis stroke="rgba(148,163,184,0.8)" />
            <Tooltip
              contentStyle={{
                background: "rgba(10,12,18,0.92)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                color: "#fff",
              }}
            />
            <Bar
              dataKey="stock"
              fill="rgba(46,229,157,0.55)"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
