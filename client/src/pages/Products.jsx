import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, ChevronRight, X, Box, Layers, Settings, Filter } from 'lucide-react'
import { productAPI } from '../services/api'
import { useTheme } from '../contexts/ThemeContext'
import Header from '../components/Header/Header'

const Products = () => {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState(['All', 'Bottles', 'Jars', 'Caps', 'Preforms'])
  const [loading, setLoading] = useState(false)
  const [selectedColor, setSelectedColor] = useState({})

  const getProductImage = (product, color = null) => {
    if (color && product.images) {
      // Try exact match first
      if (product.images[color]) {
        //return `http://localhost:5000/uploads/${product.images[color]}`
        return `/uploads/${product.images[color]}`
      }
      // Try case-insensitive match
      const colorLower = color.toLowerCase()
      const matchingKey = Object.keys(product.images).find(key => key.toLowerCase() === colorLower)
      if (matchingKey) {
        // return `http://localhost:5000/uploads/${product.images[matchingKey]}`
        return `/uploads/${product.images[matchingKey]}`
      }
    }
    // Fallback to first image if we have images but no color match
    if (product.images && Object.keys(product.images).length > 0) {
      const firstKey = Object.keys(product.images)[0]
     // return `http://localhost:5000/uploads/${product.images[firstKey]}`
      return `/uploads/${product.images[firstKey]}`
    }
    // Fallback to main product image
    if (product.image) {
      // return `http://localhost:5000/uploads/${product.image}`
      return `/uploads/${product.image}`
    }
    return null
  }

  const getProductColors = (product) => {
    // First check for colors in images object
    if (product.images && Object.keys(product.images).length > 0) {
      return Object.keys(product.images)
    }
    // Fallback to product.color array/string
    return Array.isArray(product.color) ? product.color : (product.color ? [product.color] : [])
  }

  const getMoqForColor = (product, color) => {
    if (!product.moqPackaging) return ''
    if (typeof product.moqPackaging === 'object') {
      // Try exact match first
      if (product.moqPackaging[color]) {
        return product.moqPackaging[color]
      }
      // Try case-insensitive match
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-red-500 selection:text-white">
      <Header />
      {/* Main Split Layout Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 mt-24 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SIDEBAR: Categories (Sticky on Desktop, Horizontal Scroll on Mobile) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 z-30 bg-slate-50 dark:bg-slate-900 lg:bg-transparent dark:lg:bg-transparent -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="bg-white/80 dark:bg-slate-900/80 lg:bg-white/60 dark:lg:bg-slate-900/60 border border-slate-500 dark:border-slate-700 rounded-none lg:rounded-2xl p-2 lg:p-5 backdrop-blur-md lg:backdrop-blur-none">

              {/* Desktop Sidebar Title */}
              <div className="hidden lg:flex items-center gap-2 mb-4 pb-3 border-b border-slate-400/60">
                <Filter size={16} className="text-red-500" />
                <span className="text-sm font-bold uppercase tracking-[0.15em] text-slate-700 dark:text-slate-300">Categories</span>
              </div>

              {/* Flex wrapper supporting horizontal scroll on mobile and stack on desktop */}
              <div className="flex flex-nowrap lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 no-scrollbar">
                {categories.map((category) => {
                  const isActive = selectedCategory === category
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 lg:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 text-left w-auto lg:w-full border flex items-center justify-between group ${isActive
                        ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/10'
                        : 'bg-white/60 dark:bg-slate-800/60 lg:bg-transparent dark:lg:bg-transparent text-slate-700 dark:text-slate-300 border-slate-400 dark:border-slate-700 lg:border-transparent dark:lg:border-transparent hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
                        }`}
                    >
                      <span>{category}</span>
                      <ChevronRight
                        size={12}
                        className={`hidden lg:block transition-transform duration-200 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                          }`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* RIGHT GRID: Products Content Workspace */}
          <main className="lg:col-span-9">
            {loading ? (
              /* Loading Skeleton */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl overflow-hidden animate-pulse">
                    <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 w-full"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                      <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              /* High-Fidelity Product Display Matrix */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => {
                  const colors = getProductColors(product)
                  const currentColor = selectedColor[product._id] || colors[0]
                  const currentImage = getProductImage(product, currentColor)
                  const currentMoq = getMoqForColor(product, currentColor)

                  return (
                    <motion.div
                      key={product._id}
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.03 }}
                      whileHover={{
                        y: -6,
                        borderColor: 'rgba(220, 38, 38, 0.3)',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                      }}
                    >
                      {/* Product Image & Info Link Area */}
                      <Link to={`/product/${product._id}`} className="flex-1">

                        {/* Product Image Section */}
                        <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center dark:border-slate-700 dark:from-slate-950 dark:to-slate-900">
                          {currentImage ? (
                            <motion.img
                              key={currentColor || currentImage}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3, ease: 'easeOut' }}
                              src={currentImage}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-slate-500">
                              <Package size={48} strokeWidth={1} />
                              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                                Image Coming Soon
                              </span>
                            </div>
                          )}

                          {/* Category Badge */}
                          {product.category && (
                            <span className="absolute top-4 left-4 inline-block rounded-lg border border-slate-200 bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-200">
                              {product.category}
                            </span>
                          )}
                        </div>

                        {/* Product Details Block */}
                        <div className="px-4 py-3 flex flex-col gap-4">
                          {/* Product Title */}
                          <div>
                            <h3
                              className="text-lg font-bold tracking-tight text-slate-900 line-clamp-2 transition-colors duration-300 group-hover:text-red-600 dark:text-slate-100 dark:group-hover:text-red-500"
                              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                              {product.name}
                            </h3>
                          </div>

                          {/* Subtle Color Selection Layout */}
                          {colors.length > 0 && (
                            <div className="flex flex-col gap-2 -mt-1">
                              <div className='flex items-center justify-between'>
                              <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-600 dark:text-slate-500">
                                Color
                              </span>
                             <h1 className="text-[12px] font-bold tracking-tight text-slate-900 line-clamp-2 transition-colors duration-300 group-hover:text-red-600 dark:text-slate-100 dark:group-hover:text-red-500">
                                {product.sku}
                              </h1>
                            </div>
                              <div className="flex flex-wrap gap-2">
                                {colors.map((color, idx) => {
                                  const isSelected = currentColor === color;

                                  return (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault(); // Absolute fix: Prevents the parent <Link> wrapper from activating
                                        e.stopPropagation(); // Prevents click bubbling up to the wrapper card element
                                        setSelectedColor({ ...selectedColor, [product._id]: color });
                                      }}
                                      className={`relative flex items-center justify-center rounded-md border px-2.5 py-1 font-mono text-[12px] font-medium tracking-wide uppercase transition-all duration-200 ${isSelected
                                          ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-800 dark:bg-slate-800 scale-105 shadow-sm'
                                          : 'border-slate-200 bg-white text-white-600 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600 dark:hover:border-slate-600'
                                        }`}
                                    >
                                      {color}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Minimum Order Quantity Spec Badge */}
                          {currentMoq && (
                            <div className="flex items-center justify-between  px-2 py-1 rounded-lg bg-slate-50/50  border border-slate-600 dark:bg-slate-900/30 dark:border-slate-800/50">
                              <div className="text-[10px] font-bold  tracking-[0.05em] text-slate-600 dark:text-slate-500">
                                MOQ Spec
                              </div>
                              <div className="h-3 w-[1px] bg-slate-200 dark:bg-slate-700" />
                              <div className="text-sm font-semibold font-mono text-slate-800 dark:text-slate-200">
                                {currentMoq} units
                              </div>
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Persistent Action Footer Area */}
                      <div className="px-3 pb-5 mt-auto">
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            to={`/product/${product._id}`}
                            className="group/btn py-3 px-2 border border-slate-200 dark:border-slate-800 hover:border-slate-800 dark:hover:border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300 text-[11px] font-bold uppercase tracking-wider transition-all duration-200"
                          >
                            <span>View Details</span>
                            <ChevronRight size={14} className="ml-1 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                          </Link>

                          <button
                            type="button"
                            onClick={(e) => handleCustomize(e, product)}
                            className=" bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border border-red-600 rounded-xl flex items-center justify-center text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
                          >
                            Customize
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              /* Empty Suite State */
              <div className="text-center py-20 border border-dashed border-slate-400 rounded-2xl bg-white/10 max-w-sm mx-auto">
                <Package size={36} className="mx-auto text-slate-500 mb-3" strokeWidth={1} />
                <h3 className="text-sm font-bold text-slate-600 mb-1">Category Empty</h3>
                <p className="text-slate-600 text-[12px] px-4">Our variant collection is currently being revised. Please toggle other tiers.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Enterprise Custom Request Frame */}
      <section className="py-12 bg-white dark:bg-slate-900 border-t border-slate-400 dark:border-slate-700 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Need Custom Technical Dimensions?
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-lg mx-auto leading-relaxed">
            We partner directly with industrial procurement leads to configure custom containers.
          </p>
          <Link
            to="/contact"
            className="inline-block px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 border border-slate-800 dark:border-slate-600 text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            Request Design Blueprint
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Products
