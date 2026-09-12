import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Bibliotheque from './pages/Bibliotheque/Bibliotheque'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bibliotheque" element={<Bibliotheque />} />
      </Routes>
    </BrowserRouter>
  )
}
