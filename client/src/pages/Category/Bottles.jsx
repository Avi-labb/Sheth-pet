import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, ArrowUpRight, Filter } from 'lucide-react'
import { productAPI } from '../../services/api'
import { getProductImage, getProductColors } from '../../utils/productImages'
import bottleImage from '../../assets/Bottle Category.png'
import { sortFamilyFirst, filterProductsBySearch } from '../../utils/helper'
import SearchBar from '../../components/SearchBar/SearchBar'
const Bottles = () => {
 const navigate = useNavigate()
 const [products, setProducts] = useState([])
 const [filteredProducts, setFilteredProducts] = useState([])
 const [loading, setLoading] = useState(false)
 const [selectedColor, setSelectedColor] = useState({})
 const [searchQuery, setSearchQuery] = useState('')
 // Filter state
 const [neckSizes, setNeckSizes] = useState([])
 const [selectedNeckSizes, setSelectedNeckSizes] = useState([])
 const [volumeMin, setVolumeMin] = useState('')
 const [volumeMax, setVolumeMax] = useState('')
 const [weightMin, setWeightMin] = useState('')
 const [weightMax, setWeightMax] = useState('')

 const handleCustomize = (e, product) => {
 e.preventDefault()
 const color = selectedColor[product._id] || getProductColors(product)[0]
 navigate('/contact', { state: { product, selectedColor: color } })
 }

 const fetchProducts = async () => {
 setLoading(true)
 try {
 const result = await productAPI.getProducts(null, 'Bottles')
 if (result.ok) {
 const sortedProducts=sortFamilyFirst(result.data.products)
 setProducts(sortedProducts)
 setFilteredProducts(sortedProducts)
 }
 } catch (error) {
 console.error('Error fetching products:', error)
 }
 setLoading(false)
 }

 const fetchNeckSizes = async () => {
 try {
 const result = await productAPI.getNeckSizes()
 if (result.ok && result.data.neckSizes) {
 setNeckSizes(result.data.neckSizes)
 }
 } catch (error) {
 console.error('Error fetching neck sizes:', error)
 }
 }

 const applyFilters = () => {
 let filtered = [...products]

 // Neck size filter
 if (selectedNeckSizes.length > 0) {
 filtered = filtered.filter(p =>
 p.neckSize && selectedNeckSizes.includes(p.neckSize)
 )
 }

 // Volume filter
 if (volumeMin || volumeMax) {
 filtered = filtered.filter(p => {
 if (!p.volume) return false
 const vol = parseFloat(p.volume)
 if (isNaN(vol)) return false
 const min = volumeMin ? parseFloat(volumeMin) : -Infinity
 const max = volumeMax ? parseFloat(volumeMax) : Infinity
 return vol >= min && vol <= max
 })
 }

 // Weight filter
 if (weightMin || weightMax) {
 filtered = filtered.filter(p => {
 if (!p.weight) return false
 const wt = parseFloat(p.weight)
 if (isNaN(wt)) return false
 const min = weightMin ? parseFloat(weightMin) : -Infinity
 const max = weightMax ? parseFloat(weightMax) : Infinity
 return wt >= min && wt <= max
 })
 }

 setFilteredProducts(sortFamilyFirst(filtered))
 }

 // Handle neck size checkbox toggle
 const toggleNeckSize = (size) => {
 if (selectedNeckSizes.includes(size)) {
 setSelectedNeckSizes(selectedNeckSizes.filter(s => s !== size))
 } else {
 setSelectedNeckSizes([...selectedNeckSizes, size])
 }
 }

 useEffect(() => {
 fetchProducts()
 fetchNeckSizes()
 }, [])

 useEffect(() => {
 applyFilters()
 }, [applyFilters])

 return (
 <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-[#3FB893] selection:text-white">
 {/* HERO SECTION */}
 <section className="relative mt-20 sm:mt-20 overflow-hidden border-b border-gray-200 bg-white">
 <div
 className="absolute inset-0"
 style={{
 backgroundImage: `url(${bottleImage})`,
 backgroundSize: 'cover',
 backgroundPosition: 'center',
 }}
 />
 <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />

 <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-20 relative z-10">
 <div className="flex items-center gap-2 text-[11px] mt-5 sm:mt-20 sm:mb-56 sm:text-[15px] font-mono uppercase tracking-[0.2em] text-white mb-6">
 <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
 <span>/</span>
 <span className="text-white font-semibold">Bottles</span>
 </div>

 <div className="max-w-3xl">
 <h1
 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
 style={{ fontFamily: '"Space Grotesk", sans-serif' }}
 >
 Bottles <span className="text-red-600">Packaging.</span>
 </h1>
 <p className="text-sm sm:text-lg text-white font-medium leading-relaxed max-w-2xl">
 Premium quality bottles designed for various industries and applications.
 </p>
 </div>
 </div>
 </section>
 <section className="py-12 md:py-16">
 <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
 {/* LEFT SIDEBAR: FILTERS */}
 <aside className="lg:col-span-3 self-start -mx-4 px-4 sm:mx-0 sm:px-0">
 <div className="sticky top-24 h-fit bg-white lg:bg-transparent border lg:border-0 border-[#DEDDD6] p-4 lg:p-0 space-y-6">
 <div className="space-y-3">
 <div className="flex items-center gap-2 pb-2 border-b border-[#DEDDD6]">
 <Filter size={16} strokeWidth={1.5} className="text-red-600" />
 <span className="text-[12px] font-mono uppercase tracking-wider text-slate-800">Filters</span>
 </div>

 {/* Neck Size Filter */}
 {neckSizes.length > 0 && (
 <div className="space-y-3 pt-4 border-t border-[#DEDDD6]">
 <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Neck Size</h3>
 <div className="grid grid-cols-3 gap-2">
 {neckSizes.map((size) => (
 <label key={size} className="flex items-center gap-1.5 cursor-pointer">
 <input
 type="checkbox"
 checked={selectedNeckSizes.includes(size)}
 onChange={() => toggleNeckSize(size)}
 className="w-4 h-4 accent-red-600"
 />
 <span className="text-xs text-slate-700">{size}</span>
 </label>
 ))}
 </div>
 </div>
 )}

 {/* Volume Filter */}
 <div className="space-y-3 pt-4 border-t border-[#DEDDD6]">
 <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
 Volume
 </h3>
 <div className="grid grid-cols-2 gap-2">
 <div className="space-y-1">
 <label className="text-xs font-medium text-slate-600">Min (ml)</label>
 <input
 type="number"
 value={volumeMin}
 onChange={(e) => setVolumeMin(e.target.value)}
 className="w-full px-3 py-2 border border-slate-300 bg-white text-xs rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
 />
 </div>
 <div className="space-y-1">
 <label className="text-xs font-medium text-slate-600">Max (ml)</label>
 <input
 type="number"
 value={volumeMax}
 onChange={(e) => setVolumeMax(e.target.value)}
 className="w-full px-3 py-2 border border-slate-300 bg-white text-xs rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
 />
 </div>
 </div>
 </div>

 {/* Weight Filter */}
 <div className="space-y-3 pt-4 border-t border-[#DEDDD6]">
 <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Weight</h3>
 <div className="grid grid-cols-2 gap-2">
 <div className="space-y-1">
 <label className="text-xs font-medium text-slate-600">Min</label>
 <input
 type="number"
 value={weightMin}
 onChange={(e) => setWeightMin(e.target.value)}
 className="w-full px-3 py-2 border border-slate-300 bg-white text-xs rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
 />
 </div>
 <div className="space-y-1">
 <label className="text-xs font-medium text-slate-600">Max</label>
 <input
 type="number"
 value={weightMax}
 onChange={(e) => setWeightMax(e.target.value)}
 className="w-full px-3 py-2 border border-slate-300 bg-white text-xs rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
 />
 </div>
 </div>
 </div>
 </div>
 </div>
 </aside>

 {/* RIGHT SIDE: PRODUCTS */}
 <main className="lg:col-span-9">
 <div className="mb-8 space-y-5">
   <SearchBar
     variant="default"
     value={searchQuery}
     onChange={setSearchQuery}
     placeholder="Search Bottles..."
   />
   <div className="flex items-center justify-between pt-1 pb-3 border-b border-slate-600">
 <span className="font-mono text-[11px] uppercase tracking-wider text-slate-700">
 Class Classification Matrix
 </span>
 <span className="font-mono text-[10px] uppercase tracking-widest text-slate-700">
 Showing {filteredProducts.length} items
 </span>
 </div>
 </div>

 {loading ? (
 /* Seamless Grid Skeleton matching layout */
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {Array.from({ length: 6 }).map((_, index) => (
 <div key={index} className="bg-white aspect-[4/5] p-6 space-y-4 animate-pulse">
 <div className="aspect-square bg-[#FAFAF8]" />
 <div className="h-4 bg-[#FAFAF8] w-3/4" />
 <div className="h-3 bg-[#FAFAF8] w-1/2" />
 </div>
 ))}
 </div>
 ) : filteredProducts.length > 0 ? (
 /* Sharp Seamless Border Grid Matrix */
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {filteredProducts.map((product, index) => {
 const colors = getProductColors(product)
 const currentColor = selectedColor[product._id] || colors[0]
 const currentImage = getProductImage(product, currentColor)

 return (
 <motion.div
 key={product._id}
 className="group flex flex-col justify-between bg-[#FAFAF8] hover:bg-white transition-colors relative border border-[#DEDDD6]"
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.3, delay: index * 0.03 }}
 >
 <Link to={`/product/${product._id}`} className="flex-1 flex flex-col">
 <div className="relative aspect-[4/4] flex items-center justify-center overflow-hidden border-b border-[#DEDDD6]">
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
 <div className="text-[#C8C6BD] flex flex-col items-center gap-2">
 <Package size={32} strokeWidth={1} />
 <span className="text-[9px] font-mono tracking-[0.2em] uppercase">No media</span>
 </div>
 )}
 </div>

 <div className="p-4 flex-1 flex flex-col justify-between gap-3">
 <div className="space-y-1">
 {product.sku && (
 <span className="block font-medium text-[10px] text-slate-600">SKU · {product.sku}</span>
 )}
 <h3
 className="text-[16px] font-bold tracking-tight text-[#15171A] line-clamp-2 group-hover:text-red-600 transition-colors"
 style={{ fontFamily: "'Space Grotesk', sans-serif" }}
 >
 {product.name}
 </h3>
 </div>

 {colors.length > 0 && (
 <div className="space-y-2">
 <div className="flex items-center justify-between font-medium text-[9px] uppercase tracking-wider text-slate-600">
 <span className='text-slate-800'>Variant</span>
 <span className="text-[#15171A]">{currentColor}</span>
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
 ? 'bg-[#15171A] text-[#FAFAF8] border-[#15171A]'
 : 'bg-white text-slate-800 border-slate-500 hover:border-[#8C8E8A]'
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
 className="py-2 px-3 border border-slate-400 text-slate-900 text-[10px] font-medium uppercase tracking-wider text-center hover:border-[#8C8E8A] transition-colors flex items-center justify-center gap-1 group/btn"
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
 <div className="text-center py-24 border border-[#DEDDD6] bg-white max-w-md mx-auto">
 <Package size={28} className="mx-auto text-[#D4530F] mb-4" strokeWidth={1.5} />
 <h3 className="text-sm font-bold uppercase tracking-wide mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
 Class Vacant
 </h3>
 <p className="text-[#5C6066] text-xs px-8 leading-relaxed max-w-xs mx-auto">
 No active bottle metrics matched this profile configuration query. Select alternate configurations.
 </p>
 </div>
 )}
 </main>
 </div>
 </div>
 </section>
 </div>
 )
}

export default Bottles
