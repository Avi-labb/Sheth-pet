import { motion, AnimatePresence } from 'framer-motion'
import { Box, MapPin, ShieldCheck, Award,Layers, Package, Settings,Beaker, Target, Eye, ArrowUpRight, PhoneCall, X, Pill, Sparkles, Utensils, Factory, HomeIcon } from 'lucide-react'

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

// Import industry images
import PharmaImage from '../../assets/images/Pharna.png'
import PersonalCareImage from '../../assets/images/Personal Care.png'
import FoodBeveragesImage from '../../assets/images/Food & Beverages.png'
import HomeCareImage from '../../assets/images/Home care.png'
import IndustrialImage from '../../assets/images/Industrial.png'

// Import map image
import MapImage from '../../assets/Map.jpeg'

// Import product images
import BOTTLE from '../../assets/images/BOTTLE.png'
import CAP from '../../assets/images/CAP.png'
import PREFORMS from '../../assets/images/PREFORMS.png'
import JAR from '../../assets/images/JAR.png'

const CAROUSEL_DATA = [
  {
    id: 1,
    title: "Pharmaceutical",
    description: "High-grade, chemically inert bottles and specialized sealing tapes engineered for safe, contamination-free medical packaging.",
    tag: "Certified",
    image: PharmaImage,
    icon: <Pill className="w-6 sm:w-10 h-5 sm:h-8" />,
    link: "/pharmaceutical"
  },
  {
    id: 2,
    title: "Personal Care",
    description: "Premium, aesthetically sleek PET bottles and dispensing solutions designed for cosmetics, lotions, and luxury hygiene products.",
    tag: "Premium",
    image: PersonalCareImage,
    icon: <Sparkles className="w-6 sm:w-10 h-5 sm:h-8" />,
    link: "/personal-care"
  },
  {
    id: 3,
    title: "Food & Beverages",
    description: "FDA-approved, food-safe containers and non-slip safety elements built to handle varying storage temperatures seamlessly.",
    tag: "FDA Approved",
    image: FoodBeveragesImage,
    icon: <Utensils className="w-6 sm:w-10 h-5 sm:h-8" />,
    link: "/food-beverages"
  },
  {
    id: 4,
    title: "Home Care",
    description: "Durable, ergonomic packaging designed for household cleaners, detergents, and heavy-duty protective thermal insulation.",
    tag: "Eco-Friendly",
    image: HomeCareImage,
    icon :<HomeIcon className="w-6 sm:w-10 h-5 sm:h-8" />,
      link: "/home-care"
  },
  {
    id: 5,
    title: "Industrial",
    description: "High-tensile structural containers and industrial strength bonding adhesives built to withstand extreme mechanical stress.",
    tag: "Heavy Duty",
    image: IndustrialImage,
    icon: <Factory className="w-6 sm:w-10 h-5 sm:h-8" />,
    link: "/industrial"
  }
];



const Home = () => {
  const { theme } = useTheme()
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categories, setCategories] = useState(['Bottles', 'Jars', 'Caps', 'Preforms'])
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = CAROUSEL_DATA.length;
  
useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }, 1500);

    return () => clearInterval(timer);
  }, [totalItems]);


  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardClick = (index, link) => {
    if (index === activeIndex) {
      window.location.href = link;
    } else {
      setActiveIndex(index);
    }
  };


  const getCardStyles = (index) => {
    let offset = index - activeIndex;

    if (offset < -2) offset += totalItems;
    if (offset > 2) offset -= totalItems;

    // No blur on any cards
    const noBlur = "blur(0px)";
    
    // Adjust positions for mobile
    const sideOffset = isMobile ? "40%" : "55%";
    const farOffset = isMobile ? "75%" : "100%";

    switch (offset) {
      case 0: // Center (Front)
        return { x: "0%", scale: 1, zIndex: 30, opacity: 1, filter: noBlur };
      case 1: // Right side
        return { x: sideOffset, scale: 0.8, zIndex: 20, opacity: 0.7, filter: noBlur };
      case 2: // Far Right (Background)
        return { x: farOffset, scale: 0.6, zIndex: 10, opacity: 0.3, filter: noBlur };
      case -1: // Left side
        return { x: `-${sideOffset}`, scale: 0.8, zIndex: 20, opacity: 0.7, filter: noBlur };
      case -2: // Far Left (Background)
        return { x: `-${farOffset}`, scale: 0.6, zIndex: 10, opacity: 0.3, filter: noBlur };
      default:
        return { x: "0%", scale: 0.5, zIndex: 0, opacity: 0, filter: noBlur };
    }
  };


const categoryData = {
  'Bottles': {
    img: BOTTLE, // Replace with your actual image path
    description: 'Premium PET bottles in various sizes and shapes',
    color: 'from-blue-500 to-cyan-500'
  },
  'Jars': {
    img: JAR, // Replace with your actual image path
    description: 'High-quality jars for food and cosmetic products',
    color: 'from-purple-500 to-pink-500'
  },
  'Caps': {
    img: CAP, // Replace with your actual image path
    description: 'Durable caps and closures for all your packaging needs',
    color: 'from-green-500 to-emerald-500'
  },
  'Preforms': {
    img: PREFORMS, // Replace with your actual image path
    description: 'High-density, structurally consistent preforms optimized for seamless blow molding',
    color: 'from-orange-500 to-red-500'
  }
};
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
              <motion.a href='/products'
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-red-600 text-white rounded-xl font-semibold text-xs uppercase tracking-widest w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2 hover:bg-red-700 transition-colors duration-200 shadow-lg shadow-red-600/20 group"
              >
                Explore Products
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </motion.a>

              <motion.a href='/contact' 
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-white rounded-xl font-semibold text-xs uppercase tracking-widest w-full sm:w-auto px-8 py-4 text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all duration-200 shadow-sm"
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

     
  <section className="py-16 md:py-24 bg-gradient-to-b from-[#FAF9F6] to-white dark:from-slate-950 dark:to-slate-900 border-y border-neutral-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full"
        >
          {/* Main Layout Grid: Split 12-column setup for Content vs. Map Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center bg-white dark:bg-slate-950 rounded-3xl p-6 md:p-12 lg:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 dark:border-slate-800">
            
            {/* LEFT COLUMN: Strategic Copy & Corporate Metrics (7 Columns) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="block mb-3.5 text-xs font-bold tracking-[0.25em] uppercase text-[#A8312A]">
                  Who We Are
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.15]">
                  Thirty years of <br />
                  <span className="text-[#A8312A]">moulding precision</span>
                </h2>
              </div>

              {/* Core Descriptions */}
              <div className="space-y-4 max-w-xl">
                <p className="text-[16px] md:text-[17px] leading-relaxed text-neutral-700 dark:text-slate-300">
                  Established in <strong className="text-neutral-900 dark:text-white font-semibold">1996</strong>, 
                  Sheth PET And Polymers Private Limited manufactures, sells, and exports world-class{' '}
                  <span className="text-neutral-900 dark:text-white font-medium border-b-2 border-[#A8312A]/10">
                    PET bottles, jars, and preforms
                  </span>.
                </p>
                <p className="text-[16px] md:text-[17px] leading-relaxed text-neutral-700 dark:text-slate-300">
                  We leverage advanced state-of-the-art tooling to manufacture a versatile array of custom closure caps and specialized systems under one roof.
                </p>
              </div>

              <div className="h-px w-full bg-neutral-200/80 dark:bg-slate-800" />

              {/* Integrated Metrics & Capabilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                {/* Years Experience Metric */}
                <div className="flex items-center gap-4">
                  <div className="text-5xl md:text-5xl font-bold tracking-tight text-[#A8312A]">
                    30+
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-slate-400 leading-snug">
                    Years of Engineering<br />Excellence
                  </div>
                </div>

                {/* Footprint Indicator */}
                <div className="flex items-start gap-3 bg-neutral-50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-neutral-100 dark:border-slate-800/60">
                  <MapPin className="w-5 h-5 text-[#A8312A] shrink-0 mt-0.5" />
                  <div className="text-xs leading-normal text-neutral-700 dark:text-slate-400">
                    <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-0.5">Strategic Footprint</span>
                    Multilocation infrastructure serving domestic & international demands.
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Map Component Frame (5 Columns) */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <div className="relative group w-full max-w-[440px] aspect-[4/3] sm:aspect-square lg:aspect-[11/12] rounded-2xl overflow-hidden bg-neutral-50 dark:bg-slate-900 border border-neutral-100 dark:border-slate-800 shadow-[0_12px_40px_rgba(0,0,0,0.03)]  transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(168,49,42,0.05)]">
                            
                {/* Main Geographic Image Element */}
                <img
                  src={MapImage} 
                  alt="Sheth PET Regional Manufacturing & Facilities Footprint Map"
                  className="w-full h-full object-cover rounded-xl select-none mix-blend-multiply dark:mix-blend-normal dark:opacity-90 object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  draggable={false}
                />

                {/* Floating Map Label Badge */}
                <div className="absolute bottom-3 sm:bottom-6 left-6 z-20 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-lg shadow-md border border-neutral-200/50 dark:border-slate-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#A8312A] animate-ping" />
                  <span className="text-[8px] sm:text-[11px] font-bold tracking-wider text-neutral-800 dark:text-slate-200 uppercase">
                    Our Manufacturing Hubs
                  </span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>

<section className="relative w-full min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center bg-white/10 overflow-hidden py-8 md:py-12 px-4">
      <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-8 md:mb-16 space-y-2"
        >
          <span className="font-mono text-[11px] md:text-[13px] font-bold uppercase tracking-[0.2em] text-red-600 block">
            Industries We Serve
          </span>
          <h2 
            className="text-2xl md:text-4xl font-bold text-[#15171A] dark:text-[#F2F1ED] tracking-tight" 
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Serving Diverse Sectors
          </h2>
          <p className="text-xs md:text-sm text-[#5C6066] dark:text-[#9B9D9F] max-w-xl mx-auto leading-relaxed">
            Our custom containment structures cater to distinct commercial and industrial ecosystems with strict performance metrics.
          </p>
        </motion.div>

      {/* Main 3D Stage Viewport Container */}
      <div className="relative w-full max-w-5xl h-[320px] md:h-[380px] flex items-center justify-center persistent-3d-context">
        {CAROUSEL_DATA.map((item, index) => {
          const styles = getCardStyles(index);
          const isCenter = index === activeIndex;

          return (
            <motion.div
              key={item.id}
              className={`absolute w-[180px] sm:w-[280px] md:w-[400px] h-[280px] md:h-[350px] bg-white rounded-2xl shadow-xl border border-neutral-200 p-4 md:p-6 flex flex-col justify-between cursor-pointer group select-none`}
              animate={styles}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onClick={() => handleCardClick(index, item.link)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              

              {/* Card Foreground Content */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                
                {/* Header Row: Icon, Title & Badge */}
                <div className="flex flex-col gap-1 md:gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="p-1 md:p-2 bg-slate-50 rounded-lg text-slate-600 border border-slate-300 group-hover:border-red-300 group-hover:text-red-500 transition-colors duration-300">
                      {item.icon}
                    </div>

                  </div>
                  
                  <h3 className="text-sm md:text-lg font-bold text-neutral-800 tracking-wide mt-1">
                    {item.title}
                  </h3>
                  
                  <p className="text-[10px] md:text-xs text-slate-700 font-medium line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Centered Image Mockup Container */}
                <div className="w-full h-[90px] md:h-[140px] flex items-center justify-center mt-2 overflow-hidden rounded-xl bg-neutral-50/50 border border-dashed border-slate-200 group-hover:border-red-300 transition-colors">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-contain max-h-full max-w-full drop-shadow-md rounded-xl transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                </div>

                {/* Decorative Action Hint */}
                <div className="h-3 md:h-4 flex items-center justify-center mt-2">
                  {isCenter ? (
                    <div className="text-[10px] sm:text-[12px] md:text-xs font-bold text-red-500 tracking-wider uppercase animate-pulse">
                      View Details
                    </div>
                  ) : (
                    <div className="text-[10px] md:text-xs font-medium text-neutral-400 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Details
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      </section>
    
<section className="py-20 md:py-22 bg-white/95 relative border-t-1 border-slate-200">
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

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
      {categories.map((category, index) => {
        const data = categoryData[category] || {
          img: '/images/placeholder.jpg',
          description: 'High-quality packaging products',
          color: 'from-gray-500 to-gray-600'
        };

        return (
          <Link
            key={category}
            to={`/products/${encodeURIComponent(category.toLowerCase())}`}
          >
            <motion.div
              className="p-4 sm:p-6 md:p-8 bg-gradient-to-b from-slate-100 to-white/80 border border-slate-300 rounded-2xl relative group overflow-hidden cursor-pointer h-full shadow-sm hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ scale: 1.02, y: -6, borderColor: 'rgba(239, 68, 68, 0.3)' }}
            >
              {/* Gradient background overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${data.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              
              {/* Image replaces the Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-5 md:mb-6 overflow-hidden border border-slate-200 rounded-2xl group-hover:border-red-500/30 transition-all duration-300">
                <img 
                  src={data.img} 
                  alt={category} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {category}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base text-slate-600 font-semibold light leading-relaxed mb-4 sm:mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
                {data.description}
              </p>

              {/* CTA Button */}
              <div className="flex items-center text-red-600 text-[10px] sm:text-xs font-bold uppercase tracking-wider group-hover:text-red-700 transition-colors">
                <span>View Products</span>
                <ArrowUpRight size={12} sm:size={14} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
    <div className="relative w-full overflow-hidden ">
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

                         // src={`http://localhost:5000/uploads/${selectedProduct.image}`}
                          src={`/uploads/${selectedProduct.image}`}

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

