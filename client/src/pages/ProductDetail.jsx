import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, ChevronRight, ArrowLeft, ShieldCheck, ZoomIn, Compass, ArrowUpRight, X, ChevronLeft } from 'lucide-react'
import { productAPI } from '../services/api'

const ProductDetail = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [isZooming, setIsZooming] = useState(false)
  const imageWrapRef = useRef(null)

  // Scroll to top immediately on component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getAllImages = (product) => {
    if (product.images && Object.keys(product.images).length > 0) {
      return Object.entries(product.images).map(([color, file]) => ({
        color,
       src: `http://localhost:5000/uploads/${file}`
       //  src: `/uploads/${file}`
     }))
    }
    if (product.image) {
        return `http://localhost:5000/uploads/${product.image}`
       // return [{ src: `/uploads/${product.image}` }]
    }
    return []
  }

  const getProductImage = (product, color = null) => {
    if (color && product.images) {
      if (product.images[color]) {
       return `http://localhost:5000/uploads/${product.images[color]}`
      //  return `/uploads/${product.images[color]}`
      }
      const colorLower = color.toLowerCase()
      const matchingKey = Object.keys(product.images).find(key => key.toLowerCase() === colorLower)
      if (matchingKey) {
       return `http://localhost:5000/uploads/${product.images[matchingKey]}`
      //  return `/uploads/${product.images[matchingKey]}`
      }
    }
    if (product.images && Object.keys(product.images).length > 0) {
      const firstKey = Object.keys(product.images)[0]
       return `http://localhost:5000/uploads/${product.images[firstKey]}`
      //  return `/uploads/${product.images[firstKey]}`
    }
    if (product.image) {
       return `http://localhost:5000/uploads/${product.image}`
      //  return `/uploads/${product.image}`
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

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const result = await productAPI.getProducts()
      if (result.ok) {
        const foundProduct = result.data.products.find(p => p._id === productId)
        if (foundProduct) {
          setProduct(foundProduct)
          const colors = getProductColors(foundProduct)
          setSelectedColor(colors[0] || null)

          const related = result.data.products.filter(p =>
            p.category === foundProduct.category && p._id !== productId
          ).slice(0, 4)
          setRelatedProducts(related)
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    // Scroll to top immediately when page loads
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
    fetchProduct()
  }, [productId])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false)
    }
    if (lightboxOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  const handleCustomize = () => {
    navigate('/contact', {
      state: {
        product: product,
        selectedColor: selectedColor
      }
    })
  }

  const handleMouseMove = (e) => {
    if (!imageWrapRef.current) return
    const rect = imageWrapRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#15171A] pt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-3 bg-[#DEDDD6] dark:bg-[#2A2D32] w-1/6" />
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="w-full lg:w-[42%] aspect-square bg-[#DEDDD6] dark:bg-[#2A2D32]" />
              <div className="w-full lg:w-[58%] space-y-6">
                <div className="h-9 bg-[#DEDDD6] dark:bg-[#2A2D32] w-3/4" />
                <div className="h-3 bg-[#DEDDD6] dark:bg-[#2A2D32] w-1/4" />
                <div className="h-32 bg-[#DEDDD6] dark:bg-[#2A2D32]" />
                <div className="h-11 bg-[#DEDDD6] dark:bg-[#2A2D32] w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#15171A] flex items-center justify-center pt-24">
        <div className="max-w-md w-full mx-auto px-8 py-12 text-center bg-white dark:bg-[#1C1F23] border border-[#DEDDD6] dark:border-[#2A2D32]">
          <div className="w-14 h-14 border border-[#D4530F]/30 flex items-center justify-center mx-auto mb-5 text-[#D4530F]">
            <Package size={26} strokeWidth={1.5} />
          </div>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#D4530F] mb-3">Error · 404</p>
          <h1 className="text-xl font-bold text-[#15171A] dark:text-[#F2F1ED] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Component not found
          </h1>
          <p className="text-[#5C6066] dark:text-[#9B9D9F] mb-8 text-sm leading-relaxed">
            We couldn't locate this part in the catalog. It may have been discontinued or the link is out of date.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#15171A] dark:bg-[#F2F1ED] text-white dark:text-[#15171A] text-xs font-mono uppercase tracking-wider transition-opacity hover:opacity-85"
          >
            <ArrowLeft size={14} />
            Back to catalog
          </Link>
        </div>
      </div>
    )
  }

  const allImages = getAllImages(product)
  const currentImage = getProductImage(product, selectedColor)
  const currentMoq = getMoqForColor(product, selectedColor)
  const colors = getProductColors(product)
  const lightboxIndex = allImages.findIndex(img => img.src === currentImage)

  const specRows = [
    { label: 'Volume', value: product.volume },
    { label: 'Neck size', value: product.neckSize },
    { label: 'Neck profile', value: product.neckProfile },
    { label: 'Pilfer proof', value: product.pilfer },
    { label: 'OFC value', value: product.ofc },
    { label: 'Height', value: product.height },
    { label: 'Diameter', value: product.diameter },
    { label: 'Net weight', value: product.weight },
    { label: 'Closure type', value: product.capType }
  ].filter(row => row.value)

  const goToLightboxImage = (delta) => {
    if (allImages.length === 0) return
    const next = (lightboxIndex + delta + allImages.length) % allImages.length
    const nextImg = allImages[next]
    if (nextImg.color) setSelectedColor(nextImg.color)
  }

  return (
    <div
      className="min-h-screen bg-[#FAFAF8] dark:bg-[#15171A] text-[#15171A] dark:text-[#F2F1ED] pt-28 pb-24 selection:bg-[#D4530F] selection:text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#8C8E8A] mb-10 pb-4 border-b border-[#DEDDD6] dark:border-[#2A2D32]">
          <Link to="/" className="hover:text-[#D4530F] transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <Link to="/products" className="hover:text-[#D4530F] transition-colors">Products</Link>
          {product.category && (
            <>
              <span className="opacity-40">/</span>
              <Link
                to={`/products/${product.category.toLowerCase()}`}
                className="hover:text-[#D4530F] transition-colors"
              >
                {product.category}
              </Link>
            </>
          )}
          <span className="opacity-40">/</span>
          <span className="text-[#15171A] dark:text-[#F2F1ED] truncate max-w-[180px] sm:max-w-xs">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">

          {/* ── Gallery ── */}
          <div className="w-full lg:w-[42%] lg:sticky lg:top-32">
            <div className="flex border border-[#DEDDD6] dark:border-[#2A2D32] bg-white dark:bg-[#1C1F23]">

              <div className="w-9 shrink-0 bg-[#15171A] dark:bg-[#F2F1ED] flex items-center justify-center py-4">
                <span
                  className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#FAFAF8] dark:text-[#15171A] whitespace-nowrap"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {product.sku ? `Sample · ${product.sku}` : 'Sample piece'}
                </span>
              </div>

              <div
                ref={imageWrapRef}
                className="relative flex-1 aspect-square flex items-center justify-center overflow-hidden cursor-zoom-in"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
                onClick={() => currentImage && setLightboxOpen(true)}
              >
                <AnimatePresence mode="wait">
                  {currentImage ? (
                    <motion.img
                      key={selectedColor || 'fallback'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      src={currentImage}
                      alt={product.name}
                      className="w-full h-full object-contain p-6 select-none transition-transform duration-150"
                      style={
                        isZooming
                          ? { transform: 'scale(1.8)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                          : undefined
                      }
                    />
                  ) : (
                    <div className="text-[#C8C6BD] dark:text-[#3A3D40] flex flex-col items-center gap-3">
                      <Package size={40} strokeWidth={1} />
                      <span className="text-[10px] font-mono tracking-[0.2em] uppercase">No media</span>
                    </div>
                  )}
                </AnimatePresence>

                {product.category && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2.5 py-1 bg-[#FAFAF8] dark:bg-[#15171A] border border-[#DEDDD6] dark:border-[#2A2D32] text-[#15171A] dark:text-[#F2F1ED] text-[10px] font-mono uppercase tracking-widest">
                      {product.category}
                    </span>
                  </div>
                )}

                {currentImage && !isZooming && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FAFAF8]/90 dark:bg-[#15171A]/90 border border-[#DEDDD6] dark:border-[#2A2D32] text-[#5C6066] dark:text-[#9B9D9F]">
                    <ZoomIn size={12} strokeWidth={1.5} />
                    <span className="text-[9px] font-mono uppercase tracking-wider">Click to expand</span>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail strip — only when more than one image */}
            {allImages.length > 1 && (
              <div className="flex gap-2 mt-3">
                {allImages.map((img, idx) => {
                  const isActive = img.src === currentImage
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => img.color && setSelectedColor(img.color)}
                      className={`relative w-14 h-14 shrink-0 border bg-white dark:bg-[#1C1F23] overflow-hidden transition-colors ${
                        isActive
                          ? 'border-[#D4530F]'
                          : 'border-[#DEDDD6] dark:border-[#2A2D32] hover:border-[#8C8E8A]'
                      }`}
                      aria-label={img.color || `Image ${idx + 1}`}
                    >
                      <img src={img.src} alt={img.color || ''} className="w-full h-full object-contain p-1.5" />
                      {isActive && <div className="absolute inset-0 ring-1 ring-inset ring-[#D4530F]" />}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Certification strip */}
            <div className="grid grid-cols-3 border border-[#DEDDD6] dark:border-[#2A2D32] mt-3">
              {[
                { icon: ShieldCheck, label: 'Certified' },
                { icon: ZoomIn, label: 'Precision' },
                { icon: Compass, label: 'Compliant' }
              ].map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center text-center gap-1.5 py-3 ${i !== 2 ? 'border-r border-[#DEDDD6] dark:border-[#2A2D32]' : ''}`}
                >
                  <Icon size={15} strokeWidth={1.5} className="text-[#D4530F]" />
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#8C8E8A]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Spec sheet ── */}
          <div className="w-full lg:w-[58%] space-y-7">

            <div>
              {product.sku && (
                <span className="font-mono text-[11px] tracking-wider text-[#8C8E8A]">SKU {product.sku}</span>
              )}
              <h1
                className="text-3xl sm:text-[2.25rem] font-bold tracking-tight leading-[1.1] mt-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {product.name}
              </h1>
            </div>

            {colors.length > 0 && (
              <div className="border-t border-[#DEDDD6] dark:border-[#2A2D32] pt-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C8E8A]">Variant</span>
                  <span className="font-mono text-[11px] text-[#15171A] dark:text-[#F2F1ED]">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color, idx) => {
                    const isSelected = selectedColor === color
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wide border transition-colors ${
                          isSelected
                            ? 'bg-[#15171A] dark:bg-[#F2F1ED] text-[#FAFAF8] dark:text-[#15171A] border-[#15171A] dark:border-[#F2F1ED]'
                            : 'bg-transparent text-[#5C6066] dark:text-[#9B9D9F] border-[#DEDDD6] dark:border-[#2A2D32] hover:border-[#8C8E8A]'
                        }`}
                      >
                        {color}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {currentMoq && (
              <div className="flex items-center justify-between border border-gray-400 dark:border-[#2A2D32] px-5 py-4">
                <span className="text-[12px] font-mono uppercase tracking-wider text-slate-900">Minimum order qty</span>
                <span className="font-mono text-lg font-medium">
                  {currentMoq} <span className="text-xs text-[#8C8E8A]">pcs</span>
                </span>
              </div>
            )}

          
            {specRows.length > 0 && (
              <div className="border-t border-[#DEDDD6] dark:border-[#2A2D32] pt-5">
                <h2 className="text-[11px] font-mono uppercase tracking-wider text-[#8C8E8A] mb-3">Specification</h2>
                <table className="w-full border-collapse">
                  <tbody>
                    {specRows.map((row, index) => (
                      <tr key={index} className="border-b border-[#DEDDD6] dark:border-[#2A2D32] last:border-b-0">
                        <td className="py-2.5 text-sm text-[#5C6066] dark:text-[#9B9D9F]">{row.label}</td>
                        <td className="py-2.5 text-sm font-mono font-medium text-right">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {product.marketSegments && product.marketSegments.length > 0 && (
              <div className="border-t border-[#DEDDD6] dark:border-[#2A2D32] pt-5 space-y-3">
                <h2 className="text-[11px] font-mono uppercase tracking-wider text-[#8C8E8A]">Used in</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {product.marketSegments.map((segment, idx) => (
                    <span key={idx} className="text-sm text-[#3D4044] dark:text-[#C4C5C1]">
                      {segment}{idx < product.marketSegments.length - 1 && <span className="text-[#D4530F] mx-2">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleCustomize}
                className="flex-1 py-3.5 px-5 bg-[#D4530F] hover:bg-[#B8460B] text-white text-xs font-mono uppercase tracking-wider transition-colors"
              >
                Request quote for this configuration
              </button>
              <Link
                to="/products"
                className="py-3.5 px-5 border border-[#DEDDD6] dark:border-[#2A2D32] text-[#5C6066] dark:text-[#9B9D9F] text-xs font-mono uppercase tracking-wider text-center hover:border-[#8C8E8A] transition-colors"
              >
                Back to catalog
              </Link>
            </div>
          </div>
        </div>

        {/* ── Related parts ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-[#DEDDD6] dark:border-[#2A2D32] pt-12">
            <h2
              className="text-lg font-bold tracking-tight mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Related parts
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {relatedProducts.map((relatedProduct) => {
                const relatedColors = getProductColors(relatedProduct)
                const relatedImage = getProductImage(relatedProduct, relatedColors[0])

                return (
                  <Link
                    key={relatedProduct._id}
                    to={`/product/${relatedProduct._id}`}
                    className="group flex flex-col transition-colors border border-[#DEDDD6] dark:border-[#2A2D32]  gap-1"
                  >
                    <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden border border-[#DEDDD6] dark:border-[#2A2D32] gap-1">
                      {relatedImage ? (
                        <img
                          src={relatedImage}
                          alt={relatedProduct.name}
                          className="w-full h-full object-contain p-5"
                          loading="lazy"
                        />
                      ) : (
                        <Package size={22} strokeWidth={1.5} className="text-[#C8C6BD] dark:text-[#3A3D40]" />
                      )}
                    </div>

                    <div className="p-3.5 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-xs font-medium text-[#15171A] dark:text-[#F2F1ED] truncate group-hover:text-[#D4530F] transition-colors">
                          {relatedProduct.name}
                        </h3>
                        {relatedProduct.sku && (
                          <span className="block font-mono text-[10px] text-[#8C8E8A] mt-0.5">{relatedProduct.sku}</span>
                        )}
                      </div>
                      <ArrowUpRight size={13} className="text-[#8C8E8A] group-hover:text-[#D4530F] transition-colors shrink-0 mt-0.5" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-[#15171A]/95 flex items-center justify-center p-6"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-white/50 transition-colors"
              aria-label="Close"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goToLightboxImage(-1) }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-white/50 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goToLightboxImage(1) }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-white/50 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} strokeWidth={1.5} />
                </button>
              </>
            )}

            <motion.img
              key={currentImage}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              src={currentImage}
              alt={product.name}
              className="max-w-full max-h-[85vh] object-contain select-none"
              onClick={(e) => e.stopPropagation()}
            />

            {selectedColor && (
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                {selectedColor}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductDetail
