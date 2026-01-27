export default function SaleStatusPill({ type }) {
  const credit = type === "CREDIT";
  return (
    <span
      className="px-2 py-1 rounded-full text-xs border"
      style={{
        borderColor: credit ? "rgba(245,185,66,0.35)" : "rgba(46,229,157,0.35)",
        background: credit ? "rgba(245,185,66,0.08)" : "rgba(46,229,157,0.08)",
        color: credit ? "rgba(245,185,66,0.95)" : "rgba(46,229,157,0.95)",
      }}
    >
      {credit ? "CRÉDIT" : "PAYÉE"}
    </span>
  );
}
