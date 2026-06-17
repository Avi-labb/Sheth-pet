import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, ChevronRight, X, Box, Layers, Settings } from 'lucide-react'
import { productAPI } from '../../services/api'

const Caps = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedProductDetail, setSelectedProductDetail] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const result = await productAPI.getProducts('Caps')
        if (result.ok) {
          setProducts(result.data.products)
        }
      } catch (error) {
        console.error("Error fetching caps:", error)
      }
      setLoading(false)
    }
    
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-6 text-center">
        <motion.div
          className="max-w-[800px] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Caps
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
            Our complete range of cap solutions
          </p>
        </motion.div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-8 animate-pulse"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-slate-800 rounded-xl mb-6" />
                  <div className="h-6 bg-slate-800 rounded mb-3 w-3/4" />
                  <div className="h-4 bg-slate-800 rounded mb-2 w-full" />
                  <div className="h-4 bg-slate-800 rounded w-5/6" />
                </motion.div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  onClick={() => setSelectedProductDetail(product)}
                >
                  <div className="p-8">
                    <div className="w-16 h-16 mb-6 flex items-center justify-center bg-red-600/10 text-red-500 border border-red-500/20 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-all duration-200 overflow-hidden">
                      {product.image ? (
                        <img 
                          src={`http://localhost:5000/uploads/${product.image}`} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package size={28} />
                      )}
                    </div>
                    {product.category && (
                      <span className="inline-block px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full mb-3">
                        {product.category}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {product.name}
                    </h3>
                    {product.sku && (
                      <p className="text-slate-500 text-xs font-mono mb-4">{product.sku}</p>
                    )}
                    <p className="text-sm text-slate-400 leading-relaxed mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {product.keySpecs || product.description || 'Premium quality packaging solution'}
                    </p>
                    <div className="flex items-center text-red-500 text-sm font-medium">
                      View Details <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Package size={48} className="mx-auto text-slate-700 mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">No caps available yet</h3>
              <p className="text-slate-500">Check back soon for our complete range of caps</p>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProductDetail(null)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl shadow-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProductDetail(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-slate-800/50 hover:bg-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all duration-300 group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side - Image/Visual */}
                <div className="relative bg-gradient-to-br from-red-900/20 via-slate-900 to-slate-950 p-8 md:p-12 flex flex-col justify-center">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-600/10 rounded-full blur-2xl" />
                  
                  <div className="relative">
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 flex items-center justify-center bg-gradient-to-br from-red-600/20 to-red-600/5 border border-red-500/20 rounded-3xl overflow-hidden">
                      {selectedProductDetail.image ? (
                        <img
                          src={`http://localhost:5000/uploads/${selectedProductDetail.image}`}
                          alt={selectedProductDetail.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package size={64} className="text-red-500" />
                      )}
                    </div>
                    
                    <div className="text-center">
                      {selectedProductDetail.category && (
                        <span className="inline-block px-4 py-2 bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-4">
                          {selectedProductDetail.category}
                        </span>
                      )}
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {selectedProductDetail.name}
                      </h2>
                      {selectedProductDetail.sku && (
                        <p className="text-slate-500 text-sm font-mono">SKU: {selectedProductDetail.sku}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side - Details */}
                <div className="p-8 md:p-12 bg-slate-950/50">
                  <div className="space-y-6">
                    {/* Description */}
                    {selectedProductDetail.keySpecs && (
                      <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Overview</h4>
                        <p className="text-slate-300 leading-relaxed">
                          {selectedProductDetail.keySpecs}
                        </p>
                      </div>
                    )}

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProductDetail.color && (
                        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-full bg-slate-400" />
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Color</p>
                          </div>
                          <p className="text-slate-200 font-medium">{selectedProductDetail.color}</p>
                        </div>
                      )}
                      
                      {selectedProductDetail.size && (
                        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                              <Box size={14} className="text-slate-400" />
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Size</p>
                          </div>
                          <p className="text-slate-200 font-medium">{selectedProductDetail.size}</p>
                        </div>
                      )}
                      
                      {selectedProductDetail.capType && (
                        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                              <Settings size={14} className="text-slate-400" />
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cap Type</p>
                          </div>
                          <p className="text-slate-200 font-medium">{selectedProductDetail.capType}</p>
                        </div>
                      )}
                      
                      {selectedProductDetail.moqPackaging && (
                        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                              <Layers size={14} className="text-slate-400" />
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">MOQ</p>
                          </div>
                          <p className="text-slate-200 font-medium">{selectedProductDetail.moqPackaging}</p>
                        </div>
                      )}
                    </div>

                    {/* Usage */}
                    {selectedProductDetail.usage && (
                      <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-900/50 border border-slate-800 rounded-xl">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Applications</h4>
                        <p className="text-slate-300">{selectedProductDetail.usage}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 md:p-8 border-t border-slate-800 bg-slate-950">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="flex-1 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-red-600/20 hover:shadow-red-600/30">
                    Get Quote Now
                  </button>
                  <button
                    onClick={() => setSelectedProductDetail(null)}
                    className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 border border-slate-700">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Caps