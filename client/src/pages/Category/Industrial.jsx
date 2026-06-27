import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, ArrowUpRight } from 'lucide-react'
import { productAPI } from '../../services/api'
import industrialImage from '../../assets/images/Industrial.png'

const Industrial = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedColor, setSelectedColor] = useState({})

  const getProductImage = (product, color = null) => {
    if (color && product.images) {
      if (product.images[color]) {
       // return `http://localhost:5000/uploads/${product.images[color]}`
        return `/uploads/${product.images[color]}`
      }
      const colorLower = color.toLowerCase()
      const matchingKey = Object.keys(product.images).find(key => key.toLowerCase() === colorLower)
      if (matchingKey) {
       //  return `http://localhost:5000/uploads/${product.images[matchingKey]}`
        return `/uploads/${product.images[matchingKey]}`
      }
    }
    if (product.images && Object.keys(product.images).length > 0) {
      const firstKey = Object.keys(product.images)[0]
      // return `http://localhost:5000/uploads/${product.images[firstKey]}`
        return `/uploads/${product.images[firstKey]}`
    }
    if (product.image) {
      // return `http://localhost:5000/uploads/${product.image}`
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-[#3FB893] selection:text-white">
      {/* HERO SECTION */}
      <section className="relative mt-20 sm:mt-20 overflow-hidden border-b border-gray-200 bg-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${industrialImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8  pb-20 relative z-10">
          <div className="flex items-center gap-2 text-[11px] mt-5 sm:mt-20 sm:mb-56 sm:text-[15px] font-mono uppercase tracking-[0.2em] text-white mb-6">
            <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-semibold">Industrial</span>
          </div>

          <div className="max-w-3xl">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold   tracking-tight text-white mb-6"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              Industrial <span className="text-red-600">Packaging.</span>
            </h1>
            <p className="text-sm sm:text-lg text-white font-medium leading-relaxed max-w-2xl">
              Robust packaging solutions for industrial chemicals, lubricants, and bulk products.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-600 dark:border-[#2A2D32]">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-700">
              Class Classification Matrix
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-700">
              Showing {products.length} items
            </span>
          </div>

          {loading ? (
            /* Seamless Grid Skeleton matching layout */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white dark:bg-[#1C1F23] aspect-[4/5] p-6 space-y-4 animate-pulse border border-slate-600 dark:border-[#2A2D32]">
                  <div className="aspect-[4/3] bg-[#FAFAF8] dark:bg-[#15171A]" />
                  <div className="h-4 bg-[#FAFAF8] dark:bg-[#15171A] w-3/4" />
                  <div className="h-3 bg-[#FAFAF8] dark:bg-[#15171A] w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            /* Sharp Seamless Border Grid Matrix */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => {
                const colors = getProductColors(product)
                const currentColor = selectedColor[product._id] || colors[0]
                const currentImage = getProductImage(product, currentColor)

                return (
                  <motion.div
                    key={product._id}
                    className="group flex flex-col justify-between bg-white dark:bg-[#15171A] hover:bg-white dark:hover:bg-[#1C1F23] transition-colors relative border border-slate-400 dark:border-[#2A2D32]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                  >
                    {/* Upper Click Box Area */}
                    <Link to={`/product/${product._id}`} className="flex-1 flex flex-col">

                      {/* Image Frame Area */}
                      <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden border-b border-slate-400 dark:border-[#2A2D32]">
                        {currentImage ? (
                          <motion.img
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            src={currentImage}
                            alt={product.name}
                            className="h-full w-full object-cover select-none"
                            loading="lazy"
                            style={{ imageRendering: 'auto' }}
                          />
                        ) : (
                          <div className="text-[#C8C6BD] dark:text-[#3A3D40] flex flex-col items-center gap-2">
                            <Package size={28} strokeWidth={1.5} />
                            <span className="text-[9px] font-mono tracking-[0.2em] uppercase">No media</span>
                          </div>
                        )}

                        {product.category && (
                          <div className="absolute top-4 font-semibold left-4">
                            <span className="inline-flex items-center px-2 py-0.5 bg-[#FAFAF8] dark:bg-[#15171A] border border-slate-400 dark:border-[#2A2D32] text-slate-800 dark:text-[#F2F1ED] text-[10px] font-mono uppercase tracking-widest">
                              {product.category}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content details frame */}
                      <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                        <div className="space-y-1">
                          {product.sku && (
                            <span className="block font-mono text-[10px] text-slate-700">SKU · {product.sku}</span>
                          )}
                          <h3
                            className="text-[18px] font-bold tracking-tight text-[#15171A] dark:text-[#F2F1ED] line-clamp-2 group-hover:text-red-600 transition-colors"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {product.name}
                          </h3>
                        </div>

                        {/* Flat Minimalist Swatches */}
                        {colors.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-slate-700">
                              <span>Variant Color</span>
                              <span className="text-slate-700 text-[11px] font-medium dark:text-[#F2F1ED]">{currentColor}</span>
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
                                    className={`px-2 py-1 text-[12px] font-mono uppercase tracking-wide border transition-all ${isSelected
                                      ? 'bg-[#15171A] dark:bg-[#F2F1ED] text-[#FAFAF8] dark:text-[#15171A] border-[#15171A] dark:border-[#F2F1ED]'
                                      : 'bg-white dark:bg-[#1C1F23] text-slate-800 dark:text-[#9B9D9F] border-slate-400 dark:border-[#2A2D32] hover:border-[#8C8E8A]'
                                      }`}
                                  >
                                    {color}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
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
                  </motion.div>
                )
              })}
            </div>
          ) : (
            /* Flat Empty Layout Workspace */
            <div className="text-center py-24 border border-[#DEDDD6] dark:border-[#2A2D32] bg-white dark:bg-[#1C1F23] max-w-md mx-auto">
              <Package size={28} className="mx-auto text-[#D4530F] mb-4 " strokeWidth={1.5} />
              <h3 className="text-sm font-bold uppercase tracking-wide mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Class Vacant
              </h3>
              <p className="text-[#5C6066] dark:text-[#9B9D9F] text-xs px-8 leading-relaxed max-w-xs mx-auto">
                No active industrial metrics matched this profile configuration query. Contact engineering.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Industrial
