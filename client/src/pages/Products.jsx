import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, ChevronRight, Filter, ArrowUpRight } from 'lucide-react'
import { productAPI } from '../services/api'
import Header from '../components/Header/Header'

const Products = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState(['All', 'Bottles', 'Jars', 'Caps', 'Preforms'])
  const [loading, setLoading] = useState(false)
  const [selectedColor, setSelectedColor] = useState({})

  const getProductImage = (product, color = null) => {
    if (color && product.images) {
      if (product.images[color]) {
       //return `http://localhost:5000/uploads/${product.images[color]}`
        return `/uploads/${product.images[color]}`
      }
      const colorLower = color.toLowerCase()
      const matchingKey = Object.keys(product.images).find(key => key.toLowerCase() === colorLower)
      if (matchingKey) {
       //return `http://localhost:5000/uploads/${product.images[matchingKey]}`
         return `/uploads/${product.images[matchingKey]}`
      }
    }
    if (product.images && Object.keys(product.images).length > 0) {
      const firstKey = Object.keys(product.images)[0]
       //return `http://localhost:5000/uploads/${product.images[firstKey]}`
       return `/uploads/${product.images[firstKey]}`
    }
    if (product.image) {
       //return `http://localhost:5000/uploads/${product.image}`
       return `/uploads/${product.image}`
    }
    return null
  }

  const getProductColors = (product) => {
    if (product.images && Object.keys(product.images).length > 0) {
      return Object.keys(product.images)
    }
    return Array.isArray(product.color) ? product.color : (product.color ? [product.color] : [])
  }

  const getMoqForColor = (product, color) => {
    if (!product.moqPackaging) return ''
    if (typeof product.moqPackaging === 'object') {
      if (product.moqPackaging[color]) {
        return product.moqPackaging[color]
      }
      const colorLower = color.toLowerCase()
      const matchingKey = Object.keys(product.moqPackaging).find(key => key.toLowerCase() === colorLower)
      if (matchingKey) {
        return product.moqPackaging[matchingKey]
      }
    }
    if (typeof product.moqPackaging === 'string') {
      return product.moqPackaging
    }
    return ''
  }

  const fetchProducts = async (category) => {
    setLoading(true)
    try {
      const result = await productAPI.getProducts(category === 'All' ? null : category)
      if (result.ok) {
        setProducts(result.data.products)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
    setLoading(false)
  }

  const fetchCategories = async () => {
    try {
      const result = await productAPI.getCategories()
      if (result.ok && result.data.categories) {
        setCategories(['All', ...result.data.categories])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts(selectedCategory)
  }, [selectedCategory])

  const handleCustomize = (e, product) => {
    e.stopPropagation()
    e.preventDefault()
    const colors = getProductColors(product)
    const currentColor = selectedColor[product._id] || colors[0]
    navigate('/contact', {
      state: {
        product: product,
        selectedColor: currentColor
      }
    })
  }

  return (
    <div
      className="min-h-screen bg-[#FAFAF8] dark:bg-[#15171A] text-[#15171A] dark:text-[#F2F1ED] pt-12 selection:bg-[#D4530F] selection:text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <Header />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">



        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── LEFT SIDEBAR: Minimal Grid Navigation ── */}
          <aside className="lg:col-span-3 lg:sticky lg:top-32 z-30 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="bg-white dark:bg-[#1C1F23] lg:bg-transparent lg:dark:bg-transparent border lg:border-0 border-[#DEDDD6] dark:border-[#2A2D32] p-4 lg:p-0">
              <div className="hidden lg:flex items-center gap-2 mb-4 pb-2 border-b border-[#DEDDD6] dark:border-[#2A2D32]">
                <Filter size={16} strokeWidth={1.5} className="text-red-600" />
                <span className="text-[12px] font-mono uppercase tracking-wider text-slate-800">Tiers / Classes</span>
              </div>

              <div className="flex flex-nowrap lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 no-scrollbar">
                {categories.map((category) => {
                  const isActive = selectedCategory === category
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2.5 text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-colors text-left w-auto lg:w-full border flex items-center justify-between group ${isActive
                          ? 'bg-[#15171A] dark:bg-[#F2F1ED] text-[#FAFAF8] dark:text-[#15171A] border-[#15171A] dark:border-[#F2F1ED]'
                          : 'bg-transparent text-slate-800 dark:text-[#9B9D9F] border-[#DEDDD6] dark:border-[#2A2D32] lg:border-transparent lg:dark:border-transparent hover:text-[#15171A] dark:hover:text-[#F2F1ED] hover:bg-[#DEDDD6]/30 dark:hover:bg-[#2A2D32]/30'
                        }`}
                    >
                      <span>{category}</span>
                      <ChevronRight
                        size={12}
                        className={`hidden lg:block transition-transform ${isActive ? 'translate-x-0 text-white dark:text-[#15171A]' : '-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-[#8C8E8A]'
                          }`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* ── RIGHT MATRIX: Technical Matrix Showcase ── */}
          <main className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white dark:bg-[#1C1F23] aspect-[4/5] p-6 space-y-6 animate-pulse">
                    <div className="aspect-square bg-[#FAFAF8] dark:bg-[#15171A]" />
                    <div className="h-4 bg-[#FAFAF8] dark:bg-[#15171A] w-3/4" />
                    <div className="h-3 bg-[#FAFAF8] dark:bg-[#15171A] w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => {
                  const colors = getProductColors(product)
                  const currentColor = selectedColor[product._id] || colors[0]
                  const currentImage = getProductImage(product, currentColor)
                  const currentMoq = getMoqForColor(product, currentColor)

                  return (
                    <div
                      key={product._id}
                      className="group flex flex-col justify-between bg-[#FAFAF8] dark:bg-[#15171A] hover:bg-white dark:hover:bg-[#1C1F23] transition-colors relative border border-[#DEDDD6] dark:border-[#2A2D32]"
                    >
                      {/* Box Frame Link Area */}
                      <Link to={`/product/${product._id}`} className="flex-1 flex flex-col">

                        {/* Technical Aspect Ratio Image Frame */}
                        <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden border-b border-[#DEDDD6] dark:border-[#2A2D32]">
                          {currentImage ? (
                            <motion.img
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                              src={currentImage}
                              alt={product.name}
                              className="h-full w-full object-contain select-none"
                              loading="lazy"
                              style={{ imageRendering: 'auto' }}
                            />
                          ) : (
                            <div className="text-[#C8C6BD] dark:text-[#3A3D40] flex flex-col items-center gap-2">
                              <Package size={32} strokeWidth={1} />
                              <span className="text-[9px] font-mono tracking-[0.2em] uppercase">No media</span>
                            </div>
                          )}
                        </div>

                        {/* Text Grid Area */}
                        <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                          <div className="space-y-1">
                            {product.sku && (
                              <span className="block font-medium text-[10px] text-slate-600">SKU · {product.sku}</span>
                            )}
                            <h3
                              className="text-[16px] font-bold tracking-tight text-[#15171A] dark:text-[#F2F1ED] line-clamp-2 group-hover:text-red-600 transition-colors"
                              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                              {product.name}
                            </h3>
                          </div>

                          {/* Inline Minimalist Variations Swatches */}
                          {colors.length > 0 && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between font-medium text-[9px] uppercase tracking-wider text-slate-600">
                                <span className='text-slate-800'>Variant</span>
                                <span className="text-[#15171A] dark:text-[#F2F1ED]">{currentColor}</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {colors.map((color, idx) => {
                                  const isSelected = currentColor === color
                                  return (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setSelectedColor({ ...selectedColor, [product._id]: color })
                                      }}
                                      className={`px-2 py-1 text-[10px] font-medium uppercase tracking-wide border transition-all ${isSelected
                                          ? 'bg-[#15171A] dark:bg-[#F2F1ED] text-[#FAFAF8] dark:text-[#15171A] border-[#15171A] dark:border-[#F2F1ED]'
                                          : 'bg-white dark:bg-[#1C1F23] text-slate-800 dark:text-[#9B9D9F] border-slate-500 dark:border-[#2A2D32] hover:border-[#8C8E8A]'
                                        }`}
                                    >
                                      {color}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )}

                          {/* Technical MOQ Block Footer */}
                          {currentMoq && (
                            <div className="flex items-center justify-between border border-slate-300 dark:border-[#2A2D32] px-3 py-2 bg-white dark:bg-[#1C1F23]">
                              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-700">Min Order</span>
                              <span className="font-mono text-xs font-medium">
                                {currentMoq} <span className="text-[10px] text-slate-700">pcs</span>
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Technical Interaction Matrix Bar */}
                      <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                        <Link
                          to={`/innovate`}
                          className="py-2 px-3 border border-slate-400 dark:border-[#2A2D32] text-slate-900 dark:text-[#9B9D9F] text-[10px] font-medium uppercase tracking-wider text-center hover:border-[#8C8E8A] transition-colors flex items-center justify-center gap-1 group/btn"
                        >
                          customize
                          <ArrowUpRight size={13} className="text-slate-800 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={(e) => handleCustomize(e, product)}
                          className="py-2 px-3 bg-red-600 hover:bg-red-700 text-white text-[10px] font-mono uppercase tracking-wider transition-colors text-center"
                        >
                          Quote
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              /* High-Fidelity Empty Frame State */
              <div className="text-center py-24 border border-[#DEDDD6] dark:border-[#2A2D32] bg-white dark:bg-[#1C1F23] max-w-md mx-auto">
                <Package size={28} className="mx-auto text-[#D4530F] mb-4" strokeWidth={1.5} />
                <h3 className="text-sm font-bold uppercase tracking-wide mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Class Vacant
                </h3>
                <p className="text-[#5C6066] dark:text-[#9B9D9F] text-xs px-8 leading-relaxed max-w-xs mx-auto">
                  This precise category array is currently updating. Select alternate configurations.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── FOOTER FRAME: Enterprise Procurement CTA ── */}
      <section className="py-16 bg-white dark:bg-[#1C1F23] border-t border-[#DEDDD6] dark:border-[#2A2D32] mt-24">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-[#15171A] dark:text-[#F2F1ED]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Custom Industrial Dimensioning
            </h2>
            <p className="text-xs text-[#5C6066] dark:text-[#9B9D9F] max-w-sm mx-auto leading-relaxed">
              We interface with deployment engineers and packaging procurement chains directly to configure blueprint modifications.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-[#15171A] dark:bg-[#F2F1ED] text-white dark:text-[#15171A] text-xs font-mono uppercase tracking-widest transition-opacity hover:opacity-90"
          >
            Request Engineering Specs
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Products