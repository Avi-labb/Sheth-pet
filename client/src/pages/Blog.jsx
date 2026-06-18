import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, BookOpen, FileText } from 'lucide-react'

const Insights = () => {
  const insights = [
    {
      category: 'Trends',
      title: 'The Future of PET Packaging',
      excerpt: 'Exploring emerging trends and innovations in sustainable PET packaging solutions.',
      date: 'May 15, 2026',
      readTime: '5 min read',
      icon: BookOpen
    },
    {
      category: 'Technology',
      title: 'Advanced Manufacturing Techniques',
      excerpt: 'How modern technology is revolutionizing PET bottle production.',
      date: 'May 10, 2026',
      readTime: '7 min read',
      icon: FileText
    },
    {
      category: 'Sustainability',
      title: 'Recycling and Circular Economy',
      excerpt: 'Our commitment to creating a sustainable future through recycling.',
      date: 'May 5, 2026',
      readTime: '6 min read',
      icon: BookOpen
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
            Insights
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
            News, articles, and industry updates
          </p>
        </motion.div>
      </section>

      <section className="py-25">
        <div className="max-w-full mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="h-[200px] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                  <insight.icon size={64} className="text-slate-300" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-semibold text-red-600 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {insight.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {insight.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {insight.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <Calendar size={14} />
                      {insight.date}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <Clock size={14} />
                      {insight.readTime}
                    </div>
                  </div>
                  <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-slate-200 bg-transparent text-slate-800 font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 hover:border-red-600 hover:text-red-600" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Read Article
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-[700px] mx-auto px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Stay Updated
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Subscribe to our newsletter to receive the latest insights and updates directly in your inbox.
            </p>
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border-2 border-red-600 bg-red-600 text-white font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 hover:bg-red-700 hover:border-red-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Subscribe Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Insights
