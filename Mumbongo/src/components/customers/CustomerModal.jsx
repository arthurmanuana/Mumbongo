import { useEffect, useState } from "react";
import ModalShell from "../ui/ModalShell";

export default function CustomerModal({ open, onClose, initial, onSave }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setName(initial?.name || "");
    setPhone(initial?.phone || "");
  }, [initial, open]);

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={initial ? "Modifier client" : "Nouveau client"}
      subtitle="Nom + téléphone (optionnel)."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-slate-400">Nom</label>
          <input
            className="input mt-2 w-full bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Sarah M."
          />
        </div>
        <div>
          <label className="text-xs text-slate-400">Téléphone</label>
          <input
            className="input mt-2 w-full bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ex: +243..."
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button className="btn btn-outline border-white/15 text-slate-100" onClick={onClose}>
          Annuler
        </button>
        <button
          className="btn border-0 text-black font-semibold"
          style={{ background: "linear-gradient(90deg, var(--gold), var(--gold2))" }}
          onClick={() => onSave?.({ name: name.trim(), phone: phone.trim() })}
          disabled={!name.trim()}
        >
          Enregistrer
        </button>
      </div>
    </ModalShell>
  );
}
