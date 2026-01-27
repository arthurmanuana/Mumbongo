export default function BillingToggle({ value, onChange }) {
  return (
    <div
      className="mx-auto mt-5 w-fit rounded-2xl border p-1 backdrop-blur-xl"
      style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)" }}
    >
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange("monthly")}
          className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: value === "monthly" ? "linear-gradient(90deg, var(--gold), var(--gold2))" : "transparent",
            color: value === "monthly" ? "#000" : "var(--muted)",
          }}
        >
          Mensuel
        </button>

        <button
          type="button"
          onClick={() => onChange("yearly")}
          className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: value === "yearly" ? "linear-gradient(90deg, var(--gold), var(--gold2))" : "transparent",
            color: value === "yearly" ? "#000" : "var(--muted)",
          }}
        >
          Annuel
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(46,229,157,0.18)", color: "var(--mint)" }}>
            -20%
          </span>
        </button>
      </div>
    </div>
  );
}
