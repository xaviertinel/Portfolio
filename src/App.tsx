import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Bibliotheque from './pages/Bibliotheque/Bibliotheque'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bibliotheque" element={<Bibliotheque />} />
      </Routes>
    </BrowserRouter>
  )
}
