import { motion } from 'framer-motion'
import { Leaf, Recycle, Droplets, TrendingUp, Award, CheckCircle2 } from 'lucide-react'

const Sustainability = () => {
  const initiatives = [
    { icon: Recycle, title: 'Recyclable Materials', desc: '100% recyclable PET packaging' },
    { icon: Droplets, title: 'Water Conservation', desc: 'Advanced recycling and water efficient manufacturing' },
    { icon: TrendingUp, title: 'Energy Efficiency', desc: 'Solar-powered facilities and optimized processes' },
    { icon: Award, title: 'Carbon Neutral', desc: 'Working towards carbon neutrality by 2030' }
  ]

  const achievements = [
    { stat: '85%', label: 'Recyclable' },
    { stat: '40%', label: 'Less Energy' },
    { stat: '60%', label: 'Less Water' },
    { stat: '100%', label: 'Food Safe' }
  ]

  return (
    <div>
      <section className="bg-gradient-to-br from-green-700 to-emerald-800 py-25 px-6 text-center">
        <motion.div
          className="max-w-[800px] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Sustainability
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
            Committed to a greener future
          </p>
        </motion.div>
      </section>

      <section className="py-25">
        <div className="max-w-full mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="p-12 bg-white border-2 border-green-500 rounded-2xl text-center transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <div className="text-5xl md:text-6xl font-bold text-green-700 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {achievement.stat}
                </div>
                <div className="text-lg font-medium text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {achievement.label}
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
              Our Initiatives
            </h2>
            <p className="text-lg text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
              Every action counts towards a sustainable tomorrow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={index}
                className="p-12 bg-white border border-slate-200 rounded-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <initiative.icon size={48} className="mb-4 text-green-700" />
                <h3 className="text-xl font-semibold text-slate-800 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {initiative.title}
                </h3>
                <p className="text-base text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {initiative.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-25">
        <div className="max-w-[900px] mx-auto px-12">
          <div className="bg-gradient-to-br from-green-700 to-emerald-800 p-12 rounded-2xl text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Join Our Green Journey
              </h2>
              <p className="text-lg mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                Together, we can make a difference. Partner with us for sustainable packaging solutions.
              </p>
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border-2 border-white bg-white text-green-700 font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Sustainability
