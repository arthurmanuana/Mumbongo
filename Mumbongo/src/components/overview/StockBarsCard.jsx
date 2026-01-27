import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import DashboardCard from "../dashboard/DashboardCard";
import DropdownSelect from "../ui/DropdownSelect";

export default function StockBarsCard({ products = [] }) {
  const [mode, setMode] = useState("top"); // "top" | "low"

  const data = useMemo(() => {
    const arr = (products || [])
      .filter((p) => p?.is_active !== false)
      .map((p) => ({
        label: (p.name || "").slice(0, 12), // court pour mobile
        fullName: p.name || "",
        total: Number(p.stock_qty || 0),
      }));

    if (mode === "low") {
      // stock faible d'abord
      return arr
        .sort((a, b) => a.total - b.total)
        .slice(0, 8);
    }

    // top stock
    return arr
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);
  }, [products, mode]);

  const hasData = data.length > 0;

  return (
    <DashboardCard
      title="Stock actuel"
      subtitle="Produits principaux — repérer les ruptures"
      right={
        <DropdownSelect
          label="Filtre"
          value={mode}
          onChange={setMode}
          options={[
            { value: "top", label: "Top produits" },
            { value: "low", label: "Stock faible" },
          ]}
          className="w-[170px]"
        />
      }
    >
      {!hasData ? (
        <div className="text-sm text-slate-400">
          Aucun produit à afficher (ajoute des produits ou active-en).
        </div>
      ) : (
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />

              <XAxis
                dataKey="label"
                stroke="#CBD5E1"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#CBD5E1"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={40}
              />

              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                contentStyle={{
                  background: "rgba(15,18,25,0.95)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 12,
                  color: "#E5E7EB",
                  fontSize: 13,
                }}
                labelStyle={{
                  color: "#F5B942",
                  fontWeight: 600,
                  marginBottom: 4,
                }}
                formatter={(value, name, props) => {
                  const v = Number(value || 0);
                  return [`${v} unité(s)`, "Stock"];
                }}
              />

              <Bar dataKey="total" radius={[6, 6, 0, 0]} fill="rgba(245,185,66,0.85)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
}
