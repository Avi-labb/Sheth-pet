import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Manufacturing from './pages/Manufacturing'
import Innovate from './pages/Innovate'
import Sustainability from './pages/Sustainability'
import About from './pages/About/About'
import Blog from './pages/Blog'
import Careers from './pages/Careers'
import Contact from './pages/Contact/Contact'
import AdminLogin from './pages/Admin/AdminLogin'
import Dashboard from './pages/Admin/Dashboard'
import BulkUpload from './pages/Admin/bulkupload'
import BlogManagement from './pages/Admin/BlogManagement'
import CareerManagement from './pages/Admin/CareerManagement'
import CategoryPage from './pages/Category/CategoryPage'
import Pharmaceutical from './pages/Category/Pharmaceutical'
import PersonalCare from './pages/Category/Personal Care'
import FoodBeverages from './pages/Category/Food & Beverages'
import HomeCare from './pages/Category/Home Care'
import Industrial from './pages/Category/Industrial'
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
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/bulk-upload" element={<BulkUpload />} />
          <Route path="/admin/blogs" element={<BlogManagement />} />
          <Route path="/admin/careers" element={<CareerManagement />} />
          {/* Backward compatible redirects */}
          <Route path="/dashboard" element={<Navigate replace to="/admin/dashboard" />} />
          <Route path="/bulk-upload" element={<Navigate replace to="/admin/bulk-upload" />} />
          
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
          <Route path="/pharmaceutical" element={
            <PublicLayout>
              <Pharmaceutical />
            </PublicLayout>
          } />
          <Route path="/personal-care" element={
            <PublicLayout>
              <PersonalCare />
            </PublicLayout>
          } />
          <Route path="/food-beverages" element={
            <PublicLayout>
              <FoodBeverages />
            </PublicLayout>
          } />
          <Route path="/home-care" element={
            <PublicLayout>
              <HomeCare />
            </PublicLayout>
          } />
          <Route path="/industrial" element={
            <PublicLayout>
              <Industrial />
            </PublicLayout>
          } />
          <Route path="/product/:productId" element={
            <PublicLayout>
              <ProductDetail />
            </PublicLayout>
          } />
          <Route path="/manufacturing" element={
            <PublicLayout>
              <Manufacturing />
            </PublicLayout>
          } />
          <Route path="/innovate" element={
            <PublicLayout>
              <Innovate />
            </PublicLayout>
          } />
          <Route path="/sustainability" element={
            <PublicLayout>
              <Sustainability />
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
