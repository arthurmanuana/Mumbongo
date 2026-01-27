export default function ProductStatusPill({ active }) {
  return (
    <span
      className="px-2 py-1 rounded-full text-xs border"
      style={{
        borderColor: active ? "rgba(46,229,157,0.35)" : "rgba(255,255,255,0.18)",
        background: active ? "rgba(46,229,157,0.08)" : "rgba(255,255,255,0.04)",
        color: active ? "rgba(46,229,157,0.95)" : "rgba(226,232,240,0.85)",
      }}
    >
      {active ? "ACTIF" : "INACTIF"}
    </span>
  );
}
