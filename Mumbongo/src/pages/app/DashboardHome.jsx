import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function DashboardHome() {
  const { user, signOut } = useAuth();

  const logout = async () => {
    await signOut();
    toast.info("Déconnecté.");
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 opacity-80">Connecté en tant que : {user?.email}</p>

      <button onClick={logout} className="btn mt-6 btn-outline">
        Se déconnecter
      </button>
    </div>
  );
}
