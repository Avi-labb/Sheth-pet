
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, ArrowDown, Eye, PenTool, Cpu, Factory, Download } from 'lucide-react'
import Header from '../components/Header/Header'
import videoFile from '../assets/manufacturing-video.mp4'

// Import color images
import AmberTransparent from '../assets/color/Amber Transparent .png'
import BloodRedOpaque from '../assets/color/Blood Red Opaque.png'
import BlueTransparent from '../assets/color/Blue Transparent.png'
import CellBlueOpaque from '../assets/color/Cell Blue Opaque.png'
import FrostFinishColour from '../assets/color/Frost finish Colour.png'
import FrostFinish from '../assets/color/Frost finish.png'
import LightAmber from '../assets/color/Light Amber.png'
import NoniGreenTransparent from '../assets/color/Noni Green Transparent.png'
import OliveGreenTransparent from '../assets/color/Olive Green Transparent.png'
import PeacockGreenOpaque from '../assets/color/Peacock Green Opaque.png'
import PinkKCOpaque from '../assets/color/Pink KC Opaque.png'
import SeaBlueOpaque from '../assets/color/Sea Blue Opaque.png'
import SkyBlueTransparent from '../assets/color/Sky Blue Transparent.png'
import StarBlueTransparent from '../assets/color/Star Blue Transparent.png'
import StarPinkTransparent from '../assets/color/Star Pink Transparent.png'
import ToyoRedTransparent from '../assets/color/Toyo Red Transparent.png'
import VioletOpaque from '../assets/color/Violet Opaque.png'
import YellowOpaque from '../assets/color/Yellow Opaque.png'
import BlackOpaque from '../assets/color/black opaque.png'
import WhiteOpaque from '../assets/color/white opaque.png'

// Import color palette PDF
import ColorPalettePDF from '../assets/Colour Palette.pdf'

const Innovate = () => {
  const colorOptions = [
    { name: 'Amber Transparent', image: AmberTransparent },
    { name: 'Blood Red Opaque', image: BloodRedOpaque },
    { name: 'Blue Transparent', image: BlueTransparent },
    { name: 'Cell Blue Opaque', image: CellBlueOpaque },
    { name: 'Frost Finish Colour', image: FrostFinishColour },
    { name: 'Frost Finish', image: FrostFinish },
    { name: 'Light Amber', image: LightAmber },
    { name: 'Noni Green Transparent', image: NoniGreenTransparent },
    { name: 'Olive Green Transparent', image: OliveGreenTransparent },
    { name: 'Peacock Green Opaque', image: PeacockGreenOpaque },
    { name: 'Pink KC Opaque', image: PinkKCOpaque },
    { name: 'Sea Blue Opaque', image: SeaBlueOpaque },
    { name: 'Sky Blue Transparent', image: SkyBlueTransparent },
    { name: 'Star Blue Transparent', image: StarBlueTransparent },
    { name: 'Star Pink Transparent', image: StarPinkTransparent },
    { name: 'Toyo Red Transparent', image: ToyoRedTransparent },
    { name: 'Violet Opaque', image: VioletOpaque },
    { name: 'Yellow Opaque', image: YellowOpaque },
    { name: 'Black Opaque', image: BlackOpaque },
    { name: 'White Opaque', image: WhiteOpaque },
  ];
  const processSteps = [
  { 
    icon: Eye, 
    title: 'Your Vision', 
    desc: 'Understanding your brand, requirements, and packaging goals to define the perfect custom solution.',
    colorClass: 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/20',
    badge: 'Phase 01'
  },
  { 
    icon: PenTool, 
    title: 'Design Development', 
    desc: 'Creating engineering specifications, exact technical drawings, and high-fidelity 3D models.',
    colorClass: 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/20',
    badge: 'Phase 02'
  },
  { 
    icon: Cpu, 
    title: 'Prototype', 
    desc: 'Rapid 3D printing and physical prototyping to thoroughly analyze form, fit, and aesthetic function.',
    colorClass: 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-emerald-500/20',
    badge: 'Phase 03'
  },
  { 
    icon: Factory, 
    title: 'Production', 
    desc: 'Advanced industrial manufacturing combined with rigorous quality control checks for absolute consistency.',
    colorClass: 'bg-gradient-to-br from-orange-500 to-red-500 shadow-orange-500/20',
    badge: 'Phase 04'
  }
];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden min-h-screen">
      <Header />
      
      {/* Hero Section with Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={videoFile} type="video/mp4" />
          </video>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex mt-10 gap-2 px-4 py-2 bg-red-700/20 border border-red-700/30 rounded-full text-xs font-bold text-red-800 tracking-wider uppercase mb-6">
              <Sparkles size={14} /> Innovation Lab
            </span>
            
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-bold text-slate-900 mb-3 tracking-tight leading-[1.1]">
              From Sketches<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-700">
                To Shelves
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-900 mx-auto mb-10 font-semibold leading-relaxed">
              We develop custom PET packaging that is engineered for your brand.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-red-600/20 transition-all"
            >
              Start Your Project
              <ArrowUpRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </section>

<section className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
  <div className="max-w-6xl mx-auto px-6">
    
    {/* Section Header */}
    <div className="text-center mb-12">
      <motion.span 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-red-600 dark:text-red-500 font-bold tracking-[0.2em] uppercase text-xs block"
      >
        Our Journey
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white  tracking-tight"
      >
        From Vision to Reality
      </motion.h2>
    </div>

    {/* Timeline Container */}
    <div className="relative">
      {/* Sleeker Vertical Axis Line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-200 to-transparent dark:via-slate-800" />

      {processSteps.map((step, index) => {
        const Icon = step.icon;
        const isEven = index % 2 === 0;

        return (
          <div 
            key={index}
            className={`relative flex flex-col md:flex-row items-start md:items-center justify-between  ${
              isEven ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Timeline Dot (Slightly smaller, tighter ring layout) */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-4 h-4 rounded-full bg-red-600 dark:bg-red-500 border-2 border-slate-50 dark:border-slate-950 ring-2 ring-slate-200/50 dark:ring-slate-800/50"
              />
            </div>

            {/* Spacer to bring items closer to center axis line */}
            <div className="hidden md:block w-[46%]" />

            {/* Content Card Panel */}
            <motion.div 
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", duration: 0.6, delay: 0.05 }}
              className="pl-14 md:pl-0 w-full md:w-[46%]"
            >
              <div className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-xl shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-800/60 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-0.5">
                
                {/* Upper Header Row inside Card */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${step.colorClass} text-white shadow-md`}>
                    <Icon size={18} className="group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <span className="text-[12px] font-mono font-bold tracking-wider text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/40 px-2 py-0.5 rounded">
                    {step.badge}
                  </span>
                </div>

                {/* Text content */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-slate-600 font-medium dark:text-slate-400 leading-relaxed text-xs">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* Color Options Carousel */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-red-600 dark:text-red-500 font-bold tracking-[0.2em] uppercase text-xs block mb-4"
            >
              Our Colors
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6"
            >
              Choose Your Perfect Shade
            </motion.h2>
            <motion.a 
              href={ColorPalettePDF}
              download="Colour Palette.pdf"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-red-600/20 transition-all"
            >
              <Download size={16} />
              Download Colour Palette
            </motion.a>
          </div>
        </div>

        {/* First Row of Carousel - Moving Left */}
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -2000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...colorOptions, ...colorOptions].map((color, index) => (
              <div 
                key={`first-${index}`} 
                className="flex flex-col items-center gap-3 min-w-[200px] flex-shrink-0"
              >
                <div className="w-40 h-40 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-lg">
                  <img 
                    src={color.image} 
                    alt={color.name} 
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {color.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Moving Left with delay for stagger effect */}
        <div className="relative overflow-hidden mt-8">
          <motion.div 
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [-2000, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...colorOptions, ...colorOptions].map((color, index) => (
              <div 
                key={`second-${index}`} 
                className="flex flex-col items-center gap-3 min-w-[200px] flex-shrink-0"
              >
                <div className="w-40 h-40 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-lg">
                  <img 
                    src={color.image} 
                    alt={color.name} 
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {color.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-red-700 via-red-600 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Ready to Innovate?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
              Let's collaborate to create packaging that stands out on the shelves and performs in your supply chain.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-red-600 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-slate-100 transition-all duration-300"
            >
              Get in Touch
              <ArrowUpRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Innovate
