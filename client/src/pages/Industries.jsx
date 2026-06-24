import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Phone, MapPin, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// Import all industry images
import pharma200ml from '../assets/images/industry/200ml Pharma PET Bottle.webp'
import pharma250ml from '../assets/images/industry/250ml Pharma PET Bottle.webp'
import pharma40ml from '../assets/images/industry/40ml Pharma PET Bottle.webp'
import pharma500ml from '../assets/images/industry/500ml Pharma Pet Bottle.png'
import cosmeticScrewCaps from '../assets/images/industry/Cosmetic-Screw-Caps.jpg'
import flipTopCapTablet from '../assets/images/industry/Flip Top Cap for Tablet Container.jpg'
import flipTopCap from '../assets/images/industry/Flip Top Cap.jpg'
import foodBigJar from '../assets/images/industry/Food big jar.webp'
import foodJar from '../assets/images/industry/Food jar.webp'
import goldenScrewCap from '../assets/images/industry/Golden Screw Cap.jpg'
import handWash from '../assets/images/industry/Hand wash.webp'
import pharmaBottles from '../assets/images/industry/Pharma-Bottles.jpg'
import plasticJarCap from '../assets/images/industry/Plastic Jar Cap.png'
import plasticSealCap from '../assets/images/industry/Plastic Seal Cap.jpg'
import bigHomeCare from '../assets/images/industry/big home care container.avif'
import cosmeticBottle from '../assets/images/industry/cosmetic-bottl.webp'
import cosmeticJarImg from '../assets/images/industry/cosmetic-jar.png'
import cosmeticSpray from '../assets/images/industry/cosmetic-spray.jpg'
import foodDrinkBottle from '../assets/images/industry/food drink bottle.jpg'
import foodBottle from '../assets/images/industry/food-bottle.jpg'
import hdpeContainers from '../assets/images/industry/hdpe-containers-500x500-1.webp'
import homeContainer from '../assets/images/industry/home.webp'
import productSample from '../assets/images/industry/images.jpg'
import petCosmetic from '../assets/images/industry/pet cosmetic.jpg'
import petLotionContainer from '../assets/images/industry/pet lotion container.jpg'
import petCreamJars from '../assets/images/industry/pet-cream-jars.jpg'
import pharmaGlassBottles from '../assets/images/industry/pharmaceutical-glass-bottles.webp'
import pushPullCap from '../assets/images/industry/push-pull-bottle-cap.webp'
import teaJar from '../assets/images/industry/tea jar.jpg'

const categories = [
  { name: 'All', link: null },
  { name: 'Pharmaceutical', link: '/pharmaceutical' },
  { name: 'Personal Care', link: '/personal-care' },
  { name: 'Food & Beverages', link: '/food-beverages' },
  { name: 'Home Care', link: '/home-care' },
  { name: 'Industrial', link: '/industrial' }
]

const products = [
  {
    name: '40ml Pharma PET Bottle',
    tag: 'Pharmaceutical',
    note: '40ml, clean-room moulded',
    image: pharma40ml,
  },
  {
    name: '200ml Pharma PET Bottle',
    tag: 'Pharmaceutical',
    note: '200ml, pharmaceutical grade',
    image: pharma200ml,
  },
  {
    name: '250ml Pharma PET Bottle',
    tag: 'Pharmaceutical',
    note: '250ml, tamper-evident',
    image: pharma250ml,
  },
  {
    name: '500ml Pharma PET Bottle',
    tag: 'Pharmaceutical',
    note: '500ml, high-quality',
    image: pharma500ml,
  },
  {
    name: 'Pharma Bottles Collection',
    tag: 'Pharmaceutical',
    note: 'Complete range for pharma packaging',
    image: pharmaBottles,
  },
  {
    name: 'Cosmetic Jar',
    tag: 'Personal Care',
    note: 'Cream jars, 50ml–200ml',
    image: cosmeticJarImg,
  },
  {
    name: 'Cosmetic Spray Bottle',
    tag: 'Personal Care',
    note: 'Fine-mist, 100ml',
    image: cosmeticSpray,
  },
  {
    name: 'PET Cosmetic Bottle',
    tag: 'Personal Care',
    note: 'Lotion & serum bottles',
    image: petCosmetic,
  },
  {
    name: 'Pet Lotion Container',
    tag: 'Personal Care',
    note: 'Premium cosmetic packaging',
    image: petLotionContainer,
  },
  {
    name: 'PET Cream Jars',
    tag: 'Personal Care',
    note: 'Luxury cosmetic containers',
    image: petCreamJars,
  },
  {
    name: 'Cosmetic Bottle',
    tag: 'Personal Care',
    note: 'Multi-purpose cosmetic bottle',
    image: cosmeticBottle,
  },
  {
    name: 'Juice & Beverage Bottle',
    tag: 'Food & Beverages',
    note: '200ml – 1000ml',
    image: foodDrinkBottle,
  },
  {
    name: 'Food Bottle',
    tag: 'Food & Beverages',
    note: 'Squash & juice bottles',
    image: foodBottle,
  },
  {
    name: 'Spice & Tea Jar',
    tag: 'Food & Beverages',
    note: '70ml – 200ml wide-mouth',
    image: teaJar,
  },
  {
    name: 'Food Jar',
    tag: 'Food & Beverages',
    note: 'Food-safe PET containers',
    image: foodJar,
  },
  {
    name: 'Food Big Jar',
    tag: 'Food & Beverages',
    note: 'Large capacity food storage',
    image: foodBigJar,
  },
  {
    name: 'Hand Wash Bottle',
    tag: 'Home Care',
    note: 'Trigger & flip-top ready',
    image: handWash,
  },
  {
    name: 'Home Care Container',
    tag: 'Home Care',
    note: 'Chemical-resistant packaging',
    image: homeContainer,
  },
  {
    name: 'HDPE Containers',
    tag: 'Home Care',
    note: 'Heavy-duty containers',
    image: hdpeContainers,
  },
  {
    name: 'Big Home Care Container',
    tag: 'Home Care',
    note: 'Large format packaging',
    image: bigHomeCare,
  },
  {
    name: 'Flip Top Cap',
    tag: 'Industrial',
    note: 'Easy-to-use flip top',
    image: flipTopCap,
  },
  {
    name: 'Flip Top Cap for Tablets',
    tag: 'Pharmaceutical',
    note: 'Child-resistant option',
    image: flipTopCapTablet,
  },
  {
    name: 'Cosmetic Screw Caps',
    tag: 'Personal Care',
    note: '19mm – 53mm',
    image: cosmeticScrewCaps,
  },
  {
    name: 'Golden Screw Cap',
    tag: 'Personal Care',
    note: 'Premium finish',
    image: goldenScrewCap,
  },
  {
    name: 'Plastic Jar Cap',
    tag: 'Food & Beverages',
    note: 'Wide-mouth jar caps',
    image: plasticJarCap,
  },
  {
    name: 'Plastic Seal Cap',
    tag: 'Industrial',
    note: 'Tamper-evident seals',
    image: plasticSealCap,
  },
  {
    name: 'Push Pull Bottle Cap',
    tag: 'Home Care',
    note: 'Convenient dispensing',
    image: pushPullCap,
  },
]

const credentials = [
  { label: 'Established', value: '1996' },
  { label: 'GST registered', value: '27AABCS4075P1ZT' },
  { label: 'Team', value: '150+ people' },
  { label: 'Annual turnover', value: '₹5–25 Cr' },
]

const Industries = () => {
  const [active, setActive] = useState('All')

  const filtered = useMemo(
    () => (active === 'All' ? products : products.filter((p) => p.tag === active)),
    [active]
  )

  return (
    <div className="bg-slate-50 text-slate-900">
      {/* ---------------- HERO ---------------- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-gradient-to-br from-slate-50 to-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 right-10 w-40 h-40 bg-red-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-60 h-60 bg-orange-100 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-12 py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <p className="text-xs font-bold tracking-[0.18em] mb-4 text-red-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Sheth PET &amp; Polymers · Thane
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Sixteen container lines.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  One mould shop you can call directly.
                </span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                We've moulded PET bottles, jars, caps and preforms in Thane
                since 1996 — for pharma labels, cosmetic brands, food
                packers and home-care manufacturers across India.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex gap-3 flex-shrink-0"
            >
              <a
                href="tel:08047833997"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm whitespace-nowrap bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                <Phone size={16} />
                Call now
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm whitespace-nowrap border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors"
              >
                Send enquiry
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          </div>

          {/* credentials strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {credentials.map((c) => (
              <div key={c.label} className="px-5 py-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {c.label}
                </p>
                <p className="text-base font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {c.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- FILTERABLE CATALOG ---------------- */}
      <section className="px-5 md:px-12 py-14 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Browse the range
            </h2>
            <p className="text-sm text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
              {filtered.length} of {products.length} product lines
            </p>
          </div>

          {/* filter chips */}
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by category">
            {categories.map((cat) => {
              const isActive = cat.name === active
              return cat.link ? (
                <Link
                  key={cat.name}
                  to={cat.link}
                  className="font-bold text-sm px-4 py-2 rounded-full border transition-all duration-300 inline-flex items-center gap-2"
                  style={{
                    background: isActive ? '#DC2626' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#475569',
                    borderColor: isActive ? '#DC2626' : '#E2E8F0',
                  }}
                >
                  {cat.name}
                  <ChevronRight size={14} />
                </Link>
              ) : (
                <button
                  key={cat.name}
                  onClick={() => setActive(cat.name)}
                  aria-pressed={isActive}
                  className="font-bold text-sm px-4 py-2 rounded-full border transition-all duration-300"
                  style={{
                    background: isActive ? '#DC2626' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#475569',
                    borderColor: isActive ? '#DC2626' : '#E2E8F0',
                  }}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>

          {/* product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, index) => (
                <motion.div
                  key={p.name + index}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-60 overflow-hidden bg-slate-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover p-4 transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <span
                      className="absolute top-2.5 left-2.5 font-bold text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-white/90 text-red-600 border border-red-100"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-[15px] font-bold leading-snug mb-1 text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {p.name}
                    </h3>
                    <p className="text-[13px] leading-snug text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {p.note}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT / LOCATION STRIP ---------------- */}
      <section className="px-5 md:px-12 pb-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl p-9 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-7 bg-gradient-to-br from-slate-900 to-slate-800"
          >
            <div className="max-w-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Need a container that's not listed here?
              </h2>
              <p className="text-sm md:text-base leading-relaxed mb-4 text-white/70" style={{ fontFamily: "'Inter', sans-serif" }}>
                We tool moulds to order. Tell us the volume, the neck size
                and what it's carrying — we'll quote a run.
              </p>
              <div className="flex items-center gap-2 text-sm text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                <MapPin size={15} />
                Wagle Industrial Estate, Thane – 400604
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-lg font-bold text-sm whitespace-nowrap self-start md:self-center bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Discuss your spec
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Industries