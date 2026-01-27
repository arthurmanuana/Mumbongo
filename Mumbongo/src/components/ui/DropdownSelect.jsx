export default function DropdownSelect({
  label,
  value,
  options,
  onChange,
  className = "",
}) {
  const current = options.find((o) => o.value === value)?.label ?? label;

  return (
    <div className={`dropdown dropdown-start w-full ${className}`}>
      <button
        type="button"
        className="btn w-full justify-between bg-white/5 border border-white/10 text-slate-100 hover:bg-white/[0.06]"
      >
        <span className="truncate">{current}</span>
        <span className="opacity-70">▾</span>
      </button>

      {/* Menu opaque (plus jamais transparent) */}
      <ul
        className="
        dropdown-content menu
    mt-2
    w-full min-w-[16rem] max-w-[92vw]
    rounded-2xl
    border border-white/12
    p-2
    shadow-2xl
    z-[9999]"
        style={{ background: "rgba(10,12,18,0.98)" }}
      >
        {options.map((o) => (
          <li key={o.value}>
            <button
              type="button"
              onClick={() => !o.disabled && onChange(o.value)}
              disabled={o.disabled}
              className={`justify-between ${o.value === value ? "bg-white/10" : ""} ${
                o.disabled ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <span className="text-slate-100">{o.label}</span>
              {o.value === value ? (
                <span className="text-slate-300">✓</span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
