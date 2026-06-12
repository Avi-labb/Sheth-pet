import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Products from './pages/Products'
import Manufacturing from './pages/Manufacturing'
import Industries from './pages/Industries'
import Sustainability from './pages/Sustainability'
import Clients from './pages/Clients'
import About from './pages/About/About'
import Insights from './pages/Insights'
import Careers from './pages/Careers'
import Contact from './pages/Contact/Contact'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import './App.css'

// Test comment for HMR

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Admin Routes (no header/footer) */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Public Routes */}
          <Route path="/" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Home />
              </main>
              <Footer />
            </div>
          } />
          <Route path="*" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/products" element={<Products />} />
                  <Route path="/manufacturing" element={<Manufacturing />} />
                  <Route path="/industries" element={<Industries />} />
                  <Route path="/sustainability" element={<Sustainability />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
