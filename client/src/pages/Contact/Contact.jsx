import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Users, Award, AlertCircle, Package } from 'lucide-react'
import { contactAPI } from '../../services/api'

const Contact = () => {
  const location = useLocation()
  const { product, selectedColor } = location.state || {}
  
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    if (product) {
      let message = `I'm interested in: ${product.name}\n`
      if (product.sku) message += `SKU: ${product.sku}\n`
      if (selectedColor) message += `Color: ${selectedColor}\n`
      if (product.category) message += `Category: ${product.category}\n`
      message += '\nPlease provide more details about your requirements.'
      
      setFormData(prev => ({
        ...prev,
        subject: 'Product Inquiry - ' + product.name,
        message: message
      }))
    }
  }, [product, selectedColor])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Include product data in the form submission
      const submitData = {
        ...formData,
        product: product ? {
          id: product._id,
          name: product.name,
          sku: product.sku,
          category: product.category,
          color: selectedColor
        } : null
      }
      
      const result = await contactAPI.sendEnquiry(submitData)
      
      if (result.ok) {
        setFormSubmitted(true)
        setTimeout(() => {
          setFormSubmitted(false)
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        }, 3000)
      } else {
        setError(result.data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Encode address for Google Maps
  const address = "Sheth PET And Polymers Private Limited, Unit No 510, B Wing, Lodha Supremus II, Road No 22, Wagle Industrial Estate, Thane - 400604, Maharashtra, India"
  const encodedAddress = encodeURIComponent(address)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`

  return (
    <div className="bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex flex-col justify-center bg-gradient-to-br from-slate-50 to-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 right-10 w-40 h-40 bg-red-100 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-60 h-60 bg-orange-100 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <span className="text-xs font-bold tracking-[0.2em] text-red-500 uppercase block mb-4">Get In Touch</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.1]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Let's Talk About Your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Packaging Needs</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Ready to elevate your packaging? Reach out and let's discuss how we can create the perfect solution for your brand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: "Response Time", desc: "Within 24 business hours", color: "from-blue-500 to-cyan-500" },
              { icon: Users, title: "Dedicated Team", desc: "Expert sales & production team", color: "from-purple-500 to-pink-500" },
              { icon: Award, title: "28+ Years", desc: "Trusted by 300+ brands", color: "from-green-500 to-emerald-500" },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="p-6 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                  <p className="text-slate-600 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Contact Details
                </h2>
                <div className="space-y-6">
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group hover:bg-slate-50 p-3 -mx-3 rounded-xl transition-colors">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors">
                      <MapPin size={24} className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Address
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Sheth PET And Polymers Private Limited<br/>
                        Unit No 510, B Wing, Lodha Supremus II,<br/>
                        Road No 22, Wagle Industrial Estate,<br/>
                        Thane - 400604, Maharashtra, India
                      </p>
                    </div>
                  </a>

                  <a href="tel:+918047833997" className="flex items-start gap-4 group hover:bg-slate-50 p-3 -mx-3 rounded-xl transition-colors">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors">
                      <Phone size={24} className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Phone
                      </h3>
                      <p className="text-slate-600 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                        +91 80478 33997
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail size={24} className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Email
                      </h3>
                      <div className="text-slate-600 text-sm space-y-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <a href="mailto:info@sethpet.com" className="hover:text-red-600 transition-colors">info@sethpet.com</a><br/>
                        <a href="mailto:sales@sethpet.com" className="hover:text-red-600 transition-colors">sales@sethpet.com</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <a 
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-80 relative group"
              >
                <iframe
                  title="Google Maps"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
                  allowFullScreen
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-all">
                  <div className="opacity-0 group-hover:opacity-100 bg-white px-6 py-3 rounded-full shadow-lg text-slate-800 font-semibold text-sm">
                    Open in Google Maps
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="bg-white p-8 md:p-10 border border-slate-200 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Send Us a Message
                </h2>
                <p className="text-slate-600 mb-8 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Fill out the form and our team will get back to you within 24 business hours.
                </p>

                {/* Product Info Card */}
                {product && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Package size={32} className="text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {product.name}
                        </h3>
                        {product.sku && (
                          <p className="text-sm text-slate-600 font-mono">SKU: {product.sku}</p>
                        )}
                        {product.category && (
                          <p className="text-sm text-slate-600">Category: {product.category}</p>
                        )}
                        {selectedColor && (
                          <p className="text-sm text-slate-600">Selected Color: {selectedColor}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
                {formSubmitted ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 size={80} className="mx-auto mb-6 text-green-600" />
                    <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Thank You!
                    </h3>
                    <p className="text-base text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                      We've received your message and will get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {error && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                        <AlertCircle size={20} className="text-red-600" />
                        <p className="text-red-700 text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{error}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm transition-all duration-300 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm transition-all duration-300 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={isLoading}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm transition-all duration-300 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Subject *
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm transition-all duration-300 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          <option value="">Select a topic...</option>
                          <option value="product-inquiry">Product Inquiry</option>
                          <option value="custom-solution">Custom Packaging Solution</option>
                          <option value="bulk-order">Bulk Order</option>
                          <option value="sample-request">Sample Request</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-8">
                      <label className="block mb-2 text-sm font-semibold text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm transition-all duration-300 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        placeholder="Tell us about your packaging requirements..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-red-600 bg-red-600 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 hover:bg-red-700 hover:border-red-700 hover:-translate-y-0.5 hover:shadow-lg shadow-red-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {isLoading ? 'Sending...' : 'Send Enquiry'}
                      {!isLoading && <Send size={18} />}
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
