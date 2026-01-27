import { useEffect, useState } from "react";

/**
 * Navbar (Landing) - FIX UX Scroll
 * - Navigation ancres contrôlée (scrollIntoView + offset via scroll-padding-top)
 * - Ferme le drawer et libère le scroll à chaque navigation (desktop + mobile)
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Accueil", id: "home" },
    { label: "Fonctionnalités", id: "features" },
    { label: "Témoignages", id: "testimonials" },
    { label: "Tarifs", id: "pricing" },
    { label: "FAQ", id: "faq" },
  ];

  const closeDrawer = () => {
    const el = document.getElementById("landing-drawer");
    if (el) el.checked = false;

    // libère le scroll au cas où DaisyUI aurait bloqué le body
    document.body.style.overflow = "";
  };

  const goTo = (id) => {
  closeDrawer();

  const target = document.getElementById(id);
  const nav = document.getElementById("site-nav");
  if (!target) return;

  // Hauteur réelle de la navbar (avec son padding)
  const navH = nav ? nav.getBoundingClientRect().height : 88;

  // Position de la section sur la page
  const targetTop = window.scrollY + target.getBoundingClientRect().top;

  // On scrolle en gardant une marge (petit confort UX)
  const offset = navH + 18;

  window.scrollTo({
    top: Math.max(0, targetTop - offset),
    behavior: "smooth",
  });

  // SEO / partage
  window.history.replaceState(null, "", `#${id}`);
};


  return (
    <div className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        {/* On réserve une hauteur stable */}
        <div className="h-[88px] flex items-start">
          <div className="drawer drawer-end w-full">
            <input id="landing-drawer" type="checkbox" className="drawer-toggle" />

            {/* Barre */}
            <div className="drawer-content">
              <div
                id="site-nav"
                className="rounded-2xl border backdrop-blur-xl shadow-lg transition-all duration-300"
                style={{
                  background: scrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center justify-between px-4 py-3">
                  {/* Logo -> scroll contrôlé */}
                  <button
                    type="button"
                    onClick={() => goTo("home")}
                    className="flex items-center gap-2 text-left"
                  >
                    <div
                      className="h-9 w-9 rounded-xl border"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(245,185,66,0.25), rgba(46,229,157,0.18))",
                        borderColor: "rgba(255,255,255,0.12)",
                      }}
                    />
                    <div className="leading-tight">
                      <div className="font-semibold tracking-tight">Mumbongo</div>
                      <div className="text-xs" style={{ color: "var(--muted)" }}>
                        Stock • Ventes • Dettes
                      </div>
                    </div>
                  </button>

                  {/* Desktop links -> scroll contrôlé */}
                  <nav className="hidden md:flex items-center gap-6">
                    {links.map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => goTo(l.id)}
                        className="text-sm hover:opacity-90 transition-opacity"
                        style={{ color: "var(--muted)" }}
                      >
                        {l.label}
                      </button>
                    ))}
                  </nav>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <a href="/login" className="hidden sm:inline-flex btn btn-ghost btn-sm">
                      Se connecter
                    </a>

                    <a
                      href="/register"
                      className="hidden sm:inline-flex btn btn-sm border-0 text-black font-semibold"
                      style={{ background: "linear-gradient(90deg, var(--gold), var(--gold2))" }}
                    >
                      Commencer
                    </a>

                    {/* Burger mobile */}
                    <label
                      htmlFor="landing-drawer"
                      className="md:hidden btn btn-ghost btn-sm"
                      onClick={() => (document.body.style.overflow = "")}
                    >
                      ☰
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer side */}
            <div className="drawer-side">
              <label htmlFor="landing-drawer" className="drawer-overlay" />

              <div
                className="min-h-full w-80 p-4 border-l"
                style={{ background: "rgba(6,8,15,0.96)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Menu</div>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={closeDrawer}>
                    ✕
                  </button>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  {links.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => goTo(l.id)}
                      className="text-left rounded-xl px-3 py-2 border hover:bg-white/5 transition-colors"
                      style={{
                        borderColor: "rgba(255,255,255,0.10)",
                        color: "var(--text)",
                      }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex gap-2">
                  <a
                    href="/login"
                    className="btn btn-outline flex-1"
                    style={{ borderColor: "var(--border)", color: "var(--text)" }}
                    onClick={closeDrawer}
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="btn flex-1 border-0 text-black font-semibold"
                    style={{ background: "linear-gradient(90deg, var(--gold), var(--gold2))" }}
                    onClick={closeDrawer}
                  >
                    Start
                  </a>
                </div>

                <p className="mt-6 text-xs" style={{ color: "var(--muted)" }}>
                  Mobile-first. Simple. Adapté RDC.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
