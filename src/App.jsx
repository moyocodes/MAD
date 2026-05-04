import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Homes from './components/Homes'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homes />} />
      <Route path="/homes" element={<Home />} />
    </Routes>
  )
}