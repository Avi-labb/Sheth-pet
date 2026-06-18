import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react'
import { productAPI } from '../../services/api'
import logo from '../../assets/images/radhe-logo.png'

const navItems = [
  { name: 'Manufacturing', path: '/manufacturing' },
  { name: 'Industries', path: '/industries' },
  { name: 'Sustainability', path: '/sustainability' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Careers', path: '/careers' },
]

const Header = ({ onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [categories, setCategories] = useState(['Bottles', 'Jars', 'Caps', 'Containers'])
  const location = useLocation()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await productAPI.getCategories()
        console.log("Categories API result:", result)
        if (result.ok && result.data.categories) {
          setCategories(result.data.categories)
        }
      } catch (error) {
        console.error("Error fetching categories", error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <nav
      className={'fixed py-10 top-0 left-0 right-0 z-50 font-sans border-b transition-all duration-500 bg-slate-950/80 backdrop-blur-md border-slate-800/60 h-16 shadow-lg shadow-black/20' 
        }
    >
      <div className="max-w-8xl mx-auto px-5 sm:px-10 h-full flex items-center justify-between">
        
        {/* Brand Logo Wrapper (Left Aligned) */}
        <Link 
          to="/" 
          onClick={() => onCategorySelect && onCategorySelect(null)}
          className="flex items-center gap-3 group focus:outline-none z-50"
        >
          <div className="w-25 h-25 shrink-0 transition-transform duration-300 group-hover:scale-105">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-contain" 
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-lg tracking-wider text-white">SHETH</span>
            <span className="text-[9px] font-medium tracking-[0.2em] text-slate-300 uppercase">Pet & Polymers</span>
          </div>
        </Link>

        {/* Desktop Navigation Link Array (Centered) */}
        <div className="hidden lg:flex items-center gap-1 h-full">
          {/* Products Dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button
              className={`relative px-3 py-2 text-[13px] font-medium tracking-wide text-slate-200 transition-colors duration-300 rounded-lg hover:text-white group flex items-center gap-1`}
            >
              <span className="relative uppercase z-10">Products</span>
              <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl py-3 min-w-[200px]"
                >
                  <Link
                    to="/products"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-900/50 transition-colors"
                  >
                    All Products
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/products/${encodeURIComponent(category.toLowerCase())}`}
                      onClick={() => {
                        setShowDropdown(false)
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-900/50 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 text-[13px] font-medium tracking-wide text-slate-200 transition-colors duration-300 rounded-lg hover:text-white group`}
              >
                <span className="relative uppercase z-10">{item.name}</span>
                
                {/* Active Link Highlight Capsule */}
                {isActive && (
                  <motion.div 
                    layoutId="activeTabCapsule"
                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-lg z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Hover Indicator Line */}
                {!isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Right Action Enquire CTA Button */}
        <div className="hidden lg:flex items-center">
          <Link
            to="/contact"
            className="px-6 py-2.5 text-xs font-semibold tracking-widest text-white uppercase border border-white/30 rounded-full bg-white/5 hover:bg-white hover:text-slate-950 hover:border-white transition-all duration-300 shadow-inner"
          >
            Enquire
          </Link>
        </div>

        {/* Mobile Toggle Trigger Button */}
        <button
          className="lg:hidden relative z-50 p-2 rounded-full border-0 bg-white/5 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition-colors focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-slate-950/60 backdrop-blur-lg lg:hidden z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-xs bg-slate-950/95 border-l border-slate-800/80 shadow-2xl flex flex-col pt-24 pb-8 px-6 gap-2"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()} 
            >
              {/* Products Section */}
              <div className="border-b border-slate-900 pb-3 mb-2">
                <Link
                  to="/products"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide text-white"
                >
                  All Products
                  <ChevronRight size={14} className="text-slate-600" />
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/products/${encodeURIComponent(category.toLowerCase())}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between w-full px-4 py-2 pl-8 rounded-xl text-sm font-medium tracking-wide text-slate-400 hover:text-white"
                  >
                    {category}
                    <ChevronRight size={14} className="text-slate-600" />
                  </Link>
                ))}
              </div>

              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200
                      ${isActive 
                        ? 'text-white bg-white/10 border border-white/10' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.name}</span>
                    <ChevronRight size={14} className={isActive ? 'text-white' : 'text-slate-600'} />
                  </Link>
                )
              })}

              {/* Mobile Enquire CTA placement */}
              <div className="mt-auto pt-6 border-t border-slate-900">
                <Link
                  to="/contact"
                  className="flex items-center justify-center w-full py-3 text-xs font-bold uppercase tracking-widest text-slate-950 bg-white rounded-xl hover:bg-slate-200 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Enquire
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Header