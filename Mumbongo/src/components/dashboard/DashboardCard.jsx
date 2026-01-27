export default function DashboardCard({ title, subtitle, right, children }) {
  return (
    <div className="relative">
      {/* Glow layer */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-3xl opacity-70 blur-xl"
        style={{
          background:
            "radial-gradient(600px circle at 20% 20%, rgba(245,185,66,0.12), transparent 40%), radial-gradient(600px circle at 90% 10%, rgba(46,229,157,0.10), transparent 35%)",
        }}
      />

      {/* Card */}
      <div className="relative rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-3 p-5 border-b border-white/10">
          <div>
            <div className="text-slate-100 font-semibold">{title}</div>
            {subtitle ? <div className="text-xs text-slate-400 mt-1">{subtitle}</div> : null}
          </div>
          {right ? <div>{right}</div> : null}
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
