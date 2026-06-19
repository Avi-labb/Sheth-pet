import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, ChevronRight, X, Box, Layers, Settings, Filter } from 'lucide-react'
import { productAPI } from '../services/api'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState(['All', 'Bottles', 'Jars', 'Caps', 'Preforms'])
  const [loading, setLoading] = useState(false)
  const [selectedProductDetail, setSelectedProductDetail] = useState(null)

  const fetchProducts = async (category) => {
    setLoading(true)
    try {
      const result = await productAPI.getProducts(category === 'All' ? null : category)
      if (result.ok) {
        setProducts(result.data.products)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
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
      console.error("Error fetching categories:", error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts(selectedCategory)
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-500 selection:text-white">
      {/* Hero Header Section */}
     
      {/* Main Split Layout Workspace */}
      <div className="max-w-7xl   mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 mt-20 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: Categories (Sticky on Desktop, Horizontal Scroll on Mobile) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 z-30 bg-slate-50 lg:bg-transparent -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="bg-white/80 lg:bg-white/60 border  border-slate-500 rounded-none lg:rounded-2xl p-2 lg:p-5 backdrop-blur-md lg:backdrop-blur-none">
              
              {/* Desktop Sidebar Title */}
              <div className="hidden lg:flex items-center gap-2 mb-4 pb-3 border-b border-slate-400/60">
                <Filter size={16} className="text-red-500" />
                <span className="text-sm font-bold uppercase tracking-[0.15em] text-slate-700">Categories</span>
              </div>

              {/* Flex wrapper supporting horizontal scroll on mobile and stack on desktop */}
              <div className="flex flex-nowrap  lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 no-scrollbar">
                {categories.map((category) => {
                  const isActive = selectedCategory === category
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 lg:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 text-left w-auto lg:w-full border flex items-center justify-between group ${
                        isActive
                          ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/10'
                          : 'bg-white/60 lg:bg-transparent text-slate-700 border-slate-400 lg:border-transparent hover:text-slate-900 hover:bg-slate-200'
                      }`}
                    >
                      <span>{category}</span>
                      <ChevronRight 
                        size={12} 
                        className={`hidden lg:block transition-transform duration-200 ${
                          isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
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
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-slate-100/40 border border-slate-400 rounded-2xl overflow-hidden animate-pulse">
                    <div className="aspect-[4/3] bg-slate-400/20 w-full" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-slate-200/20 rounded w-1/4" />
                      <div className="h-5 bg-slate-200/20 rounded w-3/4" />
                      <div className="h-9 bg-slate-200/20 rounded w-full mt-3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              /* High-Fidelity Product Display Matrix */
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    className="bg-white border border-slate-400 rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between h-full relative shadow-sm"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.02 }}
                    whileHover={{ y: -4, borderColor: 'rgba(239, 68, 68, 0.25)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                    onClick={() => setSelectedProductDetail(product)}
                  >
                    <div>
                      {/* Interactive Visual Frame */}
                      <div className="relative aspect-[4/3] bg-slate-50 border-b border-slate-400/60 flex items-center justify-center overflow-hidden transition-colors duration-300">
                        {product.image ? (
                          <img
                            //src={`http://localhost:5000/uploads/${product.image}`}
                            src={`/uploads/${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-contain p-6 transform group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        ) : (
                          <div className="text-slate-300 flex flex-col items-center gap-1.5">
                            <Package size={32} strokeWidth={1} />
                            <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">Staging Frame</span>
                          </div>
                        )}

                        {product.category && (
                          <span className="absolute top-3 left-3 inline-block px-2 py-0.5 bg-white/90 text-slate-600 text-[8px] font-bold uppercase tracking-wider rounded border border-slate-400/80 backdrop-blur-sm">
                            {product.category}
                          </span>
                        )}
                      </div>

                      {/* Info Area */}
                      <div className="p-5">
                        <h3 
                          className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors duration-200 line-clamp-1 mb-0.5" 
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {product.name}
                        </h3>

                        {product.sku && (
                          <p className="text-[9px] font-mono text-slate-500 tracking-wider mb-2">
                            REF: {product.sku}
                          </p>
                        )}
                        
                        <p 
                          className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal" 
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {product.keySpecs || product.description || 'Premium design optimized for logistical distribution integrity.'}
                        </p>
                      </div>
                    </div>

                    {/* Button Zone */}
                    <div className="px-5 pb-5 pt-1">
                      <div className="w-full py-2 px-3 bg-slate-100 group-hover:bg-red-600 border border-slate-400 group-hover:border-red-600 rounded-xl flex items-center justify-center text-slate-600 group-hover:text-white text-[10px] font-bold uppercase tracking-wider transition-all duration-300 group/btn">
                        <span>Specifications</span>
                        <ChevronRight size={10} className="ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Empty Suite State */
              <div className="text-center py-20 border border-dashed border-slate-400 rounded-2xl bg-white/10 max-w-sm mx-auto">
                <Package size={36} className="mx-auto text-slate-500 mb-2" strokeWidth={1} />
                <h3 className="text-sm font-bold text-slate-600 mb-0.5">Category Empty</h3>
                <p className="text-slate-600 text-[12px] px-4">Our variant collection is currently being revised. Please toggle other tiers.</p>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Enterprise Custom Request Frame */}
      <section className="py-12 bg-white border-t border-slate-400 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Need Custom Technical Dimensions?
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mb-5 max-w-lg mx-auto leading-relaxed">
            We partner directly with industrial procurement leads to configure custom containers.
          </p>
          <button className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white text-[10px] font-bold uppercase tracking-widest transition-colors">
            Request Design Blueprint
          </button>
        </div>
      </section>

      {/* Dynamic Pop-up Modal Stage */}
      <AnimatePresence>
        {selectedProductDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={() => setSelectedProductDetail(null)}
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
            
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ type: "spring", damping: 28, stiffness: 400 }}
              className="relative bg-white border border-slate-400 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl my-auto max-h-[calc(100vh-2rem)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProductDetail(null)}
                className="absolute top-3 right-3 z-20 p-1.5 bg-slate-100/80 hover:bg-slate-200 border border-slate-400 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
              >
                <X size={14} />
              </button>

              <div className="overflow-y-auto flex-1 dynamic-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Left Plate Display */}
                  <div className="lg:col-span-5 relative bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-400 p-3 flex flex-col justify-center items-center min-h-[200px] lg:min-h-[380px]">
                    {selectedProductDetail.category && (
                      <span className="absolute top-4 left-4 inline-block px-3 py-0.5 bg-red-50/40 border border-red-400/40 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded">
                        {selectedProductDetail.category}
                      </span>
                    )}
                    <div className="w-full aspect-square max-w-[150px] lg:max-w-[450px] flex items-center justify-center transition-transform hover:scale-105 duration-500">
                      {selectedProductDetail.image ? (
                        <img
                          //src={`http://localhost:5000/uploads/${selectedProductDetail.image}`}
                          src={`/uploads/${selectedProductDetail.image}`}
                          alt={selectedProductDetail.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package size={48} className="text-slate-300" strokeWidth={1} />
                      )}
                    </div>
                  </div>

                  {/* Right Plate Specifications */}
                  <div className="lg:col-span-7 p-5 lg:p-6 bg-white/20 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-base lg:text-lg font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {selectedProductDetail.name}
                        </h2>
                        {selectedProductDetail.sku && (
                          <p className="text-[9px] font-mono text-slate-500 mt-0.5">SKU: {selectedProductDetail.sku}</p>
                        )}
                      </div>
                      <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">Structural Metrics</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { label: 'Color Variant', value: selectedProductDetail.color, icon: <div className="w-1.5 h-1.5 rounded-full bg-slate-400" /> },
                        { label: 'Volumetric Size', value: selectedProductDetail.size, icon: <Box size={10} className="text-slate-500" /> },
                        { label: 'Closure System', value: selectedProductDetail.capType, icon: <Settings size={10} className="text-slate-500" /> },
                        { label: 'Minimum MOQ', value: selectedProductDetail.moqPackaging, icon: <Layers size={10} className="text-slate-500" /> }
                      ].map((spec, i) => spec.value ? (
                        <div key={i} className="p-2 bg-slate-50/40 border border-slate-400/60 rounded-xl flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded bg-white border border-slate-400 flex items-center justify-center flex-shrink-0">
                            {spec.icon}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[7px] font-bold text-slate-500 uppercase tracking-wider">{spec.label}</p>
                            <p className="text-xs font-semibold text-slate-800 truncate">{spec.value}</p>
                          </div>
                        </div>
                      ) : null)}
                    </div>
                   
                    <hr className="border-slate-400/80" />

                    {/* Metric Specifications Grid */}
                    
                     <div>
                        <h4 className="text-[9px] mt-2 font-bold text-slate-500 uppercase tracking-widest mb-1.5">Description</h4>
                      <p className="text-xs lg:text-sm text-slate-700 leading-relaxed font-normal">
                        {selectedProductDetail.keySpecs || selectedProductDetail.description || 'Premium components manufactured under structural quality guidelines.'}
                      </p>
                    </div>
                      <div className="p-3 bg-slate-50/30 border border-slate-400/60 rounded-lg">
                        <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Applications</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{selectedProductDetail.usage}</p>
                      </div>
                    </div>

                    {/* Lower Controls */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-4 mt-6 border-t border-slate-400/60">
                      <button className="w-full sm:flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors">
                        Request Quote Now
                      </button>
                      <button
                        onClick={() => setSelectedProductDetail(null)}
                        className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors border border-slate-400"
                      >
                        Close
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

export default Products
