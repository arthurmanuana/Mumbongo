import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useUIStore } from "../stores/uiStore";
import { useMyShop } from "../hooks/useMyShop";

const navItems = [
  { to: "/app", label: "Vue d’ensemble", icon: "📊" },
  { to: "/app/products", label: "Produits", icon: "📦" },
  { to: "/app/sales", label: "Ventes", icon: "🧾" },
  { to: "/app/debts", label: "Dettes", icon: "💳" },
  { to: "/app/customers", label: "Clients", icon: "👥" },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { drawerOpen, setDrawerOpen } = useUIStore();
  const { data: shop } = useMyShop();

  const logout = async () => {
    await signOut();
    toast.info("Déconnecté.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Topbar mobile */}
      <div className="sticky top-0 z-40 md:hidden">
        <div className="px-4 pt-4">
          <div
            className="rounded-2xl border backdrop-blur-xl shadow-lg"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <button
                className="bg-white/[0.03] text-slate-100 hover:bg-white/[0.06]"
                onClick={() => setDrawerOpen(true)}
              >
                ☰
              </button>

              <div className="text-white font-semibold">Mumbongo</div>

              <button className="bg-white/[0.03] text-slate-100 hover:bg-white/[0.06]" onClick={logout}>
                ⎋
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 md:gap-6">
          {/* Sidebar desktop */}
          {/* Sidebar desktop (premium) */}
          <aside className="hidden md:block">
            <div className="sticky top-6">
              <div className="relative">
                {/* Glow */}
                <div
                  className="pointer-events-none absolute -inset-[1px] rounded-3xl opacity-80 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(700px circle at 15% 15%, rgba(245,185,66,0.14), transparent 45%), radial-gradient(700px circle at 90% 10%, rgba(46,229,157,0.12), transparent 40%)",
                  }}
                />

                {/* Card */}
                <div className="relative rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-hidden">
                  {/* Header */}
                  <div className="p-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <img
                        src="/logo.png"
                        alt="Mumbongo logo"
                        className="
    h-11 w-11
    rounded-xl
    object-contain
    bg-white/[0.03]
    p-1
    border border-white/10
  "
                      />

                      <div className="min-w-0">
                        <div className="text-slate-100 font-semibold leading-tight">
                          Mumbongo
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 truncate">
                          {shop?.name
                            ? `${shop.name} • ${shop?.currency || "CDF"}`
                            : user?.email}
                        </div>
                      </div>
                    </div>

                    {/* mini badge */}
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: "rgba(46,229,157,0.9)" }}
                        />
                        Connecté • Dashboard
                      </span>
                    </div>
                  </div>

                  {/* Nav */}
                  <nav className="p-3">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === "/app"}
                        className={({ isActive }) =>
                          [
                            "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-all",
                            "border border-transparent",
                            isActive
                              ? "bg-white/[0.05] border-white/10"
                              : "hover:bg-white/[0.04] hover:border-white/10",
                          ].join(" ")
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {/* icon chip */}
                            <div
                              className="h-10 w-10 rounded-2xl border flex items-center justify-center"
                              style={{
                                borderColor: isActive
                                  ? "rgba(245,185,66,0.28)"
                                  : "rgba(255,255,255,0.10)",
                                background: isActive
                                  ? "linear-gradient(135deg, rgba(245,185,66,0.16), rgba(46,229,157,0.10))"
                                  : "rgba(255,255,255,0.03)",
                              }}
                            >
                              <span className="text-lg">{item.icon}</span>
                            </div>

                            <div className="flex-1">
                              <div className="text-slate-100 font-medium">
                                {item.label}
                              </div>
                              <div className="text-xs text-slate-400">
                                {item.to === "/app" && "Stats & graphiques"}
                                {item.to === "/app/products" &&
                                  "Stock & alertes"}
                                {item.to === "/app/sales" &&
                                  "Historique & caisse"}
                                {item.to === "/app/debts" &&
                                  "Crédit & relances"}
                                {item.to === "/app/customers" &&
                                  "Contacts & suivi"}
                              </div>
                            </div>

                            {/* active accent */}
                            <div
                              className="h-2 w-2 rounded-full opacity-0 group-hover:opacity-70 transition"
                              style={{
                                background: isActive
                                  ? "rgba(245,185,66,0.95)"
                                  : "rgba(255,255,255,0.35)",
                                opacity: isActive ? 1 : undefined,
                              }}
                            />
                          </>
                        )}
                      </NavLink>
                    ))}
                  </nav>

                  {/* Footer actions */}
                  <div className="p-4 border-t border-white/10">
                    <button
                      className="btn w-full border border-white/10 bg-white/[0.03] text-slate-100 hover:bg-white/[0.06]"
                      onClick={logout}
                    >
                      Se déconnecter
                    </button>

                    <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
                      Astuce : si l’appareil est partagé, déconnecte-toi après
                      utilisation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main>
            <div
              className="rounded-3xl border backdrop-blur-xl shadow-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "var(--border)",
              }}
            >
              <div className="p-4 sm:p-6">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Drawer mobile */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDrawerOpen(false)}
          />
          <div
            className="absolute right-0 top-0 h-full w-[86%] max-w-sm border-l p-4"
            style={{
              background: "rgba(6,8,15,0.96)",
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-100">Menu</div>
              <button
                className="btn btn-ghost btn-sm text-slate-200 hover:text-white"
                onClick={() => setDrawerOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/app"}
                  onClick={() => setDrawerOpen(false)}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm border transition",
                      isActive ? "opacity-100" : "opacity-90 hover:opacity-100",
                    ].join(" ")
                  }
                  style={({ isActive }) => ({
                    borderColor: isActive
                      ? "rgba(245,185,66,0.35)"
                      : "rgba(255,255,255,0.10)",
                    background: isActive
                      ? "rgba(245,185,66,0.07)"
                      : "rgba(255,255,255,0.03)",
                  })}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium text-slate-100">
                    {item.label}
                  </span>
                </NavLink>
              ))}
            </div>

            <div className="mt-5">
              <button
                className="
    btn w-full
    border border-white/15
    bg-white/[0.04]
    text-slate-100
    hover:bg-white/[0.08]
  "
                onClick={logout}
              >
                Se déconnecter
              </button>
              <p className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
                Astuce : sur un appareil partagé, déconnecte-toi toujours.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
