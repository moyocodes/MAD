import React from "react";

// ─── THEME CONTEXT ────────────────────────────────────────────────────────────
export const ThemeCtx = React.createContext({ dark: false, toggle: () => {} });
export function useTheme() {
  return React.useContext(ThemeCtx);
}
