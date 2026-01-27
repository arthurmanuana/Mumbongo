import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useProductsUIStore } from "../../stores/productsUIStore";

export default function ProductModal({ onSave }) {
  const { modalOpen, editingProduct, close } = useProductsUIStore();

  const initial = useMemo(
    () => ({
      name: editingProduct?.name || "",
      price: editingProduct?.price ?? 0,
      stock_qty: editingProduct?.stock_qty ?? 0,
      low_stock_threshold: editingProduct?.low_stock_threshold ?? 5,
      is_active: editingProduct?.is_active ?? true,
    }),
    [editingProduct]
  );

  const [form, setForm] = useState(initial);

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  if (!modalOpen) return null;

  const submit = () => {
    if (!form.name.trim()) return toast.error("Le nom du produit est obligatoire.");
    if (Number(form.price) < 0) return toast.error("Le prix doit être >= 0.");
    if (Number(form.stock_qty) < 0) return toast.error("Le stock doit être >= 0.");
    if (Number(form.low_stock_threshold) < 0) return toast.error("Le seuil doit être >= 0.");

    onSave({
      ...editingProduct,
      name: form.name.trim(),
      price: Number(form.price),
      stock_qty: Number(form.stock_qty),
      low_stock_threshold: Number(form.low_stock_threshold),
      is_active: !!form.is_active,
    });

    close();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70" onClick={close} />

      <div className="relative w-full max-w-lg">
        {/* Glow */}
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-3xl opacity-80 blur-2xl"
          style={{
            background:
              "radial-gradient(700px circle at 15% 15%, rgba(245,185,66,0.16), transparent 45%), radial-gradient(700px circle at 90% 10%, rgba(46,229,157,0.12), transparent 40%)",
          }}
        />

        <div className="relative rounded-3xl border border-white/10 bg-[rgba(10,12,18,0.96)] backdrop-blur-xl shadow-[0_20px_90px_rgba(0,0,0,0.6)]">
          <div className="p-5 border-b border-white/10 flex items-start justify-between gap-3">
            <div>
              <div className="text-slate-100 font-semibold">
                {editingProduct ? "Modifier produit" : "Ajouter produit"}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Renseigne les informations de stock.
              </div>
            </div>
            <button className="btn btn-ghost btn-sm text-slate-200" onClick={close}>
              ✕
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="text-xs text-slate-400">Nom</label>
              <input
                className="input w-full bg-white/5 border border-white/10 text-slate-100"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400">Prix (CDF)</label>
                <input
                  type="number"
                  className="input w-full bg-white/5 border border-white/10 text-slate-100"
                  value={form.price}
                  onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Stock</label>
                <input
                  type="number"
                  className="input w-full bg-white/5 border border-white/10 text-slate-100"
                  value={form.stock_qty}
                  onChange={(e) => setForm((s) => ({ ...s, stock_qty: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400">Seuil stock faible</label>
                <input
                  type="number"
                  className="input w-full bg-white/5 border border-white/10 text-slate-100"
                  value={form.low_stock_threshold}
                  onChange={(e) => setForm((s) => ({ ...s, low_stock_threshold: e.target.value }))}
                />
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={form.is_active}
                  onChange={(e) => setForm((s) => ({ ...s, is_active: e.target.checked }))}
                />
                <span className="text-sm text-slate-200">Produit actif</span>
              </label>
            </div>
          </div>

          <div className="p-5 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button className="btn btn-outline border-white/15 text-slate-100" onClick={close}>
              Annuler
            </button>
            <button
              className="btn border-0 text-black font-semibold"
              style={{ background: "linear-gradient(90deg, var(--gold), var(--gold2))" }}
              onClick={submit}
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
