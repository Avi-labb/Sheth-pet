import { motion } from 'framer-motion'
import { MapPin, Clock, DollarSign, Users, Target, Award, Heart } from 'lucide-react'

const Careers = () => {
  const openings = [
    {
      title: 'Senior Production Engineer',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '5+ years',
      salary: 'Competitive'
    },
    {
      title: 'Quality Control Supervisor',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '3+ years',
      salary: 'Competitive'
    },
    {
      title: 'Sales Manager',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '4+ years',
      salary: 'Competitive + Incentives'
    },
    {
      title: 'R&D Chemist',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '2+ years',
      salary: 'Competitive'
    }
  ]

  const benefits = [
    { icon: Heart, title: 'Health Insurance', desc: 'Comprehensive medical coverage' },
    { icon: Award, title: 'Learning & Development', desc: 'Continuous skill enhancement' },
    { icon: Users, title: 'Team Culture', desc: 'Collaborative work environment' },
    { icon: Target, title: 'Growth Opportunities', desc: 'Clear career progression paths' }
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
            Careers
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
            Join our team and grow with us
          </p>
        </motion.div>
      </section>

      <section className="py-25">
        <div className="max-w-[900px] mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Why Work With Us?
              </h2>
              <p className="text-base text-slate-600 mb-6 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                At Sheth PET & Polymers, we believe in creating a workplace where everyone can thrive. We value innovation, collaboration, and continuous learning.
              </p>
              <p className="text-base text-slate-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Join us and be part of a team that's shaping the future of PET packaging.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="p-6 bg-white border border-slate-200 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <benefit.icon size={32} className="text-red-600 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
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
              Current Openings
            </h2>
            <p className="text-lg text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
              Find your dream job here
            </p>
          </motion.div>

          <div className="space-y-6">
            {openings.map((opening, index) => (
              <motion.div
                key={index}
                className="p-10 bg-white border border-slate-200 rounded-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.3 } }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {opening.title}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <MapPin size={16} />
                        {opening.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <Clock size={16} />
                        {opening.type}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <Users size={16} />
                        {opening.experience}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <DollarSign size={16} />
                        {opening.salary}
                      </div>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border-2 border-red-600 bg-red-600 text-white font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 hover:bg-red-700 hover:border-red-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Apply Now
                  </button>
                </div>
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
              Don't See The Right Fit?
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border-2 border-slate-800 bg-slate-800 text-white font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 hover:bg-slate-900 hover:border-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Submit Resume
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Careers
