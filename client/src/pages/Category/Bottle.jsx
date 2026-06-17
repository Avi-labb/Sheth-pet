import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, ChevronRight, X, Box, Layers, Settings } from 'lucide-react'
import { productAPI } from '../../services/api'

const Bottle = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedProductDetail, setSelectedProductDetail] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const result = await productAPI.getProducts('Bottles')
        if (result.ok) {
          setProducts(result.data.products)
        }
      } catch (error) {
        console.error("Error fetching bottles:", error)
      }
      setLoading(false)
    }
    
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-red-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 border-b border-slate-900 py-16 md:py-24 px-4 sm:px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.06),transparent_60%)] pointer-events-none" />
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-2.5 inline-block">Premium Packaging</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            PET Bottle Solutions
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto font-normal leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            Engineered for durability, pristine clarity, and awless performance across all commercial industries.
          </p>
        </motion.div>
      </section>
      
      {/* Product Section */}
      <section className="py-12 md:py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            /* Skeleton Loader */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-slate-900/60 border border-slate-900 rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-slate-800/40 w-full" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-slate-800/40 rounded w-1/4" />
                    <div className="h-5 bg-slate-800/40 rounded w-3/4" />
                    <div className="h-3 bg-slate-800/40 rounded w-full" />
                    <div className="h-9 bg-slate-800/40 rounded w-full mt-3" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            /* Product Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  className="bg-slate-900 border border-slate-800/60 rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between h-full relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  whileHover={{ y: -4, borderColor: 'rgba(239, 68, 68, 0.25)' }}
                  onClick={() => setSelectedProductDetail(product)}
                >
                  <div>
                    {/* Product Image Wrapper */}
                    <div className="relative aspect-[4/3] bg-slate-950 border-b border-slate-900/50 flex items-center justify-center overflow-hidden group-hover:bg-slate-900/20 transition-colors duration-300">
                      {product.image ? (
                        <img
                          src={`http://localhost:5000/uploads/${product.image}`}
                          alt={product.name}
                          className="w-full h-full object-contain p-6 md:p-8 transform group-hover:scale-103 transition-transform duration-300 ease-out"
                        />
                      ) : (
                        <div className="text-slate-800 flex flex-col items-center gap-2">
                          <Package size={38} strokeWidth={1} />
                          <span className="text-[9px] uppercase tracking-widest text-slate-600 font-bold">Staging Image</span>
                        </div>
                      )}

                      {/* Category Badge */}
                      {product.category && (
                        <span className="absolute top-3 left-3 inline-block px-2 py-0.5 bg-slate-900/90 text-slate-400 text-[9px] font-bold uppercase tracking-wider rounded border border-slate-800/80 backdrop-blur-sm">
                          {product.category}
                        </span>
                      )}
                    </div>

                    {/* Product Info Content */}
                    <div className="p-5 md:p-6">
                      <h3 
                        className="text-base md:text-lg font-bold text-slate-100 group-hover:text-red-500 transition-colors duration-200 line-clamp-1 mb-1" 
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {product.name}
                      </h3>

                      {product.sku && (
                        <p className="text-[10px] font-mono text-slate-500 tracking-wider mb-2.5">
                          REF: {product.sku}
                        </p>
                      )}

                      <p 
                        className="text-xs md:text-sm text-slate-400 line-clamp-2 leading-relaxed" 
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {product.keySpecs || product.description || 'Premium industrial design optimized for distribution integrity.'}
                      </p>
                    </div>
                  </div>

                  {/* Action Area */}
                  <div className="px-5 pb-5 pt-1 md:px-6 md:pb-6">
                    <div className="w-full py-2 px-3 bg-slate-800/30 hover:bg-red-600 border border-slate-800 hover:border-red-600 rounded-xl flex items-center justify-center text-slate-300 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-200 group/btn">
                      <span>View Specs</span>
                      <ChevronRight size={12} className="ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 border border-dashed border-slate-900 rounded-2xl bg-slate-900/10 max-w-md mx-auto">
              <Package size={40} className="mx-auto text-slate-800 mb-3" strokeWidth={1} />
              <h3 className="text-base font-bold text-slate-400 mb-1">Catalog Entry Empty</h3>
              <p className="text-slate-500 text-xs px-4">Our structural product suite is currently getting updated. Please revisit shortly.</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Popup */}
      <AnimatePresence>
        {selectedProductDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={() => setSelectedProductDetail(null)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.99 }}
              transition={{ type: "spring", damping: 25, stiffness: 380 }}
              className="relative bg-slate-900 border border-slate-800 rounded-xl w-full max-w-4xl overflow-hidden shadow-2xl my-auto max-h-[calc(100vh-2rem)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button Trigger */}
              <button
                onClick={() => setSelectedProductDetail(null)}
                className="absolute top-3 right-3 z-20 p-2 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-all duration-200 group"
              >
                <X size={16} className="group-hover:rotate-90 transition-transform duration-200" />
              </button>

              {/* Scrollable Container Box */}
              <div className="overflow-y-auto flex-1 dynamic-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-5">
                  
                  {/* Left Side: Product Image Display Panel */}
                  <div className="md:col-span-2 relative bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col justify-center items-center min-h-[220px] md:min-h-[380px]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.03),transparent_70%)] pointer-events-none" />
                    
                    {selectedProductDetail.category && (
                      <span className="absolute top-4 left-4 inline-block px-2 py-0.5 bg-red-950/40 border border-red-900/50 text-red-400 text-[9px] font-black uppercase tracking-widest rounded">
                        {selectedProductDetail.category}
                      </span>
                    )}

                    <div className="w-full aspect-square max-w-[180px] md:max-w-[200px] flex items-center justify-center py-2">
                      {selectedProductDetail.image ? (
                        <img
                          src={`http://localhost:5000/uploads/${selectedProductDetail.image}`}
                          alt={selectedProductDetail.name}
                          className="w-full h-full object-contain object-center max-h-[200px]"
                        />
                      ) : (
                        <Package size={54} className="text-slate-800" strokeWidth={1} />
                      )}
                    </div>
                  </div>

                  {/* Right Side: Specifications Panel */}
                  <div className="md:col-span-3 p-5 md:p-6 bg-slate-900/40 flex flex-col justify-between">
                    <div className="space-y-4 md:space-y-5">
                      <div>
                        <h2 className="text-lg md:text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {selectedProductDetail.name}
                        </h2>
                        {selectedProductDetail.sku && (
                          <p className="text-[10px] font-mono text-slate-500 mt-0.5">REF: {selectedProductDetail.sku}</p>
                        )}
                      </div>

                      <div>
                        <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Description</h4>
                        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
                          {selectedProductDetail.keySpecs || selectedProductDetail.description || 'Premium grade packaging component manufactured under structural quality guidelines.'}
                        </p>
                      </div>

                      <hr className="border-slate-800" />

                      <div>
                        <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">Structural Metrics</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {[
                            { label: 'Color Specs', value: selectedProductDetail.color, icon: <div className="w-2 h-2 rounded-full bg-slate-400" /> },
                            { label: 'Volume/Size', value: selectedProductDetail.size, icon: <Box size={12} className="text-slate-400" /> },
                            { label: 'Closure System', value: selectedProductDetail.capType, icon: <Settings size={12} className="text-slate-400" /> },
                            { label: 'Minimum MOQ', value: selectedProductDetail.moqPackaging, icon: <Layers size={12} className="text-slate-400" /> }
                          ].map((spec, i) => spec.value ? (
                            <div key={i} className="p-2.5 bg-slate-950/40 border border-slate-800/80 rounded-lg flex items-center gap-3">
                              <div className="w-7 h-7 rounded bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
                                {spec.icon}
                              </div>
                              <div className="min-w-0">
                                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-wider truncate">{spec.label}</p>
                                <p className="text-xs font-semibold text-slate-200 truncate">{spec.value}</p>
                              </div>
                            </div>
                          ) : null)}
                        </div>
                      </div>

                      {selectedProductDetail.usage && (
                        <div className="p-3 bg-slate-950/30 border border-slate-800/60 rounded-lg">
                          <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Applications</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">{selectedProductDetail.usage}</p>
                        </div>
                      )}
                    </div>

                    {/* Action Triggers Footer inside Right Box for structural layout */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-5 mt-5 border-t border-slate-800/60">
                      <button className="w-full sm:flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-200">
                        Request Quote
                      </button>
                      <button
                        onClick={() => setSelectedProductDetail(null)}
                        className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-200 border border-slate-750"
                      >
                        Dismiss
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Bottle