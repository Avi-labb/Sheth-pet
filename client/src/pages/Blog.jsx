import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, ArrowRight, X } from 'lucide-react'
import { blogAPI } from '../services/api'
import { resolveImageUrl } from '../utils/productImages'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const result = await blogAPI.getBlogs()
      if (result.ok) {
        setBlogs(result.data.blogs)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200
    const words = content ? content.split(' ').length : 0
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  const handleReadArticle = (blog) => {
    setSelectedBlog(blog)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedBlog(null), 300)
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 md:py-25 px-6 text-center relative overflow-hidden">
        <motion.div
          className="max-w-[800px] mx-auto relative z-10"
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

      <section className="py-16 md:py-25">
        <div className="max-w-9xl mx-auto px-6 md:px-12">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-slate-500">Loading...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  {blog.image ? (
                    <div className="h-[200px] bg-slate-100 overflow-hidden">
                      <img
                        src={resolveImageUrl(blog.image)}
                        alt={blog.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="h-[200px] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                      <span className="text-slate-300 text-sm">No Image</span>
                    </div>
                  )}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-4 flex-wrap">
                      {blog.tags && blog.tags.length > 0 && (
                        <span className="text-xs font-semibold text-red-600 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          {blog.tags[0]}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {blog.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-6 leading-relaxed line-clamp-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {blog.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <Calendar size={14} />
                        {formatDate(blog.createdAt)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <Clock size={14} />
                        {calculateReadTime(blog.content)}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleReadArticle(blog)}
                      className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-slate-200 bg-transparent text-slate-800 font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 hover:border-red-600 hover:text-red-600" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Read Article
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-9xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Stay Updated
            </h2>
            <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Subscribe to our newsletter to receive the latest insights and updates directly in your inbox.
            </p>
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border-2 border-red-600 bg-red-600 text-white font-semibold text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 hover:bg-red-700 hover:border-red-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Subscribe Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Blog Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-2xl max-w-7xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} className="text-slate-800" />
              </button>
              
              {/* Modal Body - Single Scroll Container */}
              <div className="overflow-y-auto w-full max-h-[90vh]">
  <div className="grid grid-cols-1 md:grid-cols-2 items-start relative">
    
    {/* Sticky Image Section */}
    <div className="sticky top-0 z-10 bg-slate-100 w-full h-56 sm:h-72 md:h-full md:min-h-[90vh] md:max-h-[90vh] shrink-0 border-b md:border-b-0 md:border-r border-slate-200">
      {selectedBlog.image ? (
        <img
          src={resolveImageUrl(selectedBlog.image)}
          alt={selectedBlog.title}
          className="w-full h-full object-contain sm:object-cover"
        />
      ) : (
        <div className="flex items-center justify-center h-full min-h-[200px]">
          <span className="text-slate-400 text-base">No Image Available</span>
        </div>
      )}
    </div>

    {/* Content Section */}
    <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-start bg-white">
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        {selectedBlog.tags && selectedBlog.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {selectedBlog.tags.map((tag, idx) => (
              <span key={idx} className="text-xs font-semibold text-red-600 uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {selectedBlog.title}
      </h2>

      <div className="flex items-center gap-4 sm:gap-6 mb-6 flex-wrap border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
          <Calendar size={16} />
          {formatDate(selectedBlog.createdAt)}
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
          <Clock size={16} />
          {calculateReadTime(selectedBlog.content)}
        </div>
        {selectedBlog.author && (
          <div className="text-xs sm:text-sm text-slate-500 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
            By {selectedBlog.author}
          </div>
        )}
      </div>

      {selectedBlog.description && (
        <p className="text-base sm:text-lg text-slate-700 font-medium mb-6 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
          {selectedBlog.description}
        </p>
      )}

      <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-wrap" style={{ fontFamily: "'Inter', sans-serif" }}>
        {selectedBlog.content}
      </div>
    </div>

  </div>
</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Blog