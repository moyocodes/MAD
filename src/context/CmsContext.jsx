import { createContext, useContext, useState, useCallback } from "react";
import { homeCms } from "@/data/homeCms";

const STORAGE_KEY = "mad_cms_v1";
const CmsContext = createContext(null);

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
  const [cmsData, setCmsData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return homeCms;
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [activePanel, setActivePanel] = useState(null);

  const updateCms = useCallback((path, value) => {
    setCmsData((prev) => {
      const next = setNestedValue(prev, path, value);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const resetCms = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
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
