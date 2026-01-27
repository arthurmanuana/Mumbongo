import Reveal from "../ui/Reveal";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-14 sm:mt-20 pb-10">
      <Reveal>
        <div
          className="rounded-3xl border p-6 sm:p-10 backdrop-blur-xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.10)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-2xl border"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(245,185,66,0.22), rgba(46,229,157,0.16))",
                    borderColor: "rgba(255,255,255,0.12)",
                  }}
                />
                <div>
                  <p className="font-semibold">MobiStock</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    Stock • Ventes • Dettes — simple, rapide, adapté RDC
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm max-w-xl" style={{ color: "var(--muted)" }}>
                MobiStock est une application web pensée pour les petits commerces :
                gérer le stock, enregistrer les ventes, suivre les dettes clients et éviter les pertes.
              </p>

              {/* Contact (SEO) */}
              <div className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
                <p>
                  <span style={{ color: "var(--text)" }}>Contact :</span>{" "}
                  <span className="underline decoration-white/20">contact@mobistock.app</span>
                </p>
                <p>
                  <span style={{ color: "var(--text)" }}>WhatsApp :</span>{" "}
                  <span className="underline decoration-white/20">+243 XXX XXX XXX</span>
                </p>
              </div>
            </div>

            {/* Links */}
            <div>
              <p className="font-semibold">Produit</p>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--muted)" }}>
                <li><a className="hover:opacity-90" href="#features">Fonctionnalités</a></li>
                <li><a className="hover:opacity-90" href="#testimonials">Témoignages</a></li>
                <li><a className="hover:opacity-90" href="#pricing">Tarifs</a></li>
                <li><a className="hover:opacity-90" href="#faq">FAQ</a></li>
              </ul>
            </div>

            {/* Legal/Social */}
            <div>
              <p className="font-semibold">Ressources</p>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--muted)" }}>
                <li><a className="hover:opacity-90" href="/login">Se connecter</a></li>
                <li><a className="hover:opacity-90" href="/register">Créer un compte</a></li>
                <li><a className="hover:opacity-90" href="#contact">Support</a></li>
                <li><span className="opacity-80">Politique (à venir)</span></li>
              </ul>

              <div className="mt-5 flex gap-2">
                <a className="btn btn-sm btn-ghost" href="#" aria-label="Facebook">f</a>
                <a className="btn btn-sm btn-ghost" href="#" aria-label="X">x</a>
                <a className="btn btn-sm btn-ghost" href="#" aria-label="LinkedIn">in</a>
              </div>
            </div>
          </div>

          <div
            className="mt-8 pt-5 border-t text-xs flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between"
            style={{ borderColor: "rgba(255,255,255,0.10)", color: "var(--muted)" }}
          >
            <p>© {year} MobiStock. Tous droits réservés.</p>
            <p>Made for mobile-first commerce in RDC.</p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
