import { useMemo, useState } from "react";
import DashboardCard from "../../components/dashboard/DashboardCard";
import CustomerModal from "../../components/customers/CustomerModal";
import { useMyShop } from "../../hooks/useMyShop";
import { useAddCustomer, useCustomers, useDeleteCustomer, useUpdateCustomer } from "../../hooks/useCustomers";
import { toast } from "react-toastify";

export default function CustomersPage() {
  const { data: shop, isLoading: shopLoading } = useMyShop();
  const shopId = shop?.id;

  const { data: customers = [], isLoading } = useCustomers(shopId);
  const addMut = useAddCustomer(shopId);
  const updMut = useUpdateCustomer(shopId);
  const delMut = useDeleteCustomer(shopId);

  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((c) =>
      `${c.name} ${c.phone || ""}`.toLowerCase().includes(q),
    );
  }, [customers, query]);

  const openNew = () => { setEdit(null); setModalOpen(true); };
  const openEdit = (c) => { setEdit(c); setModalOpen(true); };

  const disable = shopLoading || !shopId;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-100">Clients</h1>
          <p className="mt-1 text-sm text-slate-300">Liste + recherche — réactif.</p>
          <p className="mt-1 text-xs text-slate-400">
            Boutique : <span className="text-slate-200 font-medium">{shop?.name || "..."}</span>
          </p>
        </div>

        <button
          className="btn btn-sm border-0 text-black font-semibold"
          style={{ background: "linear-gradient(90deg, var(--gold), var(--gold2))" }}
          onClick={openNew}
          disabled={disable}
        >
          + Ajouter
        </button>
      </div>

      <DashboardCard
        title="Répertoire"
        subtitle="Tape un nom ou un numéro"
        right={
          <span className="badge badge-outline border-white/15 text-slate-200">
            {filtered.length} client(s)
          </span>
        }
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher : nom, téléphone…"
          className="input w-full bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-500"
        />

        <div className="mt-4">
          {isLoading ? (
            <div className="text-slate-400">Chargement…</div>
          ) : filtered.length === 0 ? (
            <div className="text-slate-400">Aucun client.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {filtered.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="font-semibold text-slate-100">{c.name}</div>
                    <div className="text-sm text-slate-400 mt-1">{c.phone || "—"}</div>
                  </div>

                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-outline border-white/15 text-slate-100" onClick={() => openEdit(c)}>
                      Modifier
                    </button>
                    <button
                      className="btn btn-sm btn-ghost text-slate-300"
                      onClick={async () => {
                        if (!confirm("Supprimer ce client ?")) return;
                        try {
                          await delMut.mutateAsync(c.id);
                          toast.success("Client supprimé");
                        } catch (e) {
                          toast.error(e?.message || "Erreur suppression");
                        }
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DashboardCard>

      <CustomerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initial={edit}
        onSave={async (payload) => {
          try {
            if (!payload.name) return;
            if (edit) {
              await updMut.mutateAsync({ id: edit.id, payload });
              toast.success("Client modifié ✅");
            } else {
              await addMut.mutateAsync(payload);
              toast.success("Client ajouté ✅");
            }
            setModalOpen(false);
          } catch (e) {
            toast.error(e?.message || "Erreur");
          }
        }}
      />
    </div>
  );
}
