import { createContext, useContext, useState, useCallback } from "react";
import { homeCms } from "@/data/homeCms";

// The in-browser CMS editor (AdminBar/CmsPanel) is disabled for now — see
// App.jsx. localStorage persistence is intentionally not used here: it used
// to let saved edits silently shadow homeCms.js, so file edits stopped
// showing up. homeCms.js is now always the single source of truth.
const CmsContext = createContext(null);

// One-time cleanup: purge old snapshots from browsers that already saved
// them, so no stale copy of the content lingers around.
try {
  localStorage.removeItem("mad_cms_v2");
  localStorage.removeItem("mad_edit_mode");
} catch {}

function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  const result = JSON.parse(JSON.stringify(obj));
  let cur = result;
  for (let i = 0; i < keys.length - 1; i++) {
    if (cur[keys[i]] == null || typeof cur[keys[i]] !== "object") cur[keys[i]] = {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
  return result;
}

export function CmsProvider({ children }) {
  const [cmsData, setCmsData] = useState(homeCms);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activePanel, setActivePanel] = useState(null);

  const updateCms = useCallback((path, value) => {
    setCmsData((prev) => setNestedValue(prev, path, value));
  }, []);

  const resetCms = useCallback(() => {
    setCmsData(homeCms);
  }, []);

  const openPanel = useCallback((section) => setActivePanel(section), []);
  const closePanel = useCallback(() => setActivePanel(null), []);

  return (
    <CmsContext.Provider value={{
      cmsData, isEditMode, setIsEditMode,
      updateCms, resetCms,
      activePanel, openPanel, closePanel,
    }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    return {
      cmsData: homeCms, isEditMode: false,
      setIsEditMode: () => {}, updateCms: () => {}, resetCms: () => {},
      activePanel: null, openPanel: () => {}, closePanel: () => {},
    };
  }
  return ctx;
}
