import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCms } from "../context/CmsContext";

export default function Guard() {
  const { isEditMode } = useCms();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode) {
      const t = setTimeout(() => navigate("/"), 800);
      return () => clearTimeout(t);
    }
  }, [isEditMode, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b1e35 0%, #0f3460 60%, #1a5276 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        color: "#fff",
        padding: 32,
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: 420,
        }}
      >
        <img
          src="/mawhit.png"
          alt="MAD"
          style={{ height: 64, width: "auto", marginBottom: 40, opacity: 0.9 }}
        />

        {isEditMode ? (
          <>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(74,222,128,.12)",
                border: "1px solid rgba(74,222,128,.3)",
                borderRadius: 99,
                padding: "8px 18px",
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 8px #4ade80",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#4ade80" }}>
                Unlocked
              </span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>
              Taking you to the editor…
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.4)", lineHeight: 1.7 }}>
              Scroll to any section and tap the blue edit button that appears bottom-left.
            </p>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>
              Admin Access
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.7, marginBottom: 36 }}>
              Use the button below to unlock content editing across all pages.
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.3)", letterSpacing: ".06em" }}>
              Click the 🔐 Admin button in the corner to continue.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
