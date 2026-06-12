import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ExternalLink, Globe, MessageCircle, Share2 } from 'lucide-react'

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <footer className="bg-slate-900 text-white py-20 pb-8">
      <div className="max-w-full mx-auto px-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <div className="flex flex-col leading-tight mb-4">
              <span className="font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                SHETH
              </span>
              <span className="text-xs text-gray-400 font-medium tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                PET & POLYMERS
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              Precision PET Packaging. Bottles, jars, caps and preforms engineered for scale — since 1996.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-11 h-11 flex items-center justify-center bg-white/10 text-white rounded-lg transition-all duration-300 hover:bg-red-600 hover:-translate-y-1">
                <Globe size={20} />
              </a>
              <a href="#" className="w-11 h-11 flex items-center justify-center bg-white/10 text-white rounded-lg transition-all duration-300 hover:bg-red-600 hover:-translate-y-1">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="w-11 h-11 flex items-center justify-center bg-white/10 text-white rounded-lg transition-all duration-300 hover:bg-red-600 hover:-translate-y-1">
                <Share2 size={20} />
              </a>
              <a href="#" className="w-11 h-11 flex items-center justify-center bg-white/10 text-white rounded-lg transition-all duration-300 hover:bg-red-600 hover:-translate-y-1">
                <ExternalLink size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quick Links
            </h3>
            <ul className="list-none">
              <li className="mb-3">
                <a href="/products" className="text-gray-400 text-sm no-underline transition-all duration-300 hover:text-white hover:pl-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Products
                </a>
              </li>
              <li className="mb-3">
                <a href="/manufacturing" className="text-gray-400 text-sm no-underline transition-all duration-300 hover:text-white hover:pl-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Manufacturing
                </a>
              </li>
              <li className="mb-3">
                <a href="/about" className="text-gray-400 text-sm no-underline transition-all duration-300 hover:text-white hover:pl-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  About Us
                </a>
              </li>
              <li className="mb-3">
                <a href="/careers" className="text-gray-400 text-sm no-underline transition-all duration-300 hover:text-white hover:pl-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Careers
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Industries
            </h3>
            <ul className="list-none">
              <li className="mb-3">
                <a href="/industries" className="text-gray-400 text-sm no-underline transition-all duration-300 hover:text-white hover:pl-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Food & Beverage
                </a>
              </li>
              <li className="mb-3">
                <a href="/industries" className="text-gray-400 text-sm no-underline transition-all duration-300 hover:text-white hover:pl-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Personal Care
                </a>
              </li>
              <li className="mb-3">
                <a href="/industries" className="text-gray-400 text-sm no-underline transition-all duration-300 hover:text-white hover:pl-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Pharmaceuticals
                </a>
              </li>
              <li className="mb-3">
                <a href="/industries" className="text-gray-400 text-sm no-underline transition-all duration-300 hover:text-white hover:pl-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Home Care
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Contact
            </h3>
            <ul className="list-none">
              <li className="flex gap-3 mb-4 text-gray-400 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                <MapPin size={18} className="flex-shrink-0 text-red-600 mt-0.5" />
                <span>Sheth PET And Polymers Private Limited<br/>Unit No 510, B Wing, Lodha Supremus II,<br/>Road No 22, Wagle Industrial Estate,<br/>Thane - 400604, Maharashtra, India</span>
              </li>
              <li className="flex gap-3 mb-4 text-gray-400 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                <Phone size={18} className="flex-shrink-0 text-red-600 mt-0.5" />
                <span>+91 80478 33997</span>
              </li>
              <li className="flex gap-3 mb-4 text-gray-400 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                <Mail size={18} className="flex-shrink-0 text-red-600 mt-0.5" />
                <span>info@sethpet.com<br/>sales@sethpet.com</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div 
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-400 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            &copy; 2026 Sheth PET & Polymers. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 text-sm no-underline transition-all duration-300 hover:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 text-sm no-underline transition-all duration-300 hover:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
