export default function Beyond() {
  return (
    <section
      style={{
        padding: "48px 24px",
        background:
          "linear-gradient(180deg, #fdeee2 0%, #eef4fa 45%, #b3d8f5 75%, #1980c2 100%)",
      }}
    >
      <div
        className="flex flex-col sm:flex-row"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          borderRadius: 0,
          background: "transparent",
          overflow: "hidden",
          alignItems: "stretch",
          minHeight: 300,
          position: "relative",
        }}
      >
        {/* Image — top on mobile, right on sm+ */}
        <div
          className="order-1 sm:order-2 w-full sm:w-[clamp(200px,32%,380px)] h-48 sm:h-auto"
          style={{ flexShrink: 0, position: "relative", overflow: "hidden" }}
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
              objectPosition: "center top",
            }}
          />
        </div>

        {/* Text — below image on mobile, left on sm+ */}
        <div
          className="order-2 sm:order-1"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(28px,4vw,48px) clamp(24px,4vw,56px)",
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
            Unlock MAD's team of expert designers, developers and strategists —
            and get exclusive access to our full service offering.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
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
      </div>
    </section>
  );
}
