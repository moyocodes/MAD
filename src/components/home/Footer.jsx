import { motion } from "framer-motion";
import { useCms } from "@/context/CmsContext";

export default function Footer() {
  const { cmsData, isEditMode, openPanel } = useCms();
  const f = cmsData.footer;
  return (
    <footer className="pt-16 sm:pt-20 px-4 sm:px-8 pb-14 bg-dark-100/20 relative">
      <motion.div
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        style={{ maxWidth: 1100, margin: "0 auto", marginBottom: 64 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16"
      >
        {/* Brand column */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          <img
            src="/ma.png"
            alt="MAD"
            style={{ height: 130, width: "auto", opacity: 0.9 }}
          />
          <p
            style={{
              fontSize: 15,
              marginTop: 20,
              lineHeight: 1.8,
              maxWidth: 260,
              color: "rgba(15,42,69,.55)",
              fontWeight: 400,
            }}
          >
            {f.description}
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
            {[<i class="fa fa-instagram" aria-hidden="true"></i>, <i class="fa fa-twitter" aria-hidden="true"></i>, <i class="fa fa-linkedin" aria-hidden="true"></i>].map((s, index) => (
              <a
                key={index}
                href="#"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: "rgba(25,128,194,.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 800,
                  color: "rgba(25,128,194,.55)",
                  textDecoration: "none",
                  transition: "background .2s, color .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1980c2";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(25,128,194,.08)";
                  e.currentTarget.style.color = "rgba(25,128,194,.55)";
                }}
              >
                {s}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Nav columns */}
        {[
          [
            "Services",
            [
              ["Product & Digital", "#"],
              ["Marketing & Comms", "#"],
              ["Brand & Design", "#"],
            ],
          ],
          [
            "Company",
            [
              ["About MAD", "#"],
              ["Our Work", "#"],
              ["Journal", "#"],
              ["Careers", "#"],
            ],
          ],
          [
            "Get In Touch",
            [
              ["LinkedIn", "#"],
              ["Instagram", "#"],
              ["hello@mad.studio", "mailto:hello@mad.studio"],
            ],
          ],
        ].map(([col, links]) => (
          <motion.div
            key={col}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            <h5
              style={{
                fontSize: 10.5,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 22,
                fontWeight: 800,
                color: "rgba(25,128,194,.5)",
              }}
            >
              {col}
            </h5>
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{
                  display: "block",
                  fontSize: 16,
                  marginBottom: 14,
                  transition: "color .2s",
                  color: "rgba(15,42,69,.5)",
                  textDecoration: "none",
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1980c2")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(15,42,69,.5)")
                }
              >
                {label}
              </a>
            ))}
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(25,128,194,.1)",
          paddingTop: 28,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {isEditMode && (
          <button onClick={() => openPanel("footer")} style={{ background: "#0b457b", color: "#fff", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 9, fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", cursor: "pointer" }}>
            ✏ Edit Footer
          </button>
        )}
        <p
          style={{ fontSize: 14, color: "rgba(15,42,69,.38)", fontWeight: 500 }}
        >
          {f.copyright}
        </p>
        {/* <p style={{ fontSize: 14, color: "rgba(25,128,194,.45)", fontStyle: "italic", fontWeight: 500 }}>
          Structure changes everything.
        </p> */}
      </div>
    </footer>
  );
}
