import { useNavigate } from "react-router-dom";
import DropdownSelect from "../ui/DropdownSelect";
import { useState } from "react";

export default function OverviewHeader() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("7d");

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-100">
            Vue d’ensemble
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Suivi rapide : stock, ventes, dettes — en temps réel.
          </p>
        </div>

        {/* Quick action */}
        <button
          onClick={() => navigate("/app/sales")}
          className="btn btn-sm border-0 text-black font-semibold"
          style={{
            background: "linear-gradient(90deg, var(--gold), var(--gold2))",
          }}
        >
          + Nouvelle vente
        </button>
      </div>

      {/* Search + filters row (mobile-first) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher : produit, client, vente..."
            className="input w-full bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-500"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            ⌕
          </span>
        </div>

        <DropdownSelect
          label="Période"
          value={period}
          onChange={setPeriod}
          options={[
            { value: "7d", label: "Derniers 7 jours" },
            { value: "today", label: "Aujourd’hui" },
            { value: "30d", label: "30 jours" },
            { value: "month", label: "Ce mois" },
          ]}
        />

        <button className="btn btn-outline border-white/15 text-slate-100 hover:bg-white/5">
          Export
        </button>
      </div>
    </div>
  );
}
