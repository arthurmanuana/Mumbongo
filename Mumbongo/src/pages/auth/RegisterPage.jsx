import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import AuthLayout from "./AuthLayout";
import { supabase } from "../../lib/supabaseClient";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    shopName: "",
    email: "",
    phone: "",
    password: "",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const email = form.email.trim().toLowerCase();
      const password = form.password;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            shop_name: form.shopName.trim(),
            phone: form.phone.trim(),
          },
        },
      });

      if (error) throw error;

      // Selon tes réglages Supabase, il peut demander confirmation email.
      // On informe l’utilisateur correctement.
      if (data?.user && !data?.session) {
        toast.info("Compte créé ✅ Vérifie ton email pour confirmer, puis connecte-toi.");
        navigate("/login");
        return;
      }

      toast.success("Compte créé ✅ Bienvenue !");
      navigate("/app"); // dashbord
    } catch (err) {
      toast.error(err?.message || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Commence gratuitement. Tu pourras gérer stock, ventes et dettes dès aujourd’hui."
    >
      <h2 className="text-xl font-semibold">Inscription</h2>
      <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
        Déjà un compte ?{" "}
        <Link to="/login" className="underline decoration-white/20 hover:opacity-90">
          Se connecter
        </Link>
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium">Nom de la boutique</label>
          <input
            name="shopName"
            value={form.shopName}
            onChange={onChange}
            className="input w-full mt-2 border"
            placeholder="Ex: Boutique Nzambe"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)" }}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className="input w-full mt-2 border"
            placeholder="ex: nom@email.com"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)" }}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Téléphone (optionnel)</label>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="input w-full mt-2 border"
            placeholder="+243..."
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)" }}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            className="input w-full mt-2 border"
            placeholder="••••••••"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)" }}
            required
            minLength={6}
          />
          <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
            Minimum 6 caractères.
          </p>
        </div>

        <div
          className="rounded-2xl border p-3 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "var(--muted)" }}
        >
          En créant un compte, tu acceptes que certaines fonctionnalités puissent devenir payantes plus tard.
          Tu seras toujours prévenu avant activation.
        </div>

        <button
          disabled={loading}
          className="btn w-full border-0 text-black font-semibold disabled:opacity-60"
          style={{ background: "linear-gradient(90deg, var(--gold), var(--gold2))" }}
        >
          {loading ? "Création..." : "Créer mon compte"}
        </button>
      </form>
    </AuthLayout>
  );
}
