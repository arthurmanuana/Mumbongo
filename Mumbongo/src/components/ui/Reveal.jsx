import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Reveal
 * - Anime un bloc quand il entre dans le viewport (scroll reveal)
 * - Réutilisable sur n'importe quelle section
 *
 * Props:
 * - children
 * - delay (en secondes)
 * - y (distance verticale)
 */
export default function Reveal({ children, delay = 0, y = 18 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
