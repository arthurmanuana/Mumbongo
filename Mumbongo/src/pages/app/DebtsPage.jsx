import { useMemo, useState } from "react";
import DashboardCard from "../../components/dashboard/DashboardCard";
import DropdownSelect from "../../components/ui/DropdownSelect";
import { useMyShop } from "../../hooks/useMyShop";
import { useDebts, useMarkDebtPaid, useReopenDebt } from "../../hooks/useDebts";
import { toast } from "react-toastify";

const money = (n) => new Intl.NumberFormat("fr-FR").format(Number(n || 0));
const fmt = (iso) => {
  try { return new Date(iso).toLocaleDateString("fr-FR"); } catch { return iso; }
};

export default function DebtsPage() {
  const { data: shop, isLoading: shopLoading } = useMyShop();
  const shopId = shop?.id;

  const { data: debts = [], isLoading } = useDebts(shopId);
  const payMut = useMarkDebtPaid(shopId);
  const reopenMut = useReopenDebt(shopId);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const stats = useMemo(() => {
    const open = debts.filter((d) => d.status === "OPEN");
    const paid = debts.filter((d) => d.status === "PAID");
    const openTotal = open.reduce((s, d) => s + Number(d.amount_due || 0), 0);
    return { openCount: open.length, paidCount: paid.length, openTotal };
  }, [debts]);

  const filtered = useMemo(() => {
    let arr = [...debts];
    if (status !== "all") arr = arr.filter((d) => d.status === status);

    const q = query.trim().toLowerCase();
    if (q) {
      arr = arr.filter((d) => {
        const name = d.customer?.name || "";
        const phone = d.customer?.phone || "";
        return `${name} ${phone} ${d.sale_id || ""}`.toLowerCase().includes(q);
      });
    }
    return arr;
  }, [debts, query, status]);

  const disable = shopLoading || !shopId;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-100">Dettes</h1>
          <p className="mt-1 text-sm text-slate-300">Suivi OPEN / PAID — réactif.</p>
          <p className="mt-1 text-xs text-slate-400">
            Boutique : <span className="text-slate-200 font-medium">{shop?.name || "..."}</span>
          </p>
        </div>

        <div className="flex gap-2">
          <DropdownSelect
            label="Statut"
            value={status}
            onChange={setStatus}
            options={[
              { value: "all", label: "Tout" },
              { value: "OPEN", label: "Ouvertes" },
              { value: "PAID", label: "Payées" },
            ]}
            className="min-w-[160px]"
          />
        </div>
      </div>

      <DashboardCard
        title="Résumé"
        subtitle="Indicateurs clés"
        right={<span className="badge badge-outline border-white/15 text-slate-200">Live</span>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-sm text-slate-300">Dettes ouvertes</div>
            <div className="mt-2 text-2xl font-semibold text-slate-100">{stats.openCount}</div>
            <div className="text-xs text-slate-400 mt-1">À relancer</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-sm text-slate-300">Total ouvert</div>
            <div className="mt-2 text-2xl font-semibold text-slate-100">
              {money(stats.openTotal)} <span className="text-sm text-slate-400">CDF</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">Montant à récupérer</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-sm text-slate-300">Dettes payées</div>
            <div className="mt-2 text-2xl font-semibold text-slate-100">{stats.paidCount}</div>
            <div className="text-xs text-slate-400 mt-1">Historique</div>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard
        title="Liste"
        subtitle="Recherche par client / téléphone / vente"
        right={
          <span className="badge badge-outline border-white/15 text-slate-200">
            {filtered.length} dette(s)
          </span>
        }
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher : client, téléphone, vente…"
          className="input w-full bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-500"
          disabled={disable}
        />

        <div className="mt-4">
          {isLoading ? (
            <div className="text-slate-400">Chargement…</div>
          ) : filtered.length === 0 ? (
            <div className="text-slate-400">Aucune dette.</div>
          ) : (
            <div className="space-y-3">
              {filtered.map((d) => (
                <div
                  key={d.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-semibold text-slate-100">
                      {d.customer?.name || "Client"}
                      <span className="text-xs text-slate-400 font-normal"> • {d.customer?.phone || "—"}</span>
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      Vente: <span className="text-slate-300">{d.sale_id}</span> • {fmt(d.created_at)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <div className="text-slate-100 font-semibold">
                      {money(d.amount_due)} <span className="text-slate-400 text-sm">CDF</span>
                    </div>

                    {d.status === "OPEN" ? (
                      <button
                        className="btn btn-sm border-0 text-black font-semibold"
                        style={{ background: "linear-gradient(90deg, var(--gold), var(--gold2))" }}
                        onClick={async () => {
                          try {
                            await payMut.mutateAsync(d.id);
                            toast.success("Marquée payée ✅");
                          } catch (e) {
                            toast.error(e?.message || "Erreur");
                          }
                        }}
                      >
                        Marquer payée
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline border-white/15 text-slate-100"
                        onClick={async () => {
                          try {
                            await reopenMut.mutateAsync(d.id);
                            toast.info("Rouverte");
                          } catch (e) {
                            toast.error(e?.message || "Erreur");
                          }
                        }}
                      >
                        Réouvrir
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DashboardCard>
    </div>
  );
}
