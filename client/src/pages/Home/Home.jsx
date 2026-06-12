import { motion } from 'framer-motion';
import { Box, Layers, Package, Settings, Target, Eye, ArrowUpRight, PhoneCall } from 'lucide-react';

const Home = () => {
  const products = [
    {
      icon: Box,
      title: 'PET Bottles',
      description: 'Wide range of PET bottles in various sizes and shapes optimized for pristine clarity.'
    },
    {
      icon: Layers,
      title: 'Jars & Containers',
      description: 'Premium quality jars engineered perfectly for food, cosmetics, and specialized items.'
    },
    {
      icon: Package,
      title: 'Preforms',
      description: 'High-density, structurally consistent preforms optimized for seamless blow molding.'
    },
    {
      icon: Settings,
      title: 'Caps & Closures',
      description: 'Complete structurally sound range of custom color caps for airtight product seals.'
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 overflow-hidden min-h-screen">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex flex-col justify-between lg:justify-end overflow-hidden bg-slate-950">
        
        {/* Floating 3D Shapes - Only on larger screens for performance */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-24 left-4 w-16 h-16 md:w-24 md:h-24 border border-red-500/30 rounded-full hidden lg:block"
            animate={{
              x: [0, 15, 0],
              y: [0, -15, 0],
              rotateZ: [0, 90, 0],
              rotateX: [0, 180, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeOut", times: [0, 0.5, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          />
          
          <motion.div
            className="absolute top-32 right-4 w-12 h-12 md:w-16 md:h-16 bg-red-600/20 rotate-45 hidden lg:block"
            animate={{
              x: [0, -10, 0],
              y: [0, 10, 0],
              rotateY: [0, 360, 0],
              rotateX: [0, 180, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeOut", times: [0, 0.5, 1], delay: 1.5 }}
            style={{ transformStyle: 'preserve-3d' }}
          />
        </div>

        {/* Cinematic Video Layer */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-80"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="https://res.cloudinary.com/drbd1v3ng/video/upload/Welcome_to_Radhe_Containers_1080p_xlg081.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
        </div>

        <div className="h-20 lg:hidden pointer-events-none" />

        {/* Hero Content Block */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-12 pb-12 md:pb-15 pt-20 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 text-white tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Premium PET <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-white">
                Packaging Solutions
              </span>
            </h1>

            <p 
              className="text-sm sm:text-base md:text-lg text-slate-300 mb-4 md:mb-6 max-w-md font-light leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              A state-of-the-art manufacturer producing high-performance polymer bottles, jars, preforms, and customized closures for global brands.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-red-600 text-white rounded-xl font-semibold text-xs uppercase tracking-widest w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2 hover:bg-red-700 transition-colors duration-200 shadow-lg shadow-red-600/20 group"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Explore Products
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </motion.button>

              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-white/5 backdrop-blur-md rounded-xl font-semibold text-xs uppercase tracking-widest w-full sm:w-auto px-8 py-4 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= PRODUCTS SECTION ================= */}
      <section className="py-20 md:py-32 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-4 mb-12 md:mb-16"
          >
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-red-500 uppercase block mb-2">Our Capabilities</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Product Matrix
              </h2>
            </div>
            <p className="text-slate-400 text-sm md:text-base max-w-md font-light leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Engineered execution meets high-volume consistency. Explore our diverse processing layouts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                className="p-6 md:p-8 bg-gradient-to-b from-slate-900 to-slate-900/40 border border-slate-800/80 rounded-2xl relative group overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ scale: 1.01, y: -3, borderColor: 'rgba(239, 68, 68, 0.3)' }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                <div className="w-10 h-10 md:w-12 md:h-12 mb-5 md:mb-6 flex items-center justify-center bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-all duration-200">
                  <product.icon size={18} className="md:size-[22px]" />
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {product.title}
                </h3>
                
                <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {product.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="py-20 md:py-32 bg-slate-900/40 border-y border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-red-500 uppercase block mb-2">Corporate Profile</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                An Ecosystem Built on Precision
              </h2>
              <p className="text-base md:text-xl text-slate-300 mb-4 md:mb-6 font-light leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Established in the year <strong className="font-semibold text-white">1996</strong>, Sheth PET and Polymers Pvt. Ltd. has stood at the intersection of quality design production and scalable wholesale systems.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                Our continuous investment in high-end automated tooling infrastructures guarantees client orders exit molding cycles with tight geometric tolerance tracking. Every tier follows a strict zero-compromise supervision model.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              <div className="relative p-10 md:p-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-center overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
                <div>
                  <div className="text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    25+
                  </div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Years of Engineering Excellence
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="py-20 md:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-slate-900/50 p-6 md:p-10 rounded-2xl border border-slate-900 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 mb-5 md:mb-6 flex items-center justify-center bg-red-500/10 text-red-500 rounded-xl border border-red-500/10">
                  <Target size={20} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Our Mission
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                  To engineer scalable, resource-efficient polymer packaging designs that enable modern production workflows to operate seamlessly across variable supply environments.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="bg-slate-900/50 p-6 md:p-10 rounded-2xl border border-slate-900 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 mb-5 md:mb-6 flex items-center justify-center bg-red-500/10 text-red-500 rounded-xl border border-red-500/10">
                  <Eye size={20} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Our Vision
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                  To scale global material production ecosystems by leading structural developments in sustainable rigidity transformations across technical packaging industries.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-red-700 via-red-600 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:20px_20px] md:bg-[size:24px_24px]" />
        
        <div className="max-w-5xl mx-auto px-5 md:px-6 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Accelerate Your Logistics Production
            </h2>
            <p className="text-sm md:text-lg mb-8 md:mb-10 max-w-xl mx-auto opacity-90 font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
              Connect directly with our engineering floor managers to verify delivery timelines, blueprint tooling designs, and volume scale parameters.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-red-600 font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors duration-200 shadow-xl w-full sm:w-auto hover:bg-slate-100"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <PhoneCall size={14} />
              Contact Us Now
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;