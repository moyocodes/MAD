import { useCms } from "@/context/CmsContext";

export default function Footer() {
  const { cmsData, isEditMode, openPanel } = useCms();
  const f = cmsData.footer;
  const cols = f.columns ?? [];

  return (
    <footer className="pt-16 sm:pt-20 px-4 sm:px-8 pb-14 relative">
      <div
        style={{ maxWidth: 1100, margin: "0 auto", marginBottom: 64 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16"
      >
        {/* Brand column */}
        <div>
          <img src="/ma.png" alt="MAD" style={{ height: 130, width: "auto", opacity: 0.9 }} />
          <p className="text-azure-800/55 text-[15px] mt-5 leading-relaxed max-w-[260px] font-normal">
            {f.description}
          </p>
          <div className="flex gap-[10px] mt-[22px]">
            {(f.social ?? []).map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-[9px] flex items-center justify-center text-[11px] font-extrabold no-underline transition-[background,color] duration-200 text-azure-500/55 bg-azure-500/[8%]"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1980c2";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "";
                  e.currentTarget.style.color = "";
                }}
              >
                <i className={s.iconClass} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* CMS-driven nav columns */}
        {cols.map((col) => (
          <div key={col.title}>
            <h5 className="text-[10.5px] tracking-[0.2em] uppercase mb-[22px] font-extrabold text-azure-500/50">
              {col.title}
            </h5>
            {(col.links ?? []).map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="block text-[16px] mb-[14px] no-underline font-medium leading-[1.3] text-azure-800/50 transition-colors duration-200"
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1980c2")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="border-t border-azure-500/10 pt-7 flex flex-wrap gap-3 justify-between items-center"
        style={{ maxWidth: 1100, margin: "0 auto" }}
      >
        {isEditMode && (
          <button
            onClick={() => openPanel("footer")}
            style={{ background: "#0b457b", color: "#fff", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 9, fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", cursor: "pointer" }}
          >
            ✏ Edit Footer
          </button>
        )}
        <p className="text-[14px] text-azure-800/40 font-medium">{f.copyright}</p>
      </div>
    </footer>
  );
}
