import { motion } from 'framer-motion'
import { Building, Users, Trophy, Target, Globe, Heart, Eye } from 'lucide-react'

const About = () => {
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
            About Us
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
            Our story, mission, and values
          </p>
        </motion.div>
      </section>

      <section className="py-25">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Who We Are
              </h2>
              <p className="text-lg text-slate-600 mb-6 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                Established in the year <strong>1996</strong>, Sheth PET and Polymers Pvt. Ltd. are engaged in manufacturing and wholesaling of Pharma PET Bottle, Tablet Containers, PET Bottles, PET Preforms, Food Flavour Bottles, Agrochemical PET Bottles, PET Jars, Plastic Caps and Juice Bottle.
              </p>
              <p className="text-base text-slate-600 mb-4 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                We have established a <strong>state-of-the-art infrastructural facility</strong>, which helps to bring forward a technically sound range of products for our clients. All these units are manned by highly knowledgeable and hardworking professionals. Our well-equipped and spacious working area ensures proper facilities while maintaining employee health and safety.
              </p>
              <p className="text-base text-slate-600 mb-4 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                We follow a <strong>quality-centric approach</strong>, ensuring that all production processes are carried out under strict supervision of quality controllers. This commitment has helped us carve a niche in the market and achieve significant milestones.
              </p>
              <p className="text-base text-slate-600 mb-6 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                All our products are manufactured using <strong>finest quality raw materials</strong> sourced from reliable vendors. They undergo strict testing under various conditions to ensure durability, efficiency, and non-breakable performance.
              </p>
              <p className="text-base text-slate-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Under the leadership of <strong>Mr. Viren Sheth (Director)</strong>, we have achieved remarkable growth. His guidance, along with our dedicated team, continues to inspire us to deliver the best products and services.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-full h-[450px] bg-gradient-to-br from-red-50 to-slate-50 rounded-2xl flex items-center justify-center border border-slate-200">
                <div className="text-center p-8">
                  <div className="text-7xl font-extrabold text-red-600 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>10+</div>
                  <div className="text-2xl font-semibold text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Years of Excellence</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-25 bg-slate-50">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-10 rounded-2xl border border-slate-200"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <Target className="text-red-600" size={28} />
                Our Mission
              </h3>
              <p className="text-base text-slate-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                To provide innovative and sustainable polymer solutions that empower our clients to excel in their respective markets.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white p-10 rounded-2xl border border-slate-200"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <Eye className="text-red-600" size={28} />
                Our Vision
              </h3>
              <p className="text-base text-slate-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                To be the global leader in high-performance polymer manufacturing, recognized for quality, integrity, and sustainability.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-25">
        <div className="max-w-7xl mx-auto px-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-12 text-center"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Company Factsheet
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Basic Information',
                items: [
                  { label: 'Nature', value: 'Manufacturer' },
                  { label: 'Additional', value: 'Factory / Office' },
                  { label: 'CEO', value: 'Virendra Sheth' },
                  { label: 'Employees', value: '11–25 People' },
                  { label: 'Turnover', value: '₹5–25 Cr' }
                ]
              },
              {
                title: 'Legal & GST',
                items: [
                  { label: 'GST No', value: '27AABCS4075P1ZT' },
                  { label: 'CIN', value: 'U28992MH1996PTC099561' },
                  { label: 'GST Date', value: '01-07-2017' },
                  { label: 'Firm', value: 'Limited Company' }
                ]
              },
              {
                title: 'Infrastructure',
                items: [
                  { label: 'Location', value: 'Urban' },
                  { label: 'Building', value: 'Permanent' },
                  { label: 'Premises', value: '500 sq.ft' },
                  { label: 'Space', value: 'Front Porch' }
                ]
              },
              {
                title: 'Company USP',
                content: 'Quality Testing Facilities Available'
              },
              {
                title: 'Payment & Shipment',
                items: [
                  { label: 'Payment', value: 'Cash, Card, Cheque, DD' },
                  { label: 'Shipment', value: 'By Road' },
                  { label: 'Packaging', value: 'Customized' }
                ]
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl border border-slate-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h4 className="text-lg font-semibold text-slate-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {card.title}
                </h4>
                {card.items ? (
                  <ul className="space-y-3 text-sm">
                    {card.items.map((item, i) => (
                      <li key={i} className="flex justify-between">
                        <span className="text-slate-500 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{item.label}:</span>
                        <span className="text-slate-700" style={{ fontFamily: "'Inter', sans-serif" }}>{item.value}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>{card.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-25">
        <div className="max-w-[900px] mx-auto px-12">
          <div className="bg-gradient-to-br from-red-600 to-red-700 p-12 rounded-2xl text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Join Our Team
              </h2>
              <p className="text-lg mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                We're always looking for talented individuals to join our growing family.
              </p>
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border-2 border-white bg-white text-red-600 font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                View Openings
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
