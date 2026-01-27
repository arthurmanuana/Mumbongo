import { useMemo, useState } from "react";
import DashboardCard from "../../components/dashboard/DashboardCard";
import ProductsToolbar from "../../components/products/ProductsToolbar";
import ProductsTable from "../../components/products/ProductsTable";
import ProductsCardsMobile from "../../components/products/ProductsCardsMobile";
import ProductModal from "../../components/products/ProductModal";
import { useProductsUIStore } from "../../stores/productsUIStore";
import { toast } from "react-toastify";

import { useMyShop } from "../../hooks/useMyShop";
import { useAddProduct, useProducts, useUpdateProduct } from "../../hooks/useProducts";

export default function ProductsPage() {
  const { openAdd, openEdit } = useProductsUIStore();

  // Shop (lié à l'user connecté)
  const { data: shop, isLoading: shopLoading } = useMyShop();

  // Products
  const { data: items = [], isLoading } = useProducts(shop?.id);

  // Mutations
  const addMut = useAddProduct(shop?.id);
  const updMut = useUpdateProduct(shop?.id);

  // Toolbar state
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [lowOnly, setLowOnly] = useState(false);

  const filtered = useMemo(() => {
    let arr = [...items];

    if (status === "active") arr = arr.filter((p) => p.is_active);
    if (status === "inactive") arr = arr.filter((p) => !p.is_active);

    if (lowOnly) arr = arr.filter((p) => p.stock_qty <= p.low_stock_threshold);

    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter((p) => p.name.toLowerCase().includes(q));
    }

    return arr;
  }, [items, query, status, lowOnly]);

  const saveProduct = async (payload) => {
    try {
      if (!shop?.id) {
        toast.error("Boutique introuvable (shop_id).");
        return;
      }

      // ADD
      if (!payload.id) {
        await addMut.mutateAsync(payload);
        toast.success("Produit ajouté.");
        return;
      }

      // UPDATE
      await updMut.mutateAsync({ id: payload.id, payload });
      toast.success("Produit mis à jour.");
    } catch (e) {
      toast.error(e?.message || "Erreur lors de l’enregistrement.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-100">Produits</h1>
          <p className="mt-1 text-sm text-slate-300">
            Ajoute, modifie et filtre ton stock — connecté à Supabase.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Boutique : <span className="text-slate-200 font-medium">{shop?.name || "..."}</span>
          </p>
        </div>

        <button
          className="btn btn-sm border-0 text-black font-semibold"
          style={{ background: "linear-gradient(90deg, var(--gold), var(--gold2))" }}
          onClick={openAdd}
          disabled={shopLoading || !shop?.id}
        >
          + Ajouter
        </button>
      </div>

      <DashboardCard
        title="Gestion du stock"
        subtitle="Recherche + filtres + édition via modal (RLS actif)"
        right={
          (isLoading || shopLoading) ? (
            <span className="badge badge-outline border-white/15 text-slate-200">Chargement…</span>
          ) : (
            <span className="badge badge-outline border-white/15 text-slate-200">
              {filtered.length} produit(s)
            </span>
          )
        }
      >
        <ProductsToolbar
          query={query}
          setQuery={setQuery}
          status={status}
          setStatus={setStatus}
          lowOnly={lowOnly}
          setLowOnly={setLowOnly}
        />

        <div className="mt-5">
          {(isLoading || shopLoading) ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-slate-300">
              Chargement des produits…
            </div>
          ) : (
            <>
              <ProductsCardsMobile items={filtered} onEdit={openEdit} />
              <ProductsTable items={filtered} onEdit={openEdit} />
            </>
          )}
        </div>
      </DashboardCard>

      {/* Modal Add/Edit */}
      <ProductModal onSave={saveProduct} />
    </div>
  );
}
