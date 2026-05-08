export default function Beyond() {
  return (
    <section className="bg-white" style={{ padding: "48px 24px" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          borderRadius: 12,
          background: "#e8e8e4",
          overflow: "hidden",
          display: "flex",
          alignItems: "stretch",
          minHeight: 300,
          position: "relative",
        }}
      >
        {/* Text content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 48px 48px 56px",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(20px,2.4vw,30px)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: -0.3,
              color: "#181817",
              marginBottom: 12,
            }}
          >
            Not sure where to start?
          </h2>
          <p
            style={{
              fontSize: "clamp(13px,1.4vw,15px)",
              color: "#555",
              lineHeight: 1.65,
              marginBottom: 28,
              maxWidth: 400,
            }}
          >
            Unlock MAD's team of expert designers, developers and strategists — and get exclusive access to our full service offering.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button
              style={{
                background: "#181817",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "11px 26px",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.02em",
                cursor: "pointer",
              }}
            >
              Start a Project →
            </button>
            <button
              style={{
                background: "#fff",
                color: "#181817",
                border: "1.5px solid rgba(24,24,23,.18)",
                borderRadius: 6,
                padding: "11px 26px",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.02em",
                cursor: "pointer",
              }}
            >
              View Our Work
            </button>
          </div>
        </div>

        {/* Image flush right */}
        <div
          className="hidden sm:block"
          style={{
            width: "clamp(200px,32%,380px)",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      </div>
    </section>
  );
}
