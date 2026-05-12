import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Public pages
import Home from './pages/Home'
import Packages from './pages/Packages'
import PackageDetails from './pages/PackageDetails'
import Booking from './pages/Booking'
import About from './pages/About'

// Admin
import Login from './pages/admin/Login'
import Admin from './pages/Admin'
import Groups from './pages/admin/Groups'
import Enquiries from './pages/admin/Enquiries'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/about" element={<About />} />

        {/* Admin auth */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin (protected) */}
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/admin/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
        <Route path="/admin/enquiries" element={<ProtectedRoute><Enquiries /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}
