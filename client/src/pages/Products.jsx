import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Layers, Package, Settings, ChevronRight, ChevronDown } from 'lucide-react'

const Products = () => {
  const [expandedProduct, setExpandedProduct] = useState(null)

  const products = [
    {
      id: 0,
      icon: Box,
      title: 'PET Bottles',
      description: 'Wide range of PET bottles in various sizes and shapes for all your packaging needs.',
      features: ['50ml - 5L capacity', 'Custom shapes available', 'Food grade material', 'Leak proof'],
      details: 'Our PET bottles are manufactured using state-of-the-art technology, ensuring consistency and quality. Perfect for beverages, pharmaceuticals, cosmetics, and more.'
    },
    {
      id: 1,
      icon: Layers,
      title: 'Jars & Containers',
      description: 'Premium quality jars perfect for food, cosmetics, and personal care products.',
      features: ['Wide mouth design', 'Stackable options', 'UV protection', 'Airtight seals'],
      details: 'Our jars are designed for both functionality and aesthetics. Available in various sizes and colors to match your brand identity.'
    },
    {
      id: 2,
      icon: Package,
      title: 'Preforms',
      description: 'High-quality preforms engineered for consistent blow molding performance.',
      features: ['Precision engineering', 'Multiple neck finishes', 'Color customization', 'Fast turnaround'],
      details: 'Our preforms are made from high-grade PET resin, ensuring excellent clarity and strength. Perfect for all blow molding applications.'
    },
    {
      id: 3,
      icon: Settings,
      title: 'Caps & Closures',
      description: 'Complete range of caps and closures designed for perfect sealing and ease of use.',
      features: ['Various neck sizes', 'Child resistant options', 'Tamper evident', 'Custom branding'],
      details: 'We offer a wide variety of caps and closures, including screw caps, flip-top caps, and more, all designed for optimal performance and safety.'
    }
  ]

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-25 px-6 text-center">
        <motion.div
          className="max-w-[800px] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Our Products
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
            Complete range of PET packaging solutions
          </p>
        </motion.div>
      </section>

      <section className="py-25">
        <div className="max-w-full mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white border border-slate-200 rounded-2xl transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -15, transition: { duration: 0.3 } }}
              >
                <div className="p-12">
                  <div className="w-24 h-24 mb-6 flex items-center justify-center bg-gradient-to-br from-red-600/10 to-red-600/5 text-red-600 rounded-2xl">
                    <product.icon size={56} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {product.title}
                  </h3>
                  <p className="text-base text-slate-600 mb-6 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {product.description}
                  </p>
                  <ul className="list-none mb-6">
                    {product.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center gap-2 py-2 text-sm text-slate-600"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.15 + idx * 0.05 }}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <ChevronRight size={16} />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border-2 border-slate-200 bg-transparent text-slate-800 font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 hover:border-red-600 hover:text-red-600 hover:bg-red-50"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {expandedProduct === product.id ? 'Show Less' : 'Learn More'}
                    <motion.div
                      animate={{ rotate: expandedProduct === product.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>
                </div>
                <AnimatePresence>
                  {expandedProduct === product.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-slate-50 border-t border-slate-200"
                    >
                      <div className="p-12">
                        <h4 className="text-xl font-semibold text-slate-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          More Details
                        </h4>
                        <p className="text-base text-slate-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {product.details}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-full mx-auto px-12">
          <motion.div
            className="text-center max-w-[700px] mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Need Custom Packaging?
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              We work closely with you to create bespoke packaging solutions that perfectly match your brand and product requirements.
            </p>
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border-2 border-red-600 bg-red-600 text-white font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 hover:bg-red-700 hover:border-red-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Request Custom Quote
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Products
