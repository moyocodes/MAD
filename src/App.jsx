import { Routes, Route } from "react-router-dom";

import Homes from "./pages/Home1";
import Mich from "./components/home/Mich";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homes />} />
       <Route path="/m" element={<Mich />} />
    </Routes>
  );
}
