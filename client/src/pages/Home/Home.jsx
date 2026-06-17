import { motion, AnimatePresence } from 'framer-motion'

import { Box, Layers, Package, Settings, Target, Eye, ArrowUpRight, PhoneCall, X, CheckCircle2 } from 'lucide-react'

import { useState, useEffect } from 'react'

import { productAPI } from '../../services/api'

import { Link } from 'react-router-dom'

import Header from '../../components/Header/Header'

const Home = () => {

  const [products, setProducts] = useState([])

  const [loadingProducts, setLoadingProducts] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState(null)

  const [selectedCategory, setSelectedCategory] = useState(null)

  const [categories, setCategories] = useState([])



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

    'Containers': {

      icon: Box,

      description: 'Versatile containers for industrial and commercial use',

      color: 'from-orange-500 to-red-500'

    }

  }



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
    <div className="bg-slate-950 text-slate-100 overflow-hidden min-h-screen">
      <Header />
      <section className="relative min-h-screen flex flex-col justify-between lg:justify-end overflow-hidden bg-slate-950">

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
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 text-slate-900 tracking-tight leading-[1.1]"
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

      {/* ================= PRODUCTS SECTION ================= */}

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



      {/* ================= ABOUT SECTION ================= */}

      <section className="py-20 md:py-32 bg-white/95 border-y border-slate-400">

        <div className="max-w-7xl mx-auto px-5 md:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">



            <motion.div

              initial={{ opacity: 0, x: -30 }}

              whileInView={{ opacity: 1, x: 0 }}

              viewport={{ once: true, margin: "-100px" }}

              transition={{ duration: 0.7, ease: "easeOut" }}

              className="lg:col-span-7"

            >

              <span className="text-xs font-bold tracking-[0.2em] text-red-500 uppercase block mb-2">Who We Are</span>

              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

                Sheth PET And Polymers Private Limited

              </h2>

              <p className="text-base md:text-xl text-slate-700 mb-4 md:mb-6 font-light leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>

                Established in the year <strong className="font-semibold text-slate-900">1996</strong>, we are engaged in <strong className="font-semibold text-slate-900">manufacturing, selling and exporting</strong> of <strong className="font-semibold text-slate-900">PET bottles, Jars and Preforms.</strong> We also manufacture a variety of caps.

              </p>



              {/* Trust badges & info from reference website */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 mb-6">

                <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl flex items-center gap-3 hover:bg-slate-100 transition-colors">

                  <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />

                  <div>

                    <div className="text-[10px] text-slate-600 uppercase tracking-wider font-bold">Nature of Business</div>

                    <div className="text-sm text-slate-900 font-medium">Manufacturer</div>

                  </div>

                </div>

                <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl flex items-center gap-3 hover:bg-slate-100 transition-colors">

                  <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />

                  <div>

                    <div className="text-[10px] text-slate-600 uppercase tracking-wider font-bold">Legal Status</div>

                    <div className="text-sm text-slate-900 font-medium">Limited Company</div>

                  </div>

                </div>

                <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl flex items-center gap-3 hover:bg-slate-100 transition-colors">

                  <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />

                  <div>

                    <div className="text-[10px] text-slate-600 uppercase tracking-wider font-bold">GST Registration</div>

                    <div className="text-sm text-slate-900 font-medium">01-07-2017</div>

                  </div>

                </div>

                <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl flex items-center gap-3 hover:bg-slate-100 transition-colors">

                  <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />

                  <div>

                    <div className="text-[10px] text-slate-600 uppercase tracking-wider font-bold">GST No.</div>

                    <div className="text-sm text-slate-900 font-semibold">27AABCS4075P1ZT</div>

                  </div>

                </div>

              </div>



              <p className="text-sm text-slate-600 font-semibold leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>

                Our continuous investment in high-end automated tooling infrastructures guarantees client orders exit molding cycles with tight geometric tolerance tracking. Every tier follows a strict zero-compromise supervision model.

              </p>

            </motion.div>



            <motion.div

              initial={{ opacity: 0, x: 30 }}

              whileInView={{ opacity: 1, x: 0 }}

              viewport={{ once: true, margin: "-100px" }}

              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}

              className="lg:col-span-5"

            >

              <div className="relative p-10 md:p-12 bg-slate-50 border border-slate-300 rounded-2xl flex items-center justify-center text-center overflow-hidden shadow-lg group">

                <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-red-100 rounded-full blur-3xl pointer-events-none" />

                <div>

                  <div className="text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-600 to-red-800 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

                    25+

                  </div>

                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

                    Years of Engineering Excellence

                  </div>

                  <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200 inline-block shadow-sm">

                    <div className="text-xs text-slate-600 flex items-center justify-center gap-1.5">

                      📍 Thane, Maharashtra

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>





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

              Connect directly with our engineering floor managers to verify delivery timelines, blueprint tooling designs, and volume scale parameters.

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

