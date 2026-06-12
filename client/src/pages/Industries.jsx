import { motion } from 'framer-motion'
import { Utensils, Star, Activity, Home, Droplet, Box } from 'lucide-react'

const Industries = () => {
  const industries = [
    {
      icon: Utensils,
      title: 'Food & Beverage',
      description: 'Safe, reliable packaging for juices, water, sauces, and more.',
      features: ['Food grade materials', 'Crystal clear transparency', 'Long shelf life']
    },
    {
      icon: Star,
      title: 'Personal Care',
      description: 'Elegant packaging solutions for cosmetics, skincare, and beauty products.',
      features: ['Premium look & feel', 'Custom colors & finishes', 'Brand enhancement']
    },
    {
      icon: Activity,
      title: 'Pharmaceutical',
      description: 'GMP-compliant packaging for medicines, vitamins, and healthcare products.',
      features: ['Tamper evident', 'Child resistant options', 'Clean room manufacturing']
    },
    {
      icon: Home,
      title: 'Home Care',
      description: 'Durable packaging for detergents, cleaning solutions, and household products.',
      features: ['Chemical resistant', 'Strong & durable', 'Easy dispensing']
    },
    {
      icon: Droplet,
      title: 'Oils & Lubricants',
      description: 'Robust packaging solutions for edible oils, lubricants, and automotive fluids.',
      features: ['Leak proof', 'UV protection', 'High volume capacity']
    },
    {
      icon: Box,
      title: 'Industrial',
      description: 'Heavy-duty packaging for industrial chemicals and bulk materials.',
      features: ['Large format', 'Impact resistant', 'Custom specifications']
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
            Industries
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
            Serving diverse sectors with tailored solutions
          </p>
        </motion.div>
      </section>

      <section className="py-25">
        <div className="max-w-full mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                className="p-12 bg-white border border-slate-200 rounded-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="w-24 h-24 mb-6 flex items-center justify-center bg-gradient-to-br from-red-600/10 to-red-600/5 text-red-600 rounded-2xl">
                  <industry.icon size={52} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {industry.title}
                </h3>
                <p className="text-base text-slate-600 mb-6 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {industry.description}
                </p>
                <ul className="list-none">
                  {industry.features.map((feature, idx) => (
                    <li key={idx} className="py-1 text-sm text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {feature}
                    </li>
                  ))}
                </ul>
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
              Don't See Your Industry?
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              We specialize in creating custom packaging solutions for unique requirements. Whatever your industry, we can work together to find the perfect packaging solution.
            </p>
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border-2 border-red-600 bg-red-600 text-white font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 hover:bg-red-700 hover:border-red-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Discuss Your Needs
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Industries
