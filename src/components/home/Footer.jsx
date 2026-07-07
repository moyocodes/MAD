import { useCms } from "@/context/CmsContext";

const SOCIAL_ICONS = {
  Instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  LinkedIn: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Twitter: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
};

export default function Footer() {
  const { cmsData, isEditMode, openPanel } = useCms();
  const f = cmsData.footer;
  const { brand } = cmsData;
  const cols = f.columns ?? [];

  const scrollTo = (href, e) => {
    if (!href.startsWith("#") || href === "#") return;
    e.preventDefault();
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer
      className="pt-16 sm:pt-20 px-4 sm:px-8 pb-14 relative bg-azure-800"
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
    >
      <div
        style={{ maxWidth: 1100, margin: "0 auto", marginBottom: 64 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-16"
      >
        {/* Brand column */}
        <div>
          <img src={brand.logoWhite} alt={brand.name} style={{ height: 70, width: "auto" }} />
          <p className="text-white/80 text-[18px] mt-5 leading-relaxed max-w-[310px] font-normal">
            {f.description}
          </p>
          <div className="flex gap-[10px] mt-[22px]">
            {(f.social ?? []).map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-[9px] flex items-center justify-center text-[13px] font-extrabold no-underline transition-[background,color] duration-200 text-white bg-white/[12%]"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1980c2";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "";
                  e.currentTarget.style.color = "";
                }}
              >
                {SOCIAL_ICONS[s.label] ?? s.label[0]}
              </a>
            ))}
          </div>
        </div>

        {/* CMS-driven nav columns */}
        {cols.map((col) => (
          <div key={col.title}>
            <h5 className="text-[12.5px] tracking-[0.2em] uppercase mb-[22px] font-extrabold text-white/50">
              {col.title}
            </h5>
            {(col.links ?? []).map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={(e) => scrollTo(href, e)}
                className="block text-[16px] mb-[14px] no-underline font-medium leading-[1.3] text-white/80 transition-colors duration-200"
                onMouseEnter={(e) => (e.currentTarget.style.color = "#5ab8f5")}
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
        className="border-t border-white/10 pt-7 flex flex-wrap gap-3 justify-between items-center"
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
        <p className="text-[17px] text-white/65 font-medium">{f.copyright}</p>
      </div>
    </footer>
  );
}
