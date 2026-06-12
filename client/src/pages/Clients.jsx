import { motion } from 'framer-motion'
import { Users, Star, Quote, CheckCircle2 } from 'lucide-react'

const Clients = () => {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'Beverage Co.',
      text: 'Exceptional quality and reliability. Sheth PET has been our trusted partner for over a decade.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      company: 'Cosmetics Ltd',
      text: 'Their custom design capabilities and attention to detail are unmatched. Highly recommended!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      company: 'Pharma Global',
      text: 'GMP compliant and perfect for our pharmaceutical packaging needs. Great service team.',
      rating: 5
    }
  ]

  const clientLogos = ['Client A', 'Client B', 'Client C', 'Client D', 'Client E', 'Client F']

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
            Our Clients
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
            Trusted by leading brands worldwide
          </p>
        </motion.div>
      </section>

      <section className="py-25">
        <div className="max-w-full mx-auto px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              What Our Clients Say
            </h2>
            <p className="text-lg text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
              Real feedback from real partners
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-12 bg-slate-50 rounded-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Quote size={48} className="mb-4 text-red-600 opacity-50" />
                <p className="text-base text-slate-600 mb-6 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {testimonial.text}
                </p>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-amber-500" fill="currentColor" />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600/10 to-red-600/5 flex items-center justify-center text-red-600 font-bold text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-25 bg-slate-50">
        <div className="max-w-full mx-auto px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Trusted Partners
            </h2>
            <p className="text-lg text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
              Companies that rely on us
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                className="p-10 bg-white border border-slate-200 rounded-2xl flex items-center justify-center transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <span className="text-slate-400 font-semibold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {logo}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-25">
        <div className="max-w-[700px] mx-auto px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Join Our Growing Family
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Become part of our success story and experience the Sheth PET difference.
            </p>
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border-2 border-red-600 bg-red-600 text-white font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 hover:bg-red-700 hover:border-red-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Get Started
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Clients
