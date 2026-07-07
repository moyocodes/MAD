import { Routes, Route } from "react-router-dom";
import { CmsProvider } from "./context/CmsContext";
import { ThemeProvider } from "./context/ThemeContext";
// AdminBar / CmsPanel (in-browser CMS editor) are disabled for now — they
// persisted edits to localStorage, which silently shadowed homeCms.js and
// made file edits appear not to work. Edit src/data/homeCms.js directly.
// import AdminBar from "./components/cms/AdminBar";
// import CmsPanel from "./components/cms/CmsPanel";

import Homes from "./pages/Home1";
import Guard from "./pages/Guard";

export default function App() {
  return (
    <ThemeProvider>
      <CmsProvider>
        <Routes>
          <Route path="/" element={<Homes />} />
          <Route path="/guard" element={<Guard />} />
        </Routes>
      </CmsProvider>
    </ThemeProvider>
  );
}
