import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock, IndianRupee, Users, Target, Award, Heart, GraduationCap, X, Upload, Send, FileText } from 'lucide-react'
import { careerAPI } from '../services/api'

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experienceYears: '',
    noticePeriod: 'Immediate',
    linkedinUrl: '',
    coverNote: '',
    resume: null
  });

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const result = await careerAPI.getCareers();
      if (result.ok) {
        setCareers(result.data.careers.filter(c => c.isActive));
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  // Lock body scroll when modal is open (Prevents double background scrolling on mobile)
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleOpenModal = (job = null) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setSubmitSuccess(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      experienceYears: '',
      noticePeriod: 'Immediate',
      linkedinUrl: '',
      coverNote: '',
      resume: null
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('experienceYears', formData.experienceYears);
      data.append('noticePeriod', formData.noticePeriod);
      data.append('linkedinUrl', formData.linkedinUrl);
      data.append('coverNote', formData.coverNote);
      if (formData.resume) {
        data.append('resume', formData.resume);
      }
      if (selectedJob) {
        data.append('jobId', selectedJob._id);
        data.append('postName', selectedJob.postName);
      }

      // Simulate API Submission
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: Heart, title: 'Health Insurance', desc: 'Comprehensive medical coverage' },
    { icon: Award, title: 'Learning & Development', desc: 'Continuous skill enhancement' },
    { icon: Users, title: 'Team Culture', desc: 'Collaborative work environment' },
    { icon: Target, title: 'Growth Opportunities', desc: 'Clear career progression paths' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 sm:py-25 px-4 sm:px-6 text-center">
        <motion.div
          className="max-w-[800px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Careers
          </h1>
          <p className="text-base sm:text-xl text-white/80 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
            Join our team and grow with us
          </p>
        </motion.div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-12 sm:py-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-3 sm:mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Why Work With Us?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                At Sheth PET & Polymers, we believe in creating a workplace where everyone can thrive. We value innovation, collaboration, and continuous learning.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Join us and be part of a team that's shaping the future of PET packaging.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="p-4 sm:p-6 bg-white border border-slate-200 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-sm">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <benefit.icon size={28} className="text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-0.5 sm:mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {benefit.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
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

      {/* Openings Section */}
      <section className="py-12 sm:py-25 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-2 sm:mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Current Openings
            </h2>
            <p className="text-sm sm:text-lg text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
              Find your dream job here
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-500">Loading openings...</p>
            </div>
          ) : careers.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm px-4">
              <p className="text-slate-500 text-sm sm:text-base">No current openings. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {careers.map((career, index) => (
                <motion.div
                  key={career._id}
                  className="p-5 sm:p-8 md:p-10 bg-white border border-slate-200 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-sm"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-2xl font-semibold text-slate-800 mb-2 sm:mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {career.postName}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                          <MapPin size={15} className="text-slate-400" />
                          {career.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                          <Clock size={15} className="text-slate-400" />
                          {career.employmentType}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                          <Users size={15} className="text-slate-400" />
                          {career.experience}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                          <GraduationCap size={15} className="text-slate-400" />
                          {career.education}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                          <IndianRupee size={15} className="text-slate-400" />
                          {career.salary}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleOpenModal(career)}
                      className="w-full md:w-auto active:scale-95 inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-lg border-2 border-red-600 bg-red-600 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 hover:bg-red-700 hover:border-red-700" 
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* General Submission Section */}
      <section className="py-12 sm:py-25">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-3 sm:mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Don't See The Right Fit?
            </h2>
            <p className="text-sm sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button 
              onClick={() => handleOpenModal(null)}
              className="w-full sm:w-auto active:scale-95 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border-2 border-slate-800 bg-slate-800 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 hover:bg-slate-900 hover:border-slate-900" 
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Submit Resume
            </button>
          </motion.div>
        </div>
      </section>

      {/* Mobile-Optimized Application Modal / Bottom Sheet */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-100 w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden relative"
            >
              {/* Modal Header - Fixed at Top */}
              <div className="bg-slate-900 px-5 py-4 sm:px-6 sm:py-5 text-white flex items-center justify-between shrink-0">
                <div className="pr-4">
                  <h3 className="text-lg sm:text-xl font-bold line-clamp-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {selectedJob ? `Apply for ${selectedJob.postName}` : 'Submit Your Resume'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {selectedJob ? `${selectedJob.location} • ${selectedJob.employmentType}` : 'General Talent Network'}
                  </p>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="p-5 sm:p-8 overflow-y-auto space-y-4">
                {submitSuccess ? (
                  <div className="text-center py-8 sm:py-10">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send size={24} className="sm:hidden" />
                      <Send size={28} className="hidden sm:block" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Application Submitted!</h4>
                    <p className="text-sm sm:text-base text-slate-600 mb-6 max-w-md mx-auto">
                      Thank you for applying. Our hiring team will review your details and reach out to you shortly.
                    </p>
                    <button
                      onClick={handleCloseModal}
                      className="w-full sm:w-auto px-6 py-3 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-900 transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3.5 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-base sm:text-sm text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="rahul@example.com"
                          className="w-full px-3.5 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-base sm:text-sm text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-base sm:text-sm text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Experience (Years) *
                        </label>
                        <input
                          type="number"
                          name="experienceYears"
                          min="0"
                          step="0.5"
                          required
                          value={formData.experienceYears}
                          onChange={handleInputChange}
                          placeholder="e.g. 3.5"
                          className="w-full px-3.5 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-base sm:text-sm text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Notice Period
                        </label>
                        <select
                          name="noticePeriod"
                          value={formData.noticePeriod}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-base sm:text-sm text-slate-800 bg-white"
                        >
                          <option value="Immediate">Immediate Joiner</option>
                          <option value="15 Days">15 Days</option>
                          <option value="1 Month">1 Month</option>
                          <option value="2 Months">2 Months</option>
                          <option value="3 Months">3 Months</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          LinkedIn Profile (Optional)
                        </label>
                        <input
                          type="url"
                          name="linkedinUrl"
                          value={formData.linkedinUrl}
                          onChange={handleInputChange}
                          placeholder="https://linkedin.com/in/..."
                          className="w-full px-3.5 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-base sm:text-sm text-slate-800"
                        />
                      </div>
                    </div>

                    {/* Mobile Touch-Optimized Resume Upload */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Attach Resume (PDF / DOC) *
                      </label>
                      <div className="relative border-2 border-dashed border-slate-300 hover:border-red-500 transition-colors rounded-xl p-4 bg-slate-50/50 text-center">
                        <input
                          id="resume-upload"
                          name="resume"
                          type="file"
                          required
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center justify-center pointer-events-none">
                          {formData.resume ? (
                            <div className="flex items-center gap-2 text-red-600 font-medium text-sm">
                              <FileText size={20} />
                              <span className="truncate max-w-[200px] sm:max-w-xs">{formData.resume.name}</span>
                            </div>
                          ) : (
                            <>
                              <Upload className="h-6 w-6 text-slate-400 mb-1" />
                              <span className="text-xs sm:text-sm font-semibold text-red-600">
                                Tap to choose document
                              </span>
                              <span className="text-[11px] text-slate-400 mt-0.5">PDF or DOCX up to 5MB</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Brief Note */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Brief Cover Note / Summary
                      </label>
                      <textarea
                        name="coverNote"
                        rows="3"
                        value={formData.coverNote}
                        onChange={handleInputChange}
                        placeholder="Tell us briefly about your experience..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-base sm:text-sm text-slate-800"
                      ></textarea>
                    </div>

                    {/* Modal Footer Actions - Stacks on mobile */}
                    <div className="pt-3 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="w-full sm:w-auto px-5 py-3 rounded-lg text-slate-600 font-semibold text-sm hover:bg-slate-100 transition-colors text-center"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto active:scale-95 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Careers