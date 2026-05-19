import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCms } from "@/context/CmsContext";

const SECTION_LABELS = {
  nav: "Navigation",
  hero: "Hero",
  whatWeDo: "What We Do",
  servicesInMotion: "Services in Motion",
  experience: "Experience",
  beyond: "Beyond",
  contact: "Contact",
  footer: "Footer",
};

// ── Primitives ────────────────────────────────────────────────────────────────

function Label({ children }) {
  return (
    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,69,123,.5)", marginBottom: 5 }}>
      {children}
    </p>
  );
}

const inputBase = {
  width: "100%", boxSizing: "border-box",
  border: "1px solid rgba(11,69,123,.18)", borderRadius: 8,
  padding: "9px 11px", fontSize: 12, color: "#0c1a2e",
  background: "#f8fbff", outline: "none", fontFamily: "inherit",
  transition: "border-color .15s",
};

function TextField({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <Label>{label}</Label>
      <input type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputBase} />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3, placeholder }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <Label>{label}</Label>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        style={{ ...inputBase, resize: "vertical" }}
      />
    </div>
  );
}

function ImageField({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <Label>{label}</Label>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://... or /local.png"
        style={{ ...inputBase, fontFamily: "monospace", fontSize: 10, marginBottom: 6 }}
      />
      {value && (
        <img
          src={value}
          alt=""
          style={{ width: "100%", height: 88, objectFit: "cover", borderRadius: 7, border: "1px solid rgba(11,69,123,.12)", background: "#e8f2fd" }}
        />
      )}
    </div>
  );
}

function Divider() {
  return <div style={{ borderTop: "1px solid rgba(11,69,123,.1)", margin: "4px 0 16px" }} />;
}

function Tabs({ tabs, active, onSelect }) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
      {tabs.map((t, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{
            padding: "5px 11px", borderRadius: 7, border: "none", cursor: "pointer",
            background: active === i ? "#0b457b" : "rgba(11,69,123,.08)",
            color: active === i ? "#fff" : "rgba(11,69,123,.6)",
            fontSize: 10, fontWeight: 700,
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// ── Section forms ─────────────────────────────────────────────────────────────

function NavForm({ cmsData, updateCms }) {
  const b = cmsData.brand;
  const n = cmsData.nav;
  return (
    <>
      <ImageField label="Logo" value={b.logo} onChange={(v) => updateCms("brand.logo", v)} />
      <TextField label="Brand Name" value={b.name} onChange={(v) => updateCms("brand.name", v)} />
      <TextField label="Email" value={b.email} onChange={(v) => updateCms("brand.email", v)} />
      <Divider />
      <Label>Nav Links</Label>
      {(n.links ?? []).map((link, i) => (
        <input
          key={i}
          type="text"
          value={link}
          onChange={(e) => {
            const next = [...n.links];
            next[i] = e.target.value;
            updateCms("nav.links", next);
          }}
          style={{ ...inputBase, marginBottom: 6 }}
        />
      ))}
      <div style={{ marginBottom: 14 }} />
      <TextField label="CTA Button Text" value={n.cta} onChange={(v) => updateCms("nav.cta", v)} />
    </>
  );
}

function HeroForm({ cmsData, updateCms }) {
  const [tab, setTab] = useState(0);
  const h = cmsData.hero;
  const TABS = ["Slide 1", "Slide 2", "Slide 3", "Thumbs", "General"];

  if (tab < 3) {
    const s = h.slides[tab];
    const base = `hero.slides.${tab}`;
    return (
      <>
        <Tabs tabs={TABS} active={tab} onSelect={setTab} />
        <ImageField label="Left Image" value={s.left} onChange={(v) => updateCms(`${base}.left`, v)} />
        <ImageField label="Right Image" value={s.right} onChange={(v) => updateCms(`${base}.right`, v)} />
        <ImageField label="Card Image" value={s.cardImg} onChange={(v) => updateCms(`${base}.cardImg`, v)} />
        <TextField label="Card Label" value={s.card} onChange={(v) => updateCms(`${base}.card`, v)} />
        <TextArea label="Heading (\\n = line break)" value={s.h1} onChange={(v) => updateCms(`${base}.h1`, v)} rows={2} />
        <TextField label="Subtext" value={s.sub} onChange={(v) => updateCms(`${base}.sub`, v)} />
      </>
    );
  }

  if (tab === 3) {
    return (
      <>
        <Tabs tabs={TABS} active={tab} onSelect={setTab} />
        {(h.thumbs ?? []).map((t, i) => (
          <ImageField
            key={i}
            label={`Thumb ${i + 1}`}
            value={t.src}
            onChange={(v) => {
              const next = h.thumbs.map((th, j) => j === i ? { ...th, src: v } : th);
              updateCms("hero.thumbs", next);
            }}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <Tabs tabs={TABS} active={tab} onSelect={setTab} />
      <TextField label="CTA Button" value={h.cta} onChange={(v) => updateCms("hero.cta", v)} />
      <div style={{ marginBottom: 14 }}>
        <Label>Notifications (one per line)</Label>
        <textarea
          value={(h.notifications ?? []).join("\n")}
          onChange={(e) => updateCms("hero.notifications", e.target.value.split("\n"))}
          rows={5}
          style={{ ...inputBase, resize: "vertical", fontFamily: "monospace", fontSize: 10 }}
        />
      </div>
    </>
  );
}

function WhatWeDoForm({ cmsData, updateCms }) {
  const [tab, setTab] = useState(0);
  const w = cmsData.whatWeDo;
  const TABS = ["General", "Service 1", "Service 2", "Service 3"];

  if (tab === 0) {
    return (
      <>
        <Tabs tabs={TABS} active={tab} onSelect={setTab} />
        <TextField label="Eyebrow" value={w.eyebrow} onChange={(v) => updateCms("whatWeDo.eyebrow", v)} />
        <TextArea label="Headline" value={w.headline} onChange={(v) => updateCms("whatWeDo.headline", v)} rows={2} />
        <TextArea label="Body" value={w.body} onChange={(v) => updateCms("whatWeDo.body", v)} rows={3} />
        <TextField label="CTA" value={w.cta} onChange={(v) => updateCms("whatWeDo.cta", v)} />
      </>
    );
  }

  const idx = tab - 1;
  const s = w.services[idx];
  const base = `whatWeDo.services.${idx}`;
  return (
    <>
      <Tabs tabs={TABS} active={tab} onSelect={setTab} />
      <TextField label="Label" value={s.label} onChange={(v) => updateCms(`${base}.label`, v)} />
      <TextArea label="Tagline" value={s.tagline} onChange={(v) => updateCms(`${base}.tagline`, v)} rows={2} />
      <ImageField label="Wide Image" value={s.wide} onChange={(v) => updateCms(`${base}.wide`, v)} />
      <ImageField label="Top Image" value={s.top} onChange={(v) => updateCms(`${base}.top`, v)} />
    </>
  );
}

function ServicesInMotionForm({ cmsData, updateCms }) {
  const [tab, setTab] = useState(0);
  const s = cmsData.servicesInMotion;
  const cards = s.cards ?? [];
  const stageImgs = s.stageImages ?? {};
  const cardTabs = cards.map((_, i) => `Card ${i + 1}`);
  const TABS = ["General", ...cardTabs, "Stage Images"];

  if (tab === 0) {
    return (
      <>
        <Tabs tabs={TABS} active={tab} onSelect={setTab} />
        <TextField label="Eyebrow" value={s.eyebrow} onChange={(v) => updateCms("servicesInMotion.eyebrow", v)} />
        <TextField label="Title" value={s.title} onChange={(v) => updateCms("servicesInMotion.title", v)} />
      </>
    );
  }

  if (tab === TABS.length - 1) {
    const keys = Object.keys(stageImgs);
    return (
      <>
        <Tabs tabs={TABS} active={tab} onSelect={setTab} />
        <p style={{ fontSize: 11, color: "rgba(11,69,123,.4)", marginBottom: 14, lineHeight: 1.5 }}>
          These are the final "showcase" images displayed in stage 3 of each service card.
        </p>
        {keys.map((key) => (
          <ImageField
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={stageImgs[key]}
            onChange={(v) => updateCms(`servicesInMotion.stageImages.${key}`, v)}
          />
        ))}
      </>
    );
  }

  const cIdx = tab - 1;
  const card = cards[cIdx] ?? {};
  const base = `servicesInMotion.cards.${cIdx}`;
  return (
    <>
      <Tabs tabs={TABS} active={tab} onSelect={setTab} />
      <TextField label="Title" value={card.title} onChange={(v) => updateCms(`${base}.title`, v)} />
      <TextArea label="Subtitle" value={card.sub} onChange={(v) => updateCms(`${base}.sub`, v)} rows={2} />
    </>
  );
}

function ExperienceForm({ cmsData, updateCms }) {
  const e = cmsData.experience;
  return (
    <>
      <TextArea label="Kicker" value={e.kicker} onChange={(v) => updateCms("experience.kicker", v)} rows={2} />
      <TextArea label="Intro Paragraph" value={e.intro} onChange={(v) => updateCms("experience.intro", v)} rows={4} />
      <TextField label="CTA Button" value={e.cta} onChange={(v) => updateCms("experience.cta", v)} />
      <TextField label="Badge Text" value={e.badge} onChange={(v) => updateCms("experience.badge", v)} />
      <Divider />
      <ImageField label="Screen / Dashboard Image" value={e.screenImage} onChange={(v) => updateCms("experience.screenImage", v)} />
    </>
  );
}

function BeyondForm({ cmsData, updateCms }) {
  const b = cmsData.beyond;
  return (
    <>
      <TextField label="Eyebrow" value={b.eyebrow} onChange={(v) => updateCms("beyond.eyebrow", v)} />
      <TextArea label="Title (\\n = line break)" value={b.title} onChange={(v) => updateCms("beyond.title", v)} rows={3} />
      <TextArea label="Body" value={b.body} onChange={(v) => updateCms("beyond.body", v)} rows={3} />
      <TextField label="Emphasis Line" value={b.emphasis} onChange={(v) => updateCms("beyond.emphasis", v)} />
      <TextField label="Primary CTA" value={b.primaryCta} onChange={(v) => updateCms("beyond.primaryCta", v)} />
    </>
  );
}

function ContactForm({ cmsData, updateCms }) {
  const c = cmsData.contact;
  return (
    <>
      <TextArea label="Title (\\n = line break)" value={c.title} onChange={(v) => updateCms("contact.title", v)} rows={2} />
      <TextArea label="Body" value={c.body} onChange={(v) => updateCms("contact.body", v)} rows={3} />
      <TextField label="Submit Button" value={c.submit} onChange={(v) => updateCms("contact.submit", v)} />
    </>
  );
}

function FooterForm({ cmsData, updateCms }) {
  const f = cmsData.footer;
  return (
    <>
      <TextArea label="Description" value={f.description} onChange={(v) => updateCms("footer.description", v)} rows={3} />
      <TextField label="Copyright" value={f.copyright} onChange={(v) => updateCms("footer.copyright", v)} />
    </>
  );
}

const FORM_MAP = {
  nav: NavForm,
  hero: HeroForm,
  whatWeDo: WhatWeDoForm,
  servicesInMotion: ServicesInMotionForm,
  experience: ExperienceForm,
  beyond: BeyondForm,
  contact: ContactForm,
  footer: FooterForm,
};

// ── Main panel ────────────────────────────────────────────────────────────────

export default function CmsPanel() {
  const { cmsData, updateCms, activePanel, closePanel } = useCms();
  const Form = activePanel ? FORM_MAP[activePanel] : null;

  return (
    <AnimatePresence>
      {activePanel && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closePanel}
            style={{ position: "fixed", inset: 0, background: "rgba(4,10,22,1)", zIndex: 9990 }}
          />
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0, width: 380,
              background: "#f4f8fc",
              borderLeft: "1px solid rgba(11,69,123,.13)",
              zIndex: 9991, display: "flex", flexDirection: "column",
              boxShadow: "-20px 0 60px rgba(0,0,0,.14)",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "18px 20px", borderBottom: "1px solid rgba(11,69,123,.1)",
              background: "#fff", display: "flex", alignItems: "center",
              justifyContent: "space-between", flexShrink: 0,
            }}>
              <div>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(11,69,123,.4)", marginBottom: 3 }}>
                  Editing Section
                </p>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0c1a2e", margin: 0 }}>
                  {SECTION_LABELS[activePanel] ?? activePanel}
                </h3>
              </div>
              <button
                onClick={closePanel}
                style={{
                  width: 32, height: 32, border: "1px solid rgba(11,69,123,.18)",
                  borderRadius: 8, background: "transparent",
                  color: "rgba(11,69,123,.55)", fontSize: 18,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            {/* Scrollable form body */}
            <div style={{ flex: 1, overflowY: "auto", padding: 20, scrollbarWidth: "thin" }}>
              {Form && <Form cmsData={cmsData} updateCms={updateCms} />}
            </div>

            {/* Footer note */}
            <div style={{
              padding: "12px 20px", borderTop: "1px solid rgba(11,69,123,.1)",
              background: "#fff", flexShrink: 0,
            }}>
              <p style={{ fontSize: 9, color: "rgba(11,69,123,.35)", textAlign: "center", margin: 0 }}>
                Changes save automatically to local storage
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
