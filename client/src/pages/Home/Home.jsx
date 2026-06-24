import { motion, AnimatePresence } from 'framer-motion'

import { Box, Layers, Package, Settings, Target, Eye, ArrowUpRight, PhoneCall, X, CheckCircle2 } from 'lucide-react'

import { useState, useEffect } from 'react'

import { productAPI } from '../../services/api'

import { Link } from 'react-router-dom'

import Header from '../../components/Header/Header'
import NewProductPopup from '../../components/NewProductPopup'
import { useTheme } from '../../contexts/ThemeContext'

// Import client logos
import Abhay from '../../assets/images/images/ABHAY.png'
import Acpl from '../../assets/images/images/ACPL LOGO.png'
import Ashwin from '../../assets/images/images/ASHWIN HEALTHCARE.png'
import DrRashel from '../../assets/images/images/DR RASHEL BEAUTY.png'
import FlowerBrand from '../../assets/images/images/FLOWER BRAND.png'
import HerbalHills from '../../assets/images/images/HERBALHILLS.png'
import HiFiIndia from '../../assets/images/images/HI FI INDIA.png'
import Kalverts from '../../assets/images/images/KALVERTS.png'
import Mahida from '../../assets/images/images/MAHIDA & SONS.png'
import Optisol from '../../assets/images/images/Optisol Lenscare.png'
import Simandhar from '../../assets/images/images/SIMANDHAR.png'
import Soulflower from '../../assets/images/images/SOULFLOWER.png'
import Tiger from '../../assets/images/images/TIGER.png'

const Home = () => {
  const { theme } = useTheme()
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categories, setCategories] = useState(['Bottles', 'Jars', 'Caps', 'Preforms'])



  // Category data with icons and descriptions

  const categoryData = {

    'Bottles': {

      icon: Package,

      description: 'Premium PET bottles in various sizes and shapes',

      color: 'from-blue-500 to-cyan-500'

    },

    'Jars': {

      icon: Layers,

      description: 'High-quality jars for food and cosmetic products',

      color: 'from-purple-500 to-pink-500'

    },

    'Caps': {

      icon: Settings,

      description: 'Durable caps and closures for all your packaging needs',

      color: 'from-green-500 to-emerald-500'

    },

    'Preforms': {

      icon: Box,

      description: 'High-density, structurally consistent preforms optimized for seamless blow molding',

      color: 'from-orange-500 to-red-500'

    }

  }

  // Client logos data
  const clientLogos = [
    { src: Abhay, name: 'Abhay' },
    { src: Acpl, name: 'ACPL' },
    { src: Ashwin, name: 'Ashwin Healthcare' },
    { src: DrRashel, name: 'Dr Rashel Beauty' },
    { src: FlowerBrand, name: 'Flower Brand' },
    { src: HerbalHills, name: 'Herbal Hills' },
    { src: HiFiIndia, name: 'Hi Fi India' },
    { src: Kalverts, name: 'Kalverts' },
    { src: Mahida, name: 'Mahida & Sons' },
    { src: Optisol, name: 'Optisol Lenscare' },
    { src: Simandhar, name: 'Simandhar' },
    { src: Soulflower, name: 'Soulflower' },
    { src: Tiger, name: 'Tiger' },
  ];



  const fetchProducts = async (category) => {

    setLoadingProducts(true)

    try {

      const result = await productAPI.getProducts(category)

      if (result.ok) {

        setProducts(result.data.products)

      }

    } catch (error) {

      console.error("Error fetching products", error)

    }

    setLoadingProducts(false)

  }



  const fetchCategories = async () => {

    try {

      const result = await productAPI.getCategories()

      if (result.ok) {

        setCategories(result.data.categories)

      }

    } catch (error) {

      console.error("Error fetching categories", error)

    }

  }



  useEffect(() => {

    fetchCategories()

    fetchProducts(selectedCategory)

  }, [selectedCategory]);



  // Fallback products if no products exist in DB

  const fallbackProducts = [

    {

      icon: Box,

      title: 'PET Bottles',

      description: 'Wide range of PET bottles in various sizes and shapes optimized for pristine clarity.'

    },

    {

      icon: Layers,

      title: 'Jars & Containers',

      description: 'Premium quality jars engineered perfectly for food, cosmetics, and specialized items.'

    },

    {

      icon: Package,

      title: 'Preforms',

      description: 'High-density, structurally consistent preforms optimized for seamless blow molding.'

    },

    {

      icon: Settings,

      title: 'Caps & Closures',

      description: 'Complete structurally sound range of custom color caps for airtight product seals.'

    }

  ];
  const displayProducts = products.length > 0 ? products : fallbackProducts;
  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden min-h-screen">
      <NewProductPopup />
      <Header />
      <section className="relative min-h-screen flex flex-col justify-between lg:justify-end overflow-hidden bg-white dark:bg-slate-950">

        {/* Floating 3D Shapes - Only on larger screens */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-24 left-4 w-16 h-16 md:w-24 md:h-24 border border-red-500/30 rounded-full hidden lg:block"
            animate={{
              x: [0, 15, 0],
              y: [0, -15, 0],
              rotateZ: [0, 90, 0],
              rotateX: [0, 180, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeOut", times: [0, 0.5, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          />

          <motion.div
            className="absolute top-32 right-4 w-12 h-12 md:w-16 md:h-16 bg-red-600/20 rotate-45 hidden lg:block"
            animate={{
              x: [0, -10, 0],
              y: [0, 10, 0],
              rotateY: [0, 360, 0],
              rotateX: [0, 180, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeOut", times: [0, 0.5, 1], delay: 1.5 }}
            style={{ transformStyle: 'preserve-3d' }}
          />
        </div>

        {/* Cinematic Video Layer */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-80"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="https://res.cloudinary.com/drbd1v3ng/video/upload/Welcome_to_Radhe_Containers_1080p_xlg081.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="h-20 lg:hidden pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-12 pb-12 md:pb-15 pt-20 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 text-white tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Premium PET <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-700">
                Packaging Solutions
              </span>
            </h1>

            <p
              className="text-sm sm:text-base md:text-lg text-slate-300 mb-4 md:mb-6 max-w-md font-light leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              A state-of-the-art manufacturer producing high-performance polymer bottles, jars, preforms, and customized closures for global brands.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-red-600 text-white rounded-xl font-semibold text-xs uppercase tracking-widest w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2 hover:bg-red-700 transition-colors duration-200 shadow-lg shadow-red-600/20 group"
              >
                Explore Products
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </motion.button>

              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-white rounded-xl font-semibold text-xs uppercase tracking-widest w-full sm:w-auto px-8 py-4 text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all duration-200 shadow-sm"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

     
      {/* ================= ABOUT SECTION ================= */}
<section className="py-16 md:py-24 lg:py-32 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          {/* 
            CARD CONTAINER: 
            - Mobile: p-6 (Compact padding)
            - Tablet/Desktop: md:p-12 lg:p-16 (Deep, premium padding)
          */}
          <div className="rounded-2xl p-6 md:p-12 lg:p-16 shadow-xl md:shadow-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            
            {/* 
              GRID CONTROLLER: 
              - Mobile: 1 Column stack
              - Desktop: 12-Column grid to cleanly divide the pure text content 
            */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              
              {/* LEFT HALF (Desktop: 7 Columns) - Main Typography Branding */}
              <div className="lg:col-span-7">
                <span className="wwa-body block mb-3 text-xs font-bold tracking-[0.2em] uppercase text-[#A8312A]">
                  Who We Are
                </span>

                <h2 className="wwa-display text-2xl sm:text-4xl md:text-[2.8rem] font-semibold leading-[1.15] md:leading-[1.1] text-[#1A1815]">
                  Thirty years of <br className="hidden md:inline" />
                  moulding precision
                </h2>
                
                {/* Big Metric Display brought upfront for design balance on desktop */}
                <div className="flex items-end gap-4 mt-6 lg:mt-10">
                  <span className="wwa-display text-6xl md:text-7xl font-semibold leading-none text-[#A8312A]">
                    30+
                  </span>
                  <span className="wwa-body text-xs font-semibold uppercase tracking-[0.15em] leading-tight pb-1.5 text-[#6B6459]">
                    Years of<br />Engineering Excellence
                  </span>
                </div>
              </div>

              {/* RIGHT HALF (Desktop: 5 Columns) - Corporate Data & Details */}
              <div className="lg:col-span-5 lg:pt-8">
                <div className="space-y-4 mb-6">
                  <p className="wwa-body text-[15px] md:text-base leading-relaxed text-[#44403A]">
                    Established in <strong className="text-[#1A1815]">1996</strong>, Sheth PET And
                    Polymers Private Limited manufactures, sells and exports{" "}
                    <strong className="text-[#1A1815]">PET bottles, jars and preforms</strong>.
                  </p>
                  <p className="wwa-body text-[15px] md:text-base leading-relaxed text-[#44403A]">
                    We also manufacture a variety of <strong className="text-[#1A1815]">Caps</strong>.
                  </p>
                </div>

                <div className="h-px w-full mb-6 bg-[#E6E1D6]" />

                <div className="space-y-1.5 text-sm leading-relaxed text-[#6B6459]">
                  <p className="wwa-body">
                    A GST-registered <strong className="text-[#1A1815]">Limited Company</strong>
                    <span className="text-[#9C9587] block sm:inline sm:ml-1">· GST 27AABCS4075P1ZT</span>
                  </p>
                  <p className="wwa-body">
                    Manufacturing under one roof in Thane since day one.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>

      <section className="py-20 md:py-32 bg-white/95 relative">

        <div className="max-w-7xl mx-auto px-5 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-4 mb-12 md:mb-16"
          >

            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-red-500 uppercase block mb-2">Our Products</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Explore Categories
              </h2>
            </div>
            <p className="text-slate-700 font-semibold text-sm md:text-base max-w-md font-light leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Discover our complete range of packaging solutions designed for every industry need.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {categories.map((category, index) => {
              const data = categoryData[category] || {
                icon: Package,
                description: 'High-quality packaging products',
                color: 'from-gray-500 to-gray-600'
              };
              const Icon = data.icon;
              return (
                <Link
                  key={category}
                  to={`/products/${encodeURIComponent(category.toLowerCase())}`}
                >
                  <motion.div
                    className="p-6 md:p-8 bg-gradient-to-b from-slate-100 to-white/80 border border-slate-300 rounded-2xl relative group overflow-hidden cursor-pointer h-full shadow-sm hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                    whileHover={{ scale: 1.02, y: -6, borderColor: 'rgba(239, 68, 68, 0.3)' }}

                  >
                    {/* Gradient background overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${data.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                    {/* Icon */}

                    <div className={`w-14 h-14 md:w-16 md:h-16 mb-5 md:mb-6 flex items-center justify-center bg-gradient-to-br ${data.color}/10 border border-slate-200 rounded-2xl group-hover:border-red-500/30 transition-all duration-300`}>

                      <Icon size={28} className="text-slate-700 group-hover:text-red-600" />

                    </div>



                    {/* Title */}

                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

                      {category}

                    </h3>



                    {/* Description */}

                    <p className="text-sm md:text-base text-slate-600 font-semibold light leading-relaxed mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>

                      {data.description}

                    </p>



                    {/* CTA Button */}

                    <div className="flex items-center text-red-600 text-xs font-bold uppercase tracking-wider group-hover:text-red-700 transition-colors">

                      <span>View Products</span>

                      <ArrowUpRight size={14} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

                    </div>

                  </motion.div>

                </Link>

              );

            })}

          </div>

        </div>

      </section>
<section className="py-20 md:py-20 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
  <div className="w-full mx-auto px-5 md:px-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-12 md:mb-16"
    >
      <span className="text-xs font-bold tracking-[0.3em] text-red-500 uppercase block mb-2">Client Trust</span>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Our biggest testimonial is our client
      </h2>
      <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
        Long-standing clients who have trusted us with their packaging for over twenty years.
      </p>
    </motion.div>

    {/* Continuous scrolling container */}
    <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <div 
        className="flex gap-6 w-max animate-scroll"
        style={{
          animation: 'scroll 30s linear infinite' // Slowed down slightly for a smoother look
        }}
      >
        {/* Original Set */}
        {clientLogos.map((logo, index) => (
          <div
            key={`orig-${logo.name}-${index}`}
            className="flex-shrink-0 flex items-center justify-center w-32 md:w-48 h-20 md:h-28 bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="max-w-full max-h-full object-contain transition-all duration-300 hover:scale-105"
            />
          </div>
        ))}
        
        {/* Duplicate Set for Seamless Loop */}
        {clientLogos.map((logo, index) => (
          <div
            key={`dup-${logo.name}-${index}`}
            className="flex-shrink-0 flex items-center justify-center w-32 md:w-48 h-20 md:h-28 bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="max-w-full max-h-full object-contain transition-all duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* CSS Keyframes */}
  <style>{`
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-50% - 12px)); /* -50% plus half of the 24px (gap-6) layout gap */
      }
    }
    .animate-scroll:hover {
      animation-play-state: paused; /* Optional: pauses the marquee when a user hovers */
    }
  `}</style>
</section>


      {/* ================= INDUSTRIES WE SERVE ================= */}

      <section className="py-20 md:py-20 bg-white/95 border-y border-slate-400">

        <div className="max-w-7xl mx-auto px-5 md:px-12">

          <motion.div

            initial={{ opacity: 0, y: 20 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true, margin: "-100px" }}

            transition={{ duration: 0.6, ease: "easeOut" }}

            className="text-center mb-12 md:mb-16"

          >

            <span className="text-xs font-bold tracking-[0.2em] text-red-500 uppercase block mb-2">Industries We Serve</span>

            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

              Serving Diverse Sectors

            </h2>

            <p className="text-slate-600 font-semibold text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>

              Our packaging solutions cater to a wide range of industries with specialized requirements.

            </p>

          </motion.div>



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">

            {[

              { icon: Target, title: 'Pharmaceutical', description: 'GMP-compliant packaging for medicines and healthcare products.' },

              { icon: Eye, title: 'Cosmetic & Personal Care', description: 'Premium packaging for lotions, creams, and beauty products with custom finishes.' },

              { icon: Package, title: 'Food & Beverage', description: 'Food-safe PET bottles and jars for spices, juices, honey, and more.' },

              { icon: Settings, title: 'Home Care & Cleaning', description: 'Durable packaging for hand wash, dish wash, and household chemicals.' }

            ].map((industry, index) => (

              <motion.div

                key={index}

                className="p-6 md:p-8 bg-white/80 border border-slate-300 rounded-2xl relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-500"

                initial={{ opacity: 0, y: 20 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true, margin: "-100px" }}

                transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}

              >

                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl mb-5">

                  <industry.icon size={24} className="text-red-600" />

                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

                  {industry.title}

                </h3>

                <p className="text-xs md:text-sm text-slate-600 font-semibold light leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>

                  {industry.description}

                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>



      {/* ================= CLIENT TESTIMONIALS / LOGOS ================= */}

      





      {/* ================= CONTACT CTA ================= */}

      <section className="py-20 md:py-24 bg-gradient-to-br from-red-700 via-red-600 to-orange-600 relative overflow-hidden">

        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:20px_20px] md:bg-[size:24px_24px]" />



        <div className="max-w-5xl mx-auto px-5 md:px-6 relative z-10 text-center text-white">

          <motion.div

            initial={{ opacity: 0, y: 20 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true, margin: "-100px" }}

            transition={{ duration: 0.6, ease: "easeOut" }}

          >

            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

              Accelerate Your Logistics Production

            </h2>

            <p className="text-sm md:text-lg mb-8 md:mb-10 max-w-xl mx-auto opacity-90 font-light" style={{ fontFamily: "'Inter', sans-serif" }}>

            Connect directly with us to verify delivery timelines, blueprint tooling designs, and scale volume parameters
            </p>

            <motion.button

              whileHover={{ scale: 1.02 }}

              whileTap={{ scale: 0.97 }}

              transition={{ type: "spring", stiffness: 400, damping: 17 }}

              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-red-600 font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors duration-200 shadow-xl w-full sm:w-auto hover:bg-slate-100"

            >

              <PhoneCall size={14} />

              Contact Us Now

            </motion.button>

          </motion.div>

        </div>

      </section>



      {/* ================= PRODUCT DETAIL POPUP ================= */}

      <AnimatePresence>

        {selectedProduct && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"

            onClick={() => setSelectedProduct(null)}

          >

            {/* Backdrop */}

            <motion.div

              initial={{ opacity: 0 }}

              animate={{ opacity: 1 }}

              exit={{ opacity: 0 }}

              className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"

            />



            {/* Modal */}

            <motion.div

              initial={{ opacity: 0, y: 60, scale: 0.9 }}

              animate={{ opacity: 1, y: 0, scale: 1 }}

              exit={{ opacity: 0, y: 60, scale: 0.9 }}

              transition={{ type: "spring", damping: 25, stiffness: 300 }}

              className="relative bg-white border border-slate-200 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl shadow-slate-900/20"

              onClick={(e) => e.stopPropagation()}

            >

              {/* Close Button */}

              <button

                onClick={() => setSelectedProduct(null)}

                className="absolute top-6 right-6 z-10 p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl text-slate-600 hover:text-slate-900 transition-all duration-300 group"

              >

                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />

              </button>



              <div className="grid grid-cols-1 lg:grid-cols-2">

                {/* Left Side - Image/Visual */}

                <div className="relative bg-gradient-to-br from-red-50 via-slate-50 to-white p-8 md:p-12 flex flex-col justify-center">

                  <div className="absolute top-0 right-0 w-40 h-40 bg-red-100 rounded-full blur-3xl" />

                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-100 rounded-full blur-2xl" />



                  <div className="relative">

                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 flex items-center justify-center bg-gradient-to-br from-red-100 to-white border border-red-200 rounded-3xl overflow-hidden">

                      {selectedProduct.image ? (

                        <img

                          src={`http://localhost:5000/uploads/${selectedProduct.image}`}

                          alt={selectedProduct.name || selectedProduct.title}

                          className="w-full h-full object-cover"

                        />

                      ) : (

                        <Package size={64} className="text-red-600" />

                      )}

                    </div>



                    <div className="text-center">

                      {selectedProduct.category && (

                        <span className="inline-block px-4 py-2 bg-red-100 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-4">

                          {selectedProduct.category}

                        </span>

                      )}

                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

                        {selectedProduct.name || selectedProduct.title}

                      </h2>

                      {selectedProduct.sku && (

                        <p className="text-slate-500 text-sm font-mono">SKU: {selectedProduct.sku}</p>

                      )}

                    </div>

                  </div>

                </div>



                {/* Right Side - Details */}

                <div className="p-8 md:p-12 bg-slate-50">

                  <div className="space-y-6">

                    {/* Description */}

                    {(selectedProduct.keySpecs || selectedProduct.description) && (

                      <div className="p-6 bg-white border border-slate-200 rounded-2xl">

                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Overview</h4>

                        <p className="text-slate-700 leading-relaxed">

                          {selectedProduct.keySpecs || selectedProduct.description}

                        </p>

                      </div>

                    )}



                    {/* Specifications Grid */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      {selectedProduct.color && (

                        <div className="p-5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">

                          <div className="flex items-center gap-3 mb-2">

                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">

                              <div className="w-3 h-3 rounded-full bg-slate-400" />

                            </div>

                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Color</p>

                          </div>

                          <p className="text-slate-700 font-medium">{selectedProduct.color}</p>

                        </div>

                      )}



                      {selectedProduct.size && (

                        <div className="p-5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">

                          <div className="flex items-center gap-3 mb-2">

                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">

                              <Box size={14} className="text-slate-600" />

                            </div>

                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Size</p>

                          </div>

                          <p className="text-slate-700 font-medium">{selectedProduct.size}</p>

                        </div>

                      )}



                      {selectedProduct.capType && (

                        <div className="p-5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">

                          <div className="flex items-center gap-3 mb-2">

                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">

                              <Settings size={14} className="text-slate-600" />

                            </div>

                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cap Type</p>

                          </div>

                          <p className="text-slate-700 font-medium">{selectedProduct.capType}</p>

                        </div>

                      )}



                      {selectedProduct.moqPackaging && (

                        <div className="p-5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">

                          <div className="flex items-center gap-3 mb-2">

                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">

                              <Layers size={14} className="text-slate-600" />

                            </div>

                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">MOQ</p>

                          </div>

                          <p className="text-slate-700 font-medium">{selectedProduct.moqPackaging}</p>

                        </div>

                      )}

                    </div>



                    {/* Usage */}

                    {selectedProduct.usage && (

                      <div className="p-5 bg-gradient-to-r from-white to-slate-50 border border-slate-200 rounded-xl">

                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Applications</h4>

                        <p className="text-slate-700">{selectedProduct.usage}</p>

                      </div>

                    )}

                  </div>

                </div>

              </div>



              {/* Footer */}

              <div className="p-6 md:p-8 border-t border-slate-200 bg-white">

                <div className="flex flex-col sm:flex-row gap-4">

                  <button

                    className="flex-1 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-red-600/20 hover:shadow-red-600/30"

                  >

                    Get Quote Now

                  </button>

                  <button

                    onClick={() => setSelectedProduct(null)}

                    className="px-8 py-4 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 border border-slate-200"

                  >

                    Close

                  </button>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  );

};



export default Home;

