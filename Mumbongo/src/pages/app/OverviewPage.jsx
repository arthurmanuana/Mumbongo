import { useMemo, useState } from "react";
import DashboardCard from "../../components/dashboard/DashboardCard";
import DropdownSelect from "../../components/ui/DropdownSelect";

import { useMyShop } from "../../hooks/useMyShop";
import { useProducts } from "../../hooks/useProducts";
import { useSales } from "../../hooks/useSales";
import { useDebts } from "../../hooks/useDebts";

import SalesLineCard from "../../components/overview/SalesLineCard";
import DebtsDonutCard from "../../components/overview/DebtsDonutCard";
import StockBarsCard from "../../components/overview/StockBarsCard";

const money = (n) => new Intl.NumberFormat("fr-FR").format(Number(n || 0));

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return startOfDay(d);
}

function inRange(dateIso, from, to) {
  const t = new Date(dateIso).getTime();
  return t >= from.getTime() && t <= to.getTime();
}

export default function OverviewPage() {
  const { data: shop, isLoading: shopLoading } = useMyShop();
  const shopId = shop?.id;

  const { data: products = [], isLoading: productsLoading } = useProducts(shopId);
  const { data: sales = [], isLoading: salesLoading } = useSales(shopId);
  const { data: debts = [], isLoading: debtsLoading } = useDebts(shopId);

  const [period, setPeriod] = useState("7d"); // 7d | 30d | 90d

  const periodDays = period === "30d" ? 30 : period === "90d" ? 90 : 7;
  const from = useMemo(() => daysAgo(periodDays - 1), [periodDays]);
  const to = useMemo(() => {
    const d = new Date();
    d.setHours(23, 59, 59, 999);
    return d;
  }, []);

  // ----------- STATS (RÉELLES) -----------
  const stats = useMemo(() => {
    const activeProducts = products.filter((p) => p.is_active !== false);
    const lowStock = activeProducts.filter((p) => {
      const stock = Number(p.stock_qty ?? 0);
      const thr = Number(p.low_stock_threshold ?? 0);
      return stock > 0 && stock <= thr;
    });

    const todayFrom = startOfDay(new Date());
    const todayTo = new Date();
    todayTo.setHours(23, 59, 59, 999);

    const salesToday = sales.filter((s) => inRange(s.created_at, todayFrom, todayTo));

    const openDebts = debts.filter((d) => d.status === "OPEN");
    const paidDebts = debts.filter((d) => d.status === "PAID");

    const openDebtAmount = openDebts.reduce((sum, d) => sum + Number(d.amount_due || 0), 0);

    return {
      productsActiveCount: activeProducts.length,
      lowStockCount: lowStock.length,
      salesTodayCount: salesToday.length,
      salesTodayAmount: salesToday.reduce((sum, s) => sum + Number(s.total_amount || 0), 0),
      openDebtsCount: openDebts.length,
      paidDebtsCount: paidDebts.length,
      openDebtAmount,
    };
  }, [products, sales, debts]);

  // ----------- CHART: ventes / jour (période) -----------
  const salesSeries = useMemo(() => {
    // map dayKey -> total
    const map = new Map();

    // init tous les jours de la période (pour un graphe continu)
    for (let i = 0; i < periodDays; i++) {
      const d = new Date(from);
      d.setDate(from.getDate() + i);
      const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
      map.set(key, 0);
    }

    sales.forEach((s) => {
      if (!inRange(s.created_at, from, to)) return;
      const key = new Date(s.created_at).toISOString().slice(0, 10);
      map.set(key, (map.get(key) || 0) + Number(s.total_amount || 0));
    });

    return Array.from(map.entries()).map(([date, total]) => ({
      date,
      total,
    }));
  }, [sales, from, to, periodDays]);

  // ----------- CHART: dettes (répartition) -----------
  const debtsSplit = useMemo(() => {
    const open = debts.filter((d) => d.status === "OPEN");
    const paid = debts.filter((d) => d.status === "PAID");

    const openAmount = open.reduce((s, d) => s + Number(d.amount_due || 0), 0);
    const paidAmount = paid.reduce((s, d) => s + Number(d.amount_due || 0), 0);

    return {
      openCount: open.length,
      paidCount: paid.length,
      openAmount,
      paidAmount,
    };
  }, [debts]);

  const loading = shopLoading || productsLoading || salesLoading || debtsLoading;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-100">Vue d’ensemble</h1>
          <p className="mt-1 text-sm text-slate-300">
            Suivi rapide : stock, ventes, dettes — en temps réel.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Boutique : <span className="text-slate-200 font-medium">{shop?.name || "..."}</span>
          </p>
        </div>

        <DropdownSelect
          label="Période"
          value={period}
          onChange={setPeriod}
          options={[
            { value: "7d", label: "Derniers 7 jours" },
            { value: "30d", label: "Derniers 30 jours" },
            { value: "90d", label: "Derniers 90 jours" },
          ]}
          className="min-w-[180px]"
        />
      </div>

      {/* Résumé */}
      <DashboardCard
        title="Résumé"
        subtitle="Indicateurs clés (données réelles)"
        right={
          <span className="badge badge-outline border-white/15 text-slate-200">
            {loading ? "..." : "Live"}
          </span>
        }
      >
        {loading ? (
          <div className="text-slate-400">Chargement…</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-sm text-slate-300">Produits actifs</div>
              <div className="mt-2 text-2xl font-semibold text-slate-100">
                {stats.productsActiveCount}
              </div>
              <div className="text-xs text-slate-400 mt-1">En stock (actifs)</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-sm text-slate-300">Ventes aujourd’hui</div>
              <div className="mt-2 text-2xl font-semibold text-slate-100">
                {stats.salesTodayCount}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Total: {money(stats.salesTodayAmount)} {shop?.currency || "CDF"}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-sm text-slate-300">Dettes ouvertes</div>
              <div className="mt-2 text-2xl font-semibold text-slate-100">
                {stats.openDebtsCount}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {money(stats.openDebtAmount)} {shop?.currency || "CDF"}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-sm text-slate-300">Stock faible</div>
              <div className="mt-2 text-2xl font-semibold text-slate-100">
                {stats.lowStockCount}
              </div>
              <div className="text-xs text-slate-400 mt-1">Sous le seuil défini</div>
            </div>
          </div>
        )}
      </DashboardCard>

      {/* Graphes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SalesLineCard
          title={`Ventes (${periodDays} jours)`}
          currency={shop?.currency || "CDF"}
          loading={loading}
          data={salesSeries}
        />

        <DebtsDonutCard
          title="Dettes"
          currency={shop?.currency || "CDF"}
          loading={loading}
          data={debtsSplit}
        />
      </div>

      {/* Stock bars */}
      <StockBarsCard
        title="Stock actuel"
        loading={loading}
        products={products}
        currency={shop?.currency || "CDF"}
      />
    </div>
  );
}
