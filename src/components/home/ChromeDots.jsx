// ─── CHROME DOTS ──────────────────────────────────────────────────────────────
const ChromeDots = ({ scale = 1 }) => (
  <div className="flex items-center" style={{ gap: 4 * scale }}>
    {["#ff5f57", "#febc2e", "#28ca41"].map((c) => (
      <div
        key={c}
        style={{
          width: 6 * scale,
          height: 6 * scale,
          borderRadius: "50%",
          background: c,
          flexShrink: 0,
        }}
      />
    ))}
  </div>
);

export default ChromeDots;
