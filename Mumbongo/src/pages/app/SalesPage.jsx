import { useMemo, useState } from "react";
import DashboardCard from "../../components/dashboard/DashboardCard";
import SalesToolbar from "../../components/sales/SalesToolbar";
import SalesCardsMobile from "../../components/sales/SalesCardsMobile";
import SalesTable from "../../components/sales/SalesTable";
import NewSaleModal from "../../components/sales/NewSaleModal";
import SaleDetailsModal from "../../components/sales/SaleDetailsModal";

import { useSalesUIStore } from "../../stores/salesUIStore";
import { toast } from "react-toastify";

import { useMyShop } from "../../hooks/useMyShop";
import { useProducts } from "../../hooks/useProducts"; // ton hook existant (avec shopId)
import { useCustomers } from "../../hooks/useCustomers"; // ton hook (avec shopId)
import { useSales } from "../../hooks/useSales"; // hook (avec shopId)
import { useCreateSale } from "../../hooks/useCreateSale"; // hook (avec shopId)

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString("fr-FR");
  } catch {
    return iso;
  }
};

export default function SalesPage() {
  // 1) Shop
  const { data: shop, isLoading: shopLoading } = useMyShop();
  const shopId = shop?.id;

  // 2) UI modal new sale
  const { open } = useSalesUIStore();

  // 3) Data (Supabase)
  const { data: products = [], isLoading: productsLoading } =
    useProducts(shopId);
  const { data: customers = [], isLoading: customersLoading } =
    useCustomers(shopId);
  const { data: sales = [], isLoading: salesLoading } = useSales(shopId);

  // 4) Create sale mutation
  const createSale = useCreateSale(shopId);

  // 5) Filters
  const [query, setQuery] = useState("");
  const [payType, setPayType] = useState("all");
  const [period, setPeriod] = useState("7d"); // UI-only pour l’instant

  // 6) Details modal
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const openDetails = (sale) => {
    setSelectedSale(sale);
    setDetailsOpen(true);
  };

  // Map customer_id => name
  const customerMap = useMemo(() => {
    const m = new Map();
    customers.forEach((c) => m.set(c.id, c.name));
    return m;
  }, [customers]);

  // Normalize sales for UI
  const normalizedSales = useMemo(() => {
    return (sales || []).map((s) => ({
      id: s.id,
      date: fmtDate(s.created_at),
      payment_type: s.payment_type,
      total_amount: Number(s.total_amount || 0),
      customer: s.customer_id ? customerMap.get(s.customer_id) : null,
      notes: s.notes || null,
    }));
  }, [sales, customerMap]);

  const filtered = useMemo(() => {
    let arr = [...normalizedSales];

    if (payType !== "all") arr = arr.filter((x) => x.payment_type === payType);

    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (x) =>
          (x.customer || "").toLowerCase().includes(q) ||
          String(x.total_amount).includes(q),
      );
    }

    // period (7d/today/30d) -> on branchera après
    return arr;
  }, [normalizedSales, query, payType, period]);

  const submitting = createSale.isPending;

  const disableNewSale =
    shopLoading || productsLoading || customersLoading || !shopId;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-100">
            Ventes
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Enregistrement + historique — réactif aux nouvelles ventes.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Boutique :{" "}
            <span className="text-slate-200 font-medium">
              {shop?.name || "..."}
            </span>
          </p>
        </div>

        <button
          className="btn btn-sm border-0 text-black font-semibold"
          style={{
            background: "linear-gradient(90deg, var(--gold), var(--gold2))",
          }}
          onClick={open}
          disabled={disableNewSale}
          title={disableNewSale ? "Chargement..." : "Nouvelle vente"}
        >
          + Nouvelle vente
        </button>
      </div>

      <DashboardCard
        title="Historique"
        subtitle="Recherche + filtres (données Supabase)"
        right={
          <span className="badge badge-outline border-white/15 text-slate-200">
            {filtered.length} vente(s)
          </span>
        }
      >
        <SalesToolbar
          query={query}
          setQuery={setQuery}
          payType={payType}
          setPayType={setPayType}
          period={period}
          setPeriod={setPeriod}
        />

        <div className="mt-5">
          {salesLoading ? (
            <div className="text-slate-400">Chargement des ventes…</div>
          ) : (
            <>
              <SalesCardsMobile items={filtered} onOpen={openDetails} />
              <SalesTable items={filtered} onOpen={openDetails} />
            </>
          )}
        </div>
      </DashboardCard>

      {/* Modal new sale */}
      <NewSaleModal
        products={products}
        customers={customers}
        onSubmit={async (payload) => {
          try {
            await createSale.mutateAsync(payload);
            toast.success("Vente enregistrée ✅");
            return true;
          } catch (e) {
            console.error(e);
            toast.error(e?.message || "Erreur lors de l’enregistrement");
            throw e; // ✅ IMPORTANT
          }
        }}
      />

      {/* Modal details */}
      <SaleDetailsModal
        open={detailsOpen}
        sale={selectedSale}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedSale(null);
        }}
      />

      {submitting ? (
        <div className="toast toast-top toast-center">
          <div className="alert bg-white/5 border border-white/10 text-slate-100">
            <span>Enregistrement en cours…</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
