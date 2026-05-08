import { Routes, Route } from "react-router-dom";

import Homes from "./pages/Home1";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homes />} />

    </Routes>
  );
}
