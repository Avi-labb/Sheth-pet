import { motion } from 'framer-motion'
import { Building, Settings, Zap, Shield, CheckCircle, Cog } from 'lucide-react'

const Manufacturing = () => {
  const processSteps = [
    {
      step: '01',
      title: 'Raw Material Selection',
      description: 'Premium food-grade PET resin sourced from trusted suppliers'
    },
    {
      step: '02',
      title: 'Preform Manufacturing',
      description: 'Injection molding with precision engineering for perfect preforms'
    },
    {
      step: '03',
      title: 'Blow Molding',
      description: 'Advanced stretch blow molding for consistent bottle quality'
    },
    {
      step: '04',
      title: 'Quality Control',
      description: 'Rigorous testing at every stage ensures product excellence'
    },
    {
      step: '05',
      title: 'Packaging & Delivery',
      description: 'Careful packaging and timely delivery to your doorstep'
    }
  ]

  const certifications = [
    { icon: Shield, title: 'ISO 9001', desc: 'Quality Management' },
    { icon: CheckCircle, title: 'FDA Approved', desc: 'Food Safety' },
    { icon: Zap, title: 'GMP Certified', desc: 'Good Manufacturing' },
    { icon: Cog, title: 'HACCP', desc: 'Hazard Analysis' }
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
            Manufacturing
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
            State-of-the-art facilities and processes
          </p>
        </motion.div>
      </section>

      <section className="py-25 bg-slate-50">
        <div className="max-w-[900px] mx-auto px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Our Manufacturing Process
            </h2>
            <p className="text-lg text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
              Precision engineering at every step
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 md:hidden"></div>
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex items-start gap-8 mb-12 relative ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-red-600 text-white rounded-full font-bold text-xl relative z-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {step.step}
                </div>
                <div className="flex-1 bg-white p-8 rounded-2xl border border-slate-200 max-w-[380px]">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
              Our Facilities
            </h2>
            <p className="text-lg text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
              Equipped with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="p-12 bg-white border border-slate-200 rounded-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Building size={48} className="mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Production Capacity
              </h3>
              <p className="text-base text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                Over 10 million units annually with scalable production capabilities
              </p>
            </motion.div>
            <motion.div
              className="p-12 bg-white border border-slate-200 rounded-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Settings size={48} className="mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Advanced Machinery
              </h3>
              <p className="text-base text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                Latest injection molding and blow molding equipment from global leaders
              </p>
            </motion.div>
            <motion.div
              className="p-12 bg-white border border-slate-200 rounded-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Shield size={48} className="mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Clean Rooms
              </h3>
              <p className="text-base text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                Class 100,000 clean room facilities for pharmaceutical packaging
              </p>
            </motion.div>
          </div>
        </div>
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
              Certifications
            </h2>
            <p className="text-lg text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
              Commitment to quality and safety
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="p-10 md:p-8 bg-white border-2 border-slate-200 rounded-2xl text-center transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <cert.icon size={48} className="text-red-600 mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {cert.title}
                </h3>
                <p className="text-sm text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {cert.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Manufacturing
