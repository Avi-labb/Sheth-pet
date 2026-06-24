import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, ChevronRight } from 'lucide-react'
import { productAPI } from '../../services/api'
import industrialImage from '../../assets/images/Industrial.webp'

const Industrial = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedColor, setSelectedColor] = useState({})
  const navigate = useNavigate()

  const getProductImage = (product, color = null) => {
    if (color && product.images) {
      if (product.images[color]) {
        return `http://localhost:5000/uploads/${product.images[color]}`
      }
      const colorLower = color.toLowerCase()
      const matchingKey = Object.keys(product.images).find(key => key.toLowerCase() === colorLower)
      if (matchingKey) {
        return `http://localhost:5000/uploads/${product.images[matchingKey]}`
      }
    }
    if (product.images && Object.keys(product.images).length > 0) {
      const firstKey = Object.keys(product.images)[0]
      return `http://localhost:5000/uploads/${product.images[firstKey]}`
    }
    if (product.image) {
      return `http://localhost:5000/uploads/${product.image}`
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

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const result = await productAPI.getProducts(null, 'Industrial')
      if (result.ok) {
        setProducts(result.data.products)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-500 selection:text-white">
      <section 
        className="py-16 bg-gradient-to-br from-slate-900/90 to-slate-800/90 text-white relative overflow-hidden"
        style={{
          backgroundImage: `url(${industrialImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase mb-4">
            <Link to="/" className="hover:text-red-400 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span>Industrial</span>
          </div>
          <h1 
            className="text-4xl md:text-5xl font-black tracking-tight mb-4"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Industrial Packaging
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed mb-8">
            Robust packaging solutions for industrial chemicals, lubricants, and bulk products.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium">Heavy Duty</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium">Large Volume</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium">Chemical Resistant</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium">Secure Transport</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white border border-slate-300 rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-slate-100 w-full"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-slate-200 rounded w-1/3"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                    <div className="h-12 bg-slate-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => {
                const colors = getProductColors(product)
                const currentColor = selectedColor[product._id] || colors[0]
                const currentImage = getProductImage(product, currentColor)
                const currentMoq = getMoqForColor(product, currentColor)

                return (
                  <motion.div
                    key={product._id}
                    className="bg-white border border-slate-300 rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between h-full relative shadow-sm hover:shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    whileHover={{ y: -6, borderColor: 'rgba(220, 38, 38, 0.3)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                  >
                    <Link to={`/product/${product._id}`} className="flex-1">
                      <div>
                        <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200 flex items-center justify-center overflow-hidden">
                          {currentImage ? (
                            <motion.img
                              key={currentColor}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                              src={currentImage}
                              alt={product.name}
                              className="w-full h-full object-contain p-8 transform group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                          ) : (
                            <div className="text-slate-400 flex flex-col items-center gap-3">
                              <Package size={48} strokeWidth={1} />
                              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">Image Coming Soon</span>
                            </div>
                          )}
                          {product.category && (
                            <span className="absolute top-4 left-4 inline-block px-3 py-1 bg-white/95 text-slate-700 text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg border border-slate-200 backdrop-blur-sm shadow-sm">
                              {product.category}
                            </span>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 
                            className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors duration-200 line-clamp-2 mb-2" 
                            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                          >
                            {product.name}
                          </h3>
                          {product.sku && (
                            <p className="text-[11px] font-mono text-slate-500 tracking-widest mb-4">
                              SKU: {product.sku}
                            </p>
                          )}
                          {colors.length > 0 && (
                            <div className="mb-4">
                              <p className="text-[11px] font-bold text-slate-700 uppercase tracking-[0.15em] mb-2">
                                Colors
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {colors.map((color, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedColor({ ...selectedColor, [product._id]: color })
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-200 border-2 ${
                                      currentColor === color
                                        ? 'bg-red-600 text-white border-red-600 shadow-md'
                                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                                  >
                                    {color}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          {currentMoq && (
                            <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">
                                Minimum Order Quantity
                              </p>
                              <p className="text-lg font-bold text-slate-900">
                                {currentMoq}
                              </p>
                            </div>
                          )}
                          {product.marketSegments && product.marketSegments.length > 0 && (
                            <div className="mb-2">
                              <p className="text-[11px] font-bold text-slate-700 uppercase tracking-[0.15em] mb-2">
                                Suitable For
                              </p>
                              <div className="flex flex-col gap-1.5">
                                {product.marketSegments.map((segment, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></div>
                                    <span className="text-[13px] text-slate-600 font-medium">
                                      {segment}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          to={`/product/${product._id}`}
                          className="py-3 px-4 bg-slate-100 group-hover:bg-slate-200 border border-slate-300 rounded-xl flex items-center justify-center text-slate-700 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300"
                        >
                          <span>View Details</span>
                          <ChevronRight size={14} className="ml-1.5" />
                        </Link>
                        <button
                          onClick={(e) => handleCustomize(e, product)}
                          className="py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border border-red-600 hover:border-red-700 rounded-xl flex items-center justify-center text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-sm hover:shadow-md"
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
            <div className="text-center py-20 border border-dashed border-slate-400 rounded-2xl bg-white/10 max-w-sm mx-auto">
              <Package size={48} className="mx-auto text-slate-500 mb-4" strokeWidth={1} />
              <h3 className="text-lg font-bold text-slate-600 mb-2">No Products Found</h3>
              <p className="text-slate-600 text-sm px-4">
                We're working on expanding our product range for this segment. Please check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Industrial