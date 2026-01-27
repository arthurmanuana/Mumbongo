import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import AuthLayout from "./AuthLayout";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (error) throw error;

      toast.success("Connexion réussie ✅");
      navigate("/app"); // dashbord
    } catch (err) {
  const msg = err?.message || "Erreur de connexion.";

      if (msg.toLowerCase().includes("invalid login credentials")) {
        toast.error("Email ou mot de passe incorrect. Si tu viens de t’inscrire, vérifie aussi ton email de confirmation.");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Connexion"
      subtitle="Accède à ton dashboard et retrouve ton stock, tes ventes et tes dettes."
    >
      <h2 className="text-xl font-semibold">Se connecter</h2>
      <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
        Pas encore de compte ?{" "}
        <Link to="/register" className="underline decoration-white/20 hover:opacity-90">
          Créer un compte
        </Link>
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
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
          />
        </div>

        <button
          disabled={loading}
          className="btn w-full border-0 text-black font-semibold disabled:opacity-60"
          style={{ background: "linear-gradient(90deg, var(--gold), var(--gold2))" }}
        >
          {loading ? "Connexion..." : "Connexion"}
        </button>

        <p className="text-xs text-center mt-2" style={{ color: "var(--muted)" }}>
          Mot de passe oublié ? (à ajouter plus tard)
        </p>
      </form>
    </AuthLayout>
  );
}
