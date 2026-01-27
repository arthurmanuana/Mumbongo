import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function ModalShell({ open, onClose, title, subtitle, children, right }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-2 sm:px-4">
        <div
          className="w-full max-w-2xl max-h-[85dvh] sm:max-h-[80vh] overflow-y-auto
                     rounded-2xl border border-white/10 bg-[rgba(10,12,18,0.96)]
                     backdrop-blur-xl p-4 sm:p-6 text-slate-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              {subtitle ? <p className="text-sm text-slate-400 mt-1">{subtitle}</p> : null}
            </div>
            <div className="flex items-center gap-2">
              {right}
              <button className="btn btn-sm btn-ghost text-slate-200" onClick={onClose}>
                ✕
              </button>
            </div>
          </div>

          <div className="mt-5">{children}</div>
        </div>
      </div>
    </>,
    document.body,
  );
}
