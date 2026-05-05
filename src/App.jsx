import { Routes, Route } from "react-router-dom";

import Homes from "./pages/Homes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homes />} />
    </Routes>
  );
}
