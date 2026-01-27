import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useSalesUIStore } from "../../stores/salesUIStore";
import DropdownSelect from "../ui/DropdownSelect";

const money = (n) => new Intl.NumberFormat("fr-FR").format(Number(n || 0));

export default function NewSaleModal({
  products = [],
  customers = [],
  onSubmit,
}) {
  const { modalOpen, close } = useSalesUIStore();

  // Form state
  const [paymentType, setPaymentType] = useState("PAID");
  const [customerId, setCustomerId] = useState("none");
  const [notes, setNotes] = useState("");

  // Sale items
  const [items, setItems] = useState([]);

  // Lock body scroll when modal open (mobile fix)
  useEffect(() => {
    if (modalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [modalOpen]);

  const customerOptions = useMemo(() => {
    const base = [{ value: "none", label: "Client non enregistré" }];
    return base.concat(customers.map((c) => ({ value: c.id, label: c.name })));
  }, [customers]);

  const productOptions = useMemo(() => {
    return products.map((p) => ({
      value: p.id,
      label: `${p.name} • ${money(p.price)} CDF`,
      disabled: (p.stock_qty ?? 0) <= 0 || p.is_active === false,
    }));
  }, [products]);

  const total = useMemo(() => {
    return items.reduce((sum, it) => sum + it.qty * it.unit_price, 0);
  }, [items]);

  const addLine = () => {
    const available = products.filter(
      (x) => (x.stock_qty ?? 0) > 0 && x.is_active !== false,
    );
    if (available.length === 0) {
      alert("Aucun produit disponible (stock épuisé).");
      return;
    }
    const p = available[0];
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        product_id: p.id,
        qty: 1,
        unit_price: Number(p.price || 0),
      },
    ]);
  };

  const updateLine = (lineId, patch) => {
    setItems((prev) =>
      prev.map((it) => (it.id === lineId ? { ...it, ...patch } : it)),
    );
  };

  const removeLine = (lineId) => {
    setItems((prev) => prev.filter((it) => it.id !== lineId));
  };

  const resetAll = () => {
    setPaymentType("PAID");
    setCustomerId("none");
    setNotes("");
    setItems([]);
  };

  const submit = async () => {
    // ✅ 1) Validation stock AVANT d’envoyer
    for (const it of items) {
      const p = products.find((x) => x.id === it.product_id);
      const stock = Number(p?.stock_qty ?? 0);
      const qty = Number(it.qty || 0);

      if (!p) {
        alert("Produit introuvable.");
        return;
      }
      if (qty <= 0) {
        alert("Quantité invalide.");
        return;
      }
      if (stock <= 0) {
        alert(`Stock épuisé : ${p.name}`);
        return;
      }
      if (qty > stock) {
        alert(`Stock insuffisant pour ${p.name}. Disponible: ${stock}`);
        return;
      }
    }

    // ✅ 2) Payload propre (numbers)
    const payload = {
      payment_type: paymentType,
      customer_id: customerId === "none" ? null : customerId,
      notes: notes.trim() || null,
      items: items.map((it) => ({
        product_id: it.product_id,
        qty: Number(it.qty),
        unit_price: Number(it.unit_price),
      })),
      total_amount: Number(total),
    };

    try {
      await onSubmit?.(payload);
      close();
      resetAll();
    } catch (e) {
      // ✅ erreur = on reste sur la modal
      // (donc la vente n’a pas été validée)
    }
  };

  if (!modalOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
        onClick={() => {
          close();
          resetAll();
        }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-2 sm:px-4">
        <div
          className="
            w-full max-w-3xl
            max-h-[85dvh] sm:max-h-[80vh]
            overflow-y-auto
            rounded-2xl
            border border-white/10
            bg-[rgba(10,12,18,0.96)]
            backdrop-blur-xl
            p-4 sm:p-6
            text-slate-100
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">Nouvelle vente</h3>
              <p className="text-sm text-slate-400 mt-1">
                Ajoute des produits, choisis le paiement — total calculé
                automatiquement.
              </p>
            </div>

            <button
              className="btn btn-sm btn-ghost text-slate-200"
              onClick={() => {
                close();
                resetAll();
              }}
            >
              ✕
            </button>
          </div>

          {/* Header form */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            <DropdownSelect
              label="Type"
              value={paymentType}
              onChange={setPaymentType}
              options={[
                { value: "PAID", label: "Payée (Cash / Mobile Money)" },
                { value: "CREDIT", label: "Crédit (Dette client)" },
              ]}
            />

            <DropdownSelect
              label="Client"
              value={customerId}
              onChange={setCustomerId}
              options={customerOptions}
            />

            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              className="input bg-white/5 border border-white/10 text-slate-100"
            />
          </div>

          {/* Items */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div>
                <div className="font-semibold">Produits</div>
                <div className="text-xs text-slate-400">
                  Ajoute des lignes (produit + quantité)
                </div>
              </div>

              <button
                className="btn btn-sm border-0 text-black font-semibold"
                style={{
                  background:
                    "linear-gradient(90deg, var(--gold), var(--gold2))",
                }}
                onClick={addLine}
                type="button"
              >
                + Ajouter ligne
              </button>
            </div>

            <div className="p-4 space-y-3">
              {items.length === 0 ? (
                <div className="text-slate-400 text-sm">
                  Aucune ligne. Clique sur{" "}
                  <span className="text-slate-200 font-semibold">
                    “Ajouter ligne”
                  </span>
                  .
                </div>
              ) : (
                items.map((it) => {
                  const prod = products.find((p) => p.id === it.product_id);
                  const maxQty = Number(prod?.stock_qty ?? 1);

                  return (
                    <div
                      key={it.id}
                      className="grid grid-cols-1 md:grid-cols-[1fr_120px_140px_auto] gap-3 items-end rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                    >
                      <div>
                        <label className="text-xs text-slate-400">
                          Produit
                        </label>
                        <div className="mt-2">
                          <DropdownSelect
                            label="Produit"
                            value={it.product_id}
                            onChange={(v) => {
                              const p = products.find((x) => x.id === v);
                              const stock = Number(p?.stock_qty ?? 1);
                              updateLine(it.id, {
                                product_id: v,
                                unit_price: Number(p?.price || 0),
                                qty: Math.min(it.qty || 1, stock),
                              });
                            }}
                            options={productOptions}
                          />
                        </div>
                        <div className="text-xs text-slate-500 mt-2">
                          Stock:{" "}
                          <span className="text-slate-300">
                            {prod?.stock_qty ?? "-"}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-400">Qté</label>
                        <input
                          type="number"
                          inputMode="numeric"
                          min={1}
                          step={1}
                          max={maxQty}
                          value={it.qty}
                          onChange={(e) => {
                            // ✅ laisse taper sans “forcer” tout de suite
                            const raw = e.target.value;

                            // autorise champ vide pendant la saisie
                            if (raw === "") {
                              updateLine(it.id, { qty: "" });
                              return;
                            }

                            // garde seulement les nombres
                            const v = Number(raw);
                            if (Number.isNaN(v)) return;

                            updateLine(it.id, { qty: v });
                          }}
                          onBlur={() => {
                            // ✅ clamp seulement quand on sort du champ
                            const v = Number(it.qty || 1);
                            updateLine(it.id, {
                              qty: Math.max(1, Math.min(v, maxQty)),
                            });
                          }}
                          className="input mt-2 w-full bg-white/5 border border-white/10 text-slate-100"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-400">
                          Prix unitaire
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={it.unit_price}
                          onChange={(e) =>
                            updateLine(it.id, {
                              unit_price: Math.max(
                                0,
                                Number(e.target.value || 0),
                              ),
                            })
                          }
                          className="input mt-2 w-full bg-white/5 border border-white/10 text-slate-100"
                        />
                      </div>

                      <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                        <div className="text-sm text-slate-300">
                          Total:{" "}
                          <span className="text-slate-100 font-semibold">
                            {money(it.qty * it.unit_price)} CDF
                          </span>
                        </div>
                        <button
                          className="btn btn-sm btn-ghost text-slate-300"
                          onClick={() => removeLine(it.id)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-slate-300">
              Total à payer :{" "}
              <span className="text-slate-100 font-semibold text-lg">
                {money(total)} CDF
              </span>
            </div>

            <div className="flex gap-2">
              <button
                className="btn btn-outline border-white/15 text-slate-100"
                type="button"
                onClick={() => {
                  close();
                  resetAll();
                }}
              >
                Annuler
              </button>

              <button
                className="btn border-0 text-black font-semibold"
                style={{
                  background:
                    "linear-gradient(90deg, var(--gold), var(--gold2))",
                }}
                type="button"
                onClick={submit}
                disabled={items.length === 0}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
