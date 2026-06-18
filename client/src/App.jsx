import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Products from './pages/Products'
import Manufacturing from './pages/Manufacturing'
import Industries from './pages/Industries'
import Sustainability from './pages/Sustainability'
import Clients from './pages/Clients'
import About from './pages/About/About'
import Blog from './pages/Blog'
import Careers from './pages/Careers'
import Contact from './pages/Contact/Contact'
import AdminLogin from './pages/Admin/AdminLogin'
import Dashboard from './pages/Admin/Dashboard'
import BulkUpload from './pages/Admin/bulkupload'
import CategoryPage from './pages/Category/CategoryPage'
import './App.css'

// Test comment for HMR

// Scroll to top component
function ScrollToTop() {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  
  return null
}

// Layout component
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <ScrollToTop />
        <Routes>
          {/* Admin Routes (no header/footer) */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bulk-upload" element={<BulkUpload />} />
          
          {/* Public Routes */}
          <Route path="/" element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          } />
          <Route path="/products" element={
            <PublicLayout>
              <Products />
            </PublicLayout>
          } />
          <Route path="/products/:categoryName" element={
            <PublicLayout>
              <CategoryPage />
            </PublicLayout>
          } />
          <Route path="/manufacturing" element={
            <PublicLayout>
              <Manufacturing />
            </PublicLayout>
          } />
          <Route path="/industries" element={
            <PublicLayout>
              <Industries />
            </PublicLayout>
          } />
          <Route path="/sustainability" element={
            <PublicLayout>
              <Sustainability />
            </PublicLayout>
          } />
          <Route path="/clients" element={
            <PublicLayout>
              <Clients />
            </PublicLayout>
          } />
          <Route path="/about" element={
            <PublicLayout>
              <About />
            </PublicLayout>
          } />
          <Route path="/blog" element={
            <PublicLayout>
              <Blog />
            </PublicLayout>
          } />
          <Route path="/careers" element={
            <PublicLayout>
              <Careers />
            </PublicLayout>
          } />
          <Route path="/contact" element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
