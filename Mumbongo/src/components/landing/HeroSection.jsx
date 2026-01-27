import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


/**
 * HeroSection
 * - Style SaaS premium dark
 * - CTA meilleurs (gradient + outline)
 * - Espace mockup image à droite
 */
export default function HeroSection() {
  
  const navigate = useNavigate();

  return (
    <section id="home" className="pt-10 sm:pt-14">
      <div
        className="rounded-3xl border shadow-xl backdrop-blur-xl"
        style={{
          background: "linear-gradient(180deg, var(--card), var(--card2))",
          borderColor: "var(--border)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-10">
          {/* Texte */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-sm"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--mint)" }} />
              Pensé pour les commerces en RDC • Mobile-first
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-4 text-4xl sm:text-5xl font-semibold leading-tight tracking-tight"
            >
              Gérez votre stock et vos ventes,
              <span style={{ color: "var(--gold)" }}> comme un pro</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-4 max-w-xl text-base sm:text-lg"
              style={{ color: "var(--muted)" }}
            >
              MobiStock vous aide à suivre vos produits, enregistrer vos ventes et contrôler les dettes
              clients — directement depuis un navigateur, sur téléphone ou PC.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-7 flex flex-col sm:flex-row gap-3"
            >
              <button
  type="button"
                onClick={() => navigate("/register")}
                className="btn border-0 text-black font-semibold"
                style={{ background: "linear-gradient(90deg, var(--gold), var(--gold2))" }}
              >
                Essayer gratuitement
              </button>

              <button
                className="btn btn-outline"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                Voir la démo
              </button>
            </motion.div>

            {/* Proof */}
            <div className="mt-6 flex items-center gap-3">
              <div className="avatar-group -space-x-3 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-9 rounded-full ring-2 ring-white/10">
                    <img src="/images/people/p1.jpg" alt="Client 1" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-9 rounded-full ring-2 ring-white/10">
                    <img src="/images/people/p2.jpg" alt="Client 2" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-9 rounded-full ring-2 ring-white/10">
                    <img src="/images/people/p3.jpg" alt="Client 3" />
                  </div>
                </div>
              </div>

              <p className="text-sm" style={{ color: "var(--muted)" }}>
                <span style={{ color: "var(--gold)" }} className="font-semibold">
                  +500
                </span>{" "}
                commerçants visent zéro pertes avec MobiStock
              </p>
            </div>
          </div>

          {/* Mockup (image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div
              className="rounded-3xl border overflow-hidden shadow-2xl"
              style={{ borderColor: "var(--border)", background: "rgba(0,0,0,0.25)" }}
            >
              {/* ✅ Ici tu mets ton image mockup */}
              <img
                src="/images/mockups/dashboard.png"
                alt="Aperçu MobiStock"
                className="w-full h-[320px] sm:h-[420px] object-cover"
              />
            </div>

            {/* petit badge */}
            <div
              className="absolute -bottom-4 left-4 rounded-2xl border px-4 py-3 backdrop-blur-xl"
              style={{ background: "rgba(255,255,255,0.06)", borderColor: "var(--border)" }}
            >
              <p className="text-sm font-semibold">Ventes • Stock • Dettes</p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Tout en un, sur mobile.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
