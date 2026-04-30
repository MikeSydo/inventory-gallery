import { Navigate, Route, Routes } from 'react-router-dom'
import AdminInventoryCreatePage from './pages/AdminInventoryCreatePage'
import AdminInventoryDetailsPage from './pages/AdminInventoryDetailsPage'
import AdminInventoryEditPage from './pages/AdminInventoryEditPage'
import AdminInventoryPage from './pages/AdminInventoryPage'
import GalleryPage from './pages/GalleryPage'
import './styles/admin.css'
import './styles/gallery.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<GalleryPage />} />
      <Route path="/admin/inventory" element={<AdminInventoryPage />} />
      <Route path="/admin/inventory/create" element={<AdminInventoryCreatePage />} />
      <Route path="/admin/inventory/:id/edit" element={<AdminInventoryEditPage />} />
      <Route path="/admin/inventory/:id" element={<AdminInventoryDetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
