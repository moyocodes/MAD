export default function Footer() {
  return (
    <footer
      className="pt-[130px] px-4 sm:px-8 pb-9"
      style={{
        background: "#f7f7f5",
        borderTop: "1px solid rgba(24,24,23,.07)",
      }}
    >
      <div
        style={{ maxWidth: 1100, margin: "0 auto", marginBottom: 48 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12"
      >
        <div>
          <img src="/ma.png" alt="MAD" style={{ height: 130, width: "auto", opacity: 0.9 }} />
          <p
            className="text-dark-500/60"
            style={{ fontSize: 12, marginTop: 16, lineHeight: 1.72, maxWidth: 260 }}
          >
            Product, marketing, and design firm creating systems that help
            organizations grow stronger, operate better, and perform over time.
          </p>
        </div>
        {[
          ["Services", ["Product & Digital", "Marketing", "Brand & Design"]],
          ["Company", ["About", "Our Work", "Journal"]],
          ["Connect", ["LinkedIn", "Instagram", "hello@mad.co"]],
        ].map(([col, links]) => (
          <div key={col}>
            <h5
              className="text-dark-400/50"
              style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18, fontWeight: 700 }}
            >
              {col}
            </h5>
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className="text-dark-500/55"
                style={{ display: "block", fontSize: 12, marginBottom: 10, transition: "color .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#181817")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                {l}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(24,24,23,.07)",
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <p className="text-dark-400/40" style={{ fontSize: 11 }}>
          © 2025 MAD. All rights reserved.
        </p>
        <p className="text-dark-400/35 italic" style={{ fontSize: 11 }}>
          Structure changes everything.
        </p>
      </div>
    </footer>
  );
}
