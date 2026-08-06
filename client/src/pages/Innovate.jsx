
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, Eye, PenTool, Cpu, Factory, Download } from 'lucide-react'
import videoFile from '../assets/desktopversion.mp4'
import mobileFile from '../assets/mobileversion.mp4'


// Import customization images
import ShapeImage from '../assets/images/botte.jpeg'
import ColourImage from '../assets/images/Colour.jpeg'
import FinishImage from '../assets/images/finish.jpeg'
import NeckImage from '../assets/images/neck.jpeg'
import BrandingImage from '../assets/images/WhatsApp Image 2026-07-01 at 10.11.38 PM.jpeg'

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
 const customizationItems = [
 { name: 'Shape', image: ShapeImage, desc: 'Custom geometric forms' },
 { name: 'Finish', image: FinishImage, desc: 'Matte, gloss, or texture' },
 { name: 'Neck', image: NeckImage, desc: 'Tailored dimensions' },
 { name: 'Branding', image: BrandingImage, desc: 'Precision engraving & logos' },
 { name: 'Colour', image: ColourImage, desc: 'Infinite palette options' },
 ];
 return (
 <div className="bg-white text-slate-900 overflow-hidden min-h-screen">

 {/* Hero Section with Video */}
 <section className="relative sm:min-h-screen flex items-center justify-center overflow-hidden">
 {/* Video Background */}
 <div className="absolute w-full h-full">
 <video
 className="hidden md:block w-full h-full object-cover"
 autoPlay
 muted
 loop
 playsInline
 >
 <source src={videoFile} type="video/mp4" />
 </video>
 <video
 autoPlay
 muted
 loop 
 playsInline
 className="block md:hidden w-full h-full object-cover"
 >
 <source src={mobileFile} type="video/mp4" />
 </video>

 </div>

 {/* Content */}
 <div className="relative z-10 max-w-9xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-24 md:py-32">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease: "easeOut" }}
 >
 <a className="inline-flex gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-700/20 border border-red-700/30 rounded-full text-[10px] sm:text-xs font-bold text-red-800 tracking-wider uppercase mb-4 sm:mb-6">
 <Sparkles size={12} sm:size={14} /> Innovation Lab
 </a>

 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-slate-900 mb-3 tracking-tight leading-[1.1]">
 From Sketches<br />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-700">
 To Shelves
 </span>
 </h1>

 <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-slate-900 mx-auto mb-6 sm:mb-10 font-semibold leading-relaxed">
 We develop custom PET packaging that is engineered for your brand.
 </p>

 <motion.a href="/contact"
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.97 }}
 className="inline-flex items-center gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-widest shadow-lg shadow-red-600/20 transition-all"
 >
 Start Your Project
 <ArrowUpRight size={14} sm:size={16} />
 </motion.a>
 </motion.div>
 </div>
 </section>

 <section className="py-12 sm:py-16 bg-slate-50 transition-colors duration-300 overflow-hidden">
 <div className="max-w-9xl mx-auto px-4 sm:px-20">

 {/* Section Header */}
 <div className="text-center mb-8 sm:mb-12">
 <motion.span
 initial={{ opacity: 0, y: -10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="text-red-600 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs block mb-2 sm:mb-3"
 >
 Our Journey
 </motion.span>
 <motion.h2
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.1 }}
 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
 >
 From Vision to Reality
 </motion.h2>
 </div>

 {/* Timeline Container */}
 <div className="relative">
 {/* Sleeker Vertical Axis Line */}
 <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />

 {processSteps.map((step, index) => {
 const Icon = step.icon;
 const isEven = index % 2 === 0;

 return (
 <div
 key={index}
 className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-6 sm:mb-8 ${isEven ? 'md:flex-row-reverse' : ''
 }`}
 >
 {/* Timeline Dot (Slightly smaller, tighter ring layout) */}
 <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
 <motion.div
 initial={{ scale: 0 }}
 whileInView={{ scale: 1 }}
 viewport={{ once: true, margin: "-100px" }}
 className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-red-600 border-2 border-slate-50 ring-2 ring-slate-200/50"
 />
 </div>

 {/* Spacer to bring items closer to center axis line */}
 <div className="hidden md:block w-[46%]" />

 {/* Content Card Panel */}
 <motion.div
 initial={{ opacity: 0, x: isEven ? -20 : 20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true, margin: "-100px" }}
 transition={{ type: "spring", duration: 0.6, delay: 0.05 }}
 className="pl-10 md:pl-0 w-full md:w-[46%]"
 >
 <div className="group relative bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-xl shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-slate-200 hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5">

 {/* Upper Header Row inside Card */}
 <div className="flex items-center justify-between mb-2 sm:mb-3">
 <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center ${step.colorClass} text-white shadow-md`}>
 <Icon size={16} sm:size={18} className="group-hover:scale-105 transition-transform duration-200" />
 </div>
 <span className="text-[10px] sm:text-[12px] font-mono font-bold tracking-wider text-slate-600 bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded">
 {step.badge}
 </span>
 </div>

 {/* Text content */}
 <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 group-hover:text-red-600 transition-colors duration-200">
 {step.title}
 </h3>
 <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
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

 <section className="relative py-20 sm:py-28 bg-slate-50 transition-colors duration-300 overflow-hidden">
 {/* Decorative Background Glows */}
 <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
 <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

 <div className="max-w-9xl mx-auto px-4 sm:px-20 relative z-10">

 {/* Header Section */}
 <div className="text-center mb-16 sm:mb-24 max-w-3xl mx-auto">
 <motion.span
 initial={{ opacity: 0, y: -10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="text-red-600 font-black tracking-[0.25em] uppercase text-xs block mb-3"
 >
 Bespoke Tailoring
 </motion.span>

 <motion.h2
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.1 }}
 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none"
 >
 What Can We <span className="bg-gradient-to-r cursor-default from-red-600 to-amber-500 bg-clip-text text-transparent">Customize</span>
 </motion.h2>

 <motion.p
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 viewport={{ once: true }}
 transition={{ delay: 0.2 }}
 className="mt-4 text-slate-600 text-sm sm:text-base"
 >
 Every detail is engineered to match your precise brand requirements.
 </motion.p>
 </div>

 {/* Enhanced Grid Items */}
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
 {customizationItems.map((item, index) => {
 return (
 <motion.div
 key={item.name}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: index * 0.08 }}
 whileHover={{ y: -8 }}
 className="group relative bg-white rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center border border-slate-200 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300"
 >
 {/* Top Subtle Border Glow Accent on Hover */}
 <div className="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-red-500/10 to-transparent pointer-events-none" />

 {/* Animated Image Wrapper */}
 <div className="mb-5 w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-amber-500 transition-all duration-300 shadow-inner overflow-hidden">
 <img
 src={item.image}
 alt={item.name}
 className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
 />
 </div>

 <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
 {item.name}
 </h3>

 <p className="text-xs text-slate-500 group-hover:text-slate-600 transition-colors">
 {item.desc}
 </p>
 </motion.div>
 );
 })}
 </div>

 </div>
 </section>

 {/* Color Options Carousel - Single Continuous Line */}
 <section className="py-16 sm:py-20 bg-white transition-colors duration-300 overflow-hidden">
 <div className="max-w-7xl mx-auto px-4 sm:px-6">
 <div className="text-center mb-8 sm:mb-12">
 <motion.span
 initial={{ opacity: 0, y: -10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="text-red-600 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs block mb-2 sm:mb-4"
 >
 Our Colors
 </motion.span>
 <motion.h2
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.1 }}
 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 sm:mb-6"
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
 className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-widest shadow-lg shadow-red-600/20 transition-all"
 >
 <Download size={14} sm:size={16} />
 Download Colour Palette
 </motion.a>
 </div>
 </div>

 {/* Single Continuous Carousel - Moving Left */}
 <div className="relative overflow-hidden ">
 <motion.div
 className="flex gap-6 sm:gap-8 whitespace-nowrap"
 animate={{ x: [0, -1800] }}
 transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
 >
 {[...colorOptions, ...colorOptions].map((color, index) => (
 <div
 key={`color-${index}`}
 className="flex flex-col items-center gap-2 sm:gap-3 min-w-[160px] sm:min-w-[220px] flex-shrink-0"
 >
 <div className="w-32 h-32 sm:w-40 sm:h-40 bg-slate-50 rounded-2xl p-3 sm:p-4 flex items-center justify-center border border-slate-200 shadow-lg">
 <img
 src={color.image}
 alt={color.name}
 className="object-contain w-full h-full"
 />
 </div>
 <span className="text-[11px] sm:text-sm font-semibold text-slate-700">
 {color.name}
 </span>
 </div>
 ))}
 </motion.div>
 </div>
 </section>

 {/* CTA Section */}
 <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-red-700 via-red-600 to-orange-600 relative overflow-hidden">
 <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:20px_20px]" />

 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-100px" }}
 >
 <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight">
 Ready to Innovate?
 </h2>
 <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-10 max-w-2xl mx-auto font-light">
 Let's collaborate to create packaging that stands out on the shelves and performs in your supply chain.
 </p>
 <motion.a href='/contact'
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.97 }}
 className="inline-flex items-center gap-2 px-6 sm:px-10 py-3.5 sm:py-5 bg-white text-red-600 rounded-2xl font-bold text-[10px] sm:text-xs uppercase tracking-widest shadow-xl hover:bg-slate-100 transition-all duration-300"
 >
 Get in Touch
 <ArrowUpRight size={14} sm:size={16} />
 </motion.a>
 </motion.div>
 </div>
 </section>
 </div>
 )
}

export default Innovate
