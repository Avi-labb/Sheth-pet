import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react'
import { productAPI } from '../../services/api'
import logo from '../../assets/images/radhe-logo.png'

const navItems = [
  { name: 'Manufacturing', path: '/manufacturing' },
  { name: 'Innovate', path: '/innovate' },
  { name: 'Sustainability', path: '/sustainability' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Careers', path: '/careers' },
]

const functionCategories = [
  { name: "Pharmaceutical", path: "/pharmaceutical" },
  { name: "Personal Care", path: "/personal-care" },
  { name: "Food & Beverages", path: "/food-beverages" },
  { name: "Home Care", path: "/home-care" },
  { name: "Industrial", path: "/industrial" },
]

const typeCategories = [
  { name: "Bottles", path: "/products/Bottles" },
  { name: "Jars", path: "/products/Jars" },
  { name: "Preforms", path: "/products/Preforms" },
  { name: "Caps", path: "/products/Caps" },
]

const HideScrollbar = () => {
  return (
    <style>{`
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
  )
}

const Header = ({ onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showProductsMenu, setShowProductsMenu] = useState(false)
  const [showByType, setShowByType] = useState(false)
  const [showByIndustry, setShowByIndustry] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const goTo = (path) => {
    setShowDropdown(false)
    setIsOpen(false)
    setShowProductsMenu(false)
    setShowByType(false)
    setShowByIndustry(false)
    navigate(path)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await productAPI.getCategories()
        console.log("Categories API result:", result)
      } catch (error) {
        console.error("Error fetching categories", error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <>
      <nav
        className="fixed py-4 top-0 left-0 right-0 z-50 font-sans border-b transition-all duration-500 backdrop-blur-xl h-16 sm:h-18 shadow-lg bg-white/80 border-slate-200 shadow-gray-200/20"
      >
      <div className="max-w-8xl mx-auto px-3 sm:px-5 md:px-10 h-full flex items-center justify-between">

        {/* Brand Logo Wrapper (Left Aligned) */}
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault()
            if (onCategorySelect) {
              onCategorySelect(null)
            }
            window.location.href = '/'
          }}
          className="flex items-center gap-2 sm:gap-3 group focus:outline-none z-50"
        >
          <div className="w-10 h-10 sm:w-22 sm:h-15 shrink-0 transition-transform duration-300 group-hover:scale-105">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col items-start sm:flex-row sm:items-center gap-0.5 sm:gap-2 leading-tight">
            <span className="text-base sm:text-lg font-bold tracking-wider text-slate-900">
              SHETH
            </span>
            <span className="text-[10px] sm:text-sm font-medium uppercase tracking-wider text-slate-600">
              PET & POLYMERS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Link Array (Centered) */}
        <div className="hidden lg:flex items-center gap-1 h-full">
          {/* Products Mega Menu */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button
              className="relative px-3 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 rounded-lg group flex items-center gap-1 text-slate-700 hover:text-slate-900"
            >
              <span className="relative uppercase z-10">Products</span>
              <ChevronDown
                size={14}
                className="transition-transform duration-300 group-hover:rotate-180"
              />
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4
                             rounded-2xl shadow-2xl
                             min-w-[500px] overflow-hidden bg-white/10 border border-slate-200"
                ><div
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-xl border overflow-hidden transition-all duration-300 bg-white border-slate-100 text-slate-600"
                >
                    {/* Categories Grid Container */}
                    <div className="grid grid-cols-2 gap-x-12 gap-y-2 p-8">

                      {/* Column 1: By Industry */}
                      <div className="flex flex-col">
                        <h3 className="font-bold text-xl tracking-tight mb-5 border-b pb-3 text-slate-900 border-slate-100">
                          By Industry
                        </h3>

                        <div className="flex flex-col gap-2">
                          {functionCategories.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              onClick={(e) => {
                                e.preventDefault()
                                goTo(item.path)
                              }}
                              className="transition-colors duration-200 py-1 text-[15px] font-medium text-slate-700 hover:text-slate-900"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: By Type */}
                      <div className="flex flex-col">
                        <h3 className="font-bold text-xl tracking-tight mb-5 border-b pb-3 text-slate-900 border-slate-100">
                          By Type
                        </h3>

                        <div className="flex flex-col gap-3">
                          {typeCategories.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              onClick={(e) => {
                                e.preventDefault()
                                goTo(item.path)
                              }}
                              className="transition-colors duration-200 py-1 text-[15px] font-medium text-slate-700 hover:text-slate-900"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Dropdown Footer: View All Products */}
                    <div
                      className="border-t py-4 text-center transition-colors duration-200 bg-slate-100 border-slate-100 hover:bg-slate-200/20 cursor-pointer"
                      onClick={() => goTo('/products')}
                    >
                      <span className="block text-center font-medium transition-colors text-slate-900 hover:text-slate-700">
                        View All Products →
                      </span>
                    </div>
                  </div>
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
                className="relative px-3 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 rounded-lg group text-slate-700 hover:text-slate-900"
              >
                <span className="relative uppercase z-10">{item.name}</span>

                {/* Active Link Highlight Capsule */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabCapsule"
                    className="absolute inset-0 border rounded-lg z-0 bg-slate-900/10 border-slate-900/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover Indicator Line */}
                {!isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center bg-slate-900" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Right side: Theme toggle + Enquire CTA */}
        <div className="hidden lg:flex items-center gap-4">
         
          {/* Enquire CTA Button */}
          <Link
            to="/contact"
            className="px-6 py-2.5 text-xs font-semibold tracking-widest text-white uppercase border border-teal-600 rounded-full bg-teal-600 hover:bg-teal-700 hover:text-white transition-all duration-300 shadow-md"
          >
            Enquire
          </Link>
        </div>

        {/* Mobile Toggle Trigger Button + Theme Toggle (mobile) */}
        <div className="flex items-center gap-2 lg:hidden">
          
          <button
            className="relative z-50 p-2 rounded-full transition-all duration-200 border bg-slate-100 border-slate-200 text-slate-900 hover:bg-slate-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 top-0 left-0 w-full h-screen backdrop-blur-lg lg:hidden z-40 bg-slate-900/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-xs border-l shadow-2xl flex flex-col pt-12 pb-8 px-4 gap-2 overflow-y-auto max-h-screen no-scrollbar bg-white border-slate-200"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Products Section */}
              <div className="border-b pb-3 mb-2 border-slate-200">
                <button
                  onClick={() => setShowProductsMenu(!showProductsMenu)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide text-slate-900"
                >
                  All Products
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${showProductsMenu ? 'rotate-180' : ''} text-slate-400`}
                  />
                </button>

                <AnimatePresence>
                  {showProductsMenu && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pl-4"
                    >
                      {/* By Type Toggle */}
                      <div className="mb-2">
                        <button
                          onClick={() => setShowByType(!showByType)}
                          className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide text-slate-900"
                        >
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">By Type</span>
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-300 ${showByType ? 'rotate-180' : ''} text-slate-400`}
                          />
                        </button>
                        <AnimatePresence>
                          {showByType && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              {typeCategories.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    goTo(item.path)
                                  }}
                                  className="flex items-center justify-between w-full px-4 py-2 pl-2 rounded-xl text-sm font-medium tracking-wide transition-colors text-slate-600 hover:text-slate-900"
                                >
                                  {item.name}
                                  <ChevronRight size={14} className="text-slate-400" />
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* By Industry Toggle */}
                      <div className="mb-2">
                        <button
                          onClick={() => setShowByIndustry(!showByIndustry)}
                          className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide text-slate-900"
                        >
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">By Industry</span>
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-300 ${showByIndustry ? 'rotate-180' : ''} text-slate-400`}
                          />
                        </button>
                        <AnimatePresence>
                          {showByIndustry && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              {functionCategories.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    goTo(item.path)
                                  }}
                                  className="flex items-center justify-between w-full px-4 py-2 pl-2 rounded-xl text-sm font-medium tracking-wide transition-colors text-slate-600 hover:text-slate-900"
                                >
                                  {item.name}
                                  <ChevronRight size={14} className="text-slate-400" />
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* View All Products Link */}
                      <div
                        onClick={() => goTo('/products')}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-colors text-teal-600 hover:text-teal-700 cursor-pointer"
                      >
                        View All Products →
                      </div>
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
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200
                      ${isActive
                        ? 'text-slate-900 bg-slate-100 border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.name}</span>
                    <ChevronRight size={14} className={isActive ? 'text-slate-900' : 'text-slate-400'} />
                  </Link>
                )
              })}

              {/* Mobile Enquire CTA placement */}
              <div className="mt-auto pt-6 border-t border-slate-200">
                <Link
                  to="/contact"
                  className="flex items-center justify-center w-full py-3 text-xs font-bold uppercase tracking-widest text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors"
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
      <HideScrollbar />
    </>
  )
}

export default Header
