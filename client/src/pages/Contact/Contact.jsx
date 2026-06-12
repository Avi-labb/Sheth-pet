import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
            Get in touch with our team
          </p>
        </motion.div>
      </section>

      <section className="py-25">
        <div className="max-w-full mx-auto px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 md:p-8 rounded-2xl text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Get In Touch
                </h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0">
                      <MapPin size={24} className="text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Address
                      </h3>
                      <p className="text-white/70 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Industrial Estate, Mumbai, Maharashtra, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0">
                      <Phone size={24} className="text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Phone
                      </h3>
                      <p className="text-white/70 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                        +91 22 1234 5678
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0">
                      <Mail size={24} className="text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Email
                      </h3>
                      <p className="text-white/70 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                        info@shethpet.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white p-12 border border-slate-200 rounded-2xl">
                {formSubmitted ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 size={80} className="mx-auto mb-6 text-green-600" />
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Thank You!
                    </h2>
                    <p className="text-base text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                      We'll get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-slate-50 text-slate-800 font-medium text-base transition-all duration-300 focus:outline-none focus:border-red-600 focus:bg-white"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-slate-50 text-slate-800 font-medium text-base transition-all duration-300 focus:outline-none focus:border-red-600 focus:bg-white"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-slate-50 text-slate-800 font-medium text-base transition-all duration-300 focus:outline-none focus:border-red-600 focus:bg-white"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-slate-50 text-slate-800 font-medium text-base transition-all duration-300 focus:outline-none focus:border-red-600 focus:bg-white"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          placeholder="How can we help?"
                        />
                      </div>
                    </div>
                    <div className="mb-8">
                      <label className="block mb-2 text-sm font-semibold text-slate-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-slate-50 text-slate-800 font-medium text-base transition-all duration-300 focus:outline-none focus:border-red-600 focus:bg-white resize-none"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        placeholder="Tell us about your requirements..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border-2 border-red-600 bg-red-600 text-white font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 hover:bg-red-700 hover:border-red-700 hover:-translate-y-0.5 hover:shadow-xl"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Send Message
                      <Send size={20} />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
