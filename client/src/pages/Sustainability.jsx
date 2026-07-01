  import React from 'react';
  import { motion } from 'framer-motion';
  import { 
    Leaf, 
    Truck, 
    ShieldCheck, 
    Sparkles, 
    Award, 
    MapPin, 
    Layers,
    ChevronRight 
  } from 'lucide-react'; // Note: adjust import to 'lucide-react' based on your environment

  export default function SustainabilityPage() {
    // Animation variants for staggered fade-ins
    const fadeIn = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2
        }
      }
    };

    return (
      <div className="bg-slate-50 text-slate-800 font-sans min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            >
              <Leaf className="w-4 h-4" /> The Science of Packaging
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Sustainable Packaging:<br />
              <span className="text-emerald-400">Why PET is the Right Choice</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              When brands and manufacturers evaluate packaging today, three factors define the decision: environmental impact, product preservation, and convenience. At Sheth PET & Polymers, we manufacture PET (#1) bottles, jars, and preforms — and the science consistently confirms that PET packaging is among the most sustainable choices available.
            </motion.p>
          </div>
        </section>

        {/* Industry Insights / Intro Statement */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">PET Packaging and Sustainability — What the Data Shows</h2>
            <p className="text-slate-600 font-medium leading-relaxed">
              Choosing packaging is no longer just a functional decision — it's an environmental one. Life cycle assessments across the packaging industry repeatedly show that PET (Polyethylene Terephthalate) uses less energy during production and generates fewer greenhouse gases compared to common alternatives such as glass, aluminium, and multi-layer plastics. For pharma, FMCG, edible oil, and cosmetic brands, this makes PET a responsible, science-backed choice.
            </p>
          </motion.div>
        </section>

        {/* Core Sustainability Pillars */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Pillar 1: Carbon Footprint */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit mb-6">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Lower Carbon Footprint</h3>
                <p className="text-emerald-600 font-medium text-sm mb-4">Lighter Weight, Fewer Emissions</p>
                <p className="text-slate-700 leading-relaxed mb-6">
                  PET bottles are significantly lighter than glass or metal alternatives of equivalent volume. This directly reduces fuel consumption and CO₂ emissions during transportation — across every leg of the supply chain, from our Thane manufacturing unit to your facility, and onward to the end consumer.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  PET's high recyclability further strengthens its environmental profile. Collected PET bottles can be recycled into new packaging, textiles, and industrial materials, reducing the volume of plastic entering landfills and supporting a more circular economy.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 -mx-8 -mb-8 p-6 rounded-b-2xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">Key Benefit</span>
                <p className="text-sm font-semibold text-slate-800">Lower transport weight + high recyclability = a measurably smaller carbon footprint per unit.</p>
              </div>
            </motion.div>

            {/* Pillar 2: Preservation Integrity */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Superior Preservation Integrity</h3>
                <p className="text-blue-600 font-medium text-sm mb-4">Packaging That Protects What's Inside</p>
                <p className="text-slate-700 leading-relaxed mb-6">
                  A sustainable package is also one that does its primary job well — preserving product quality from the moment of filling to the moment of use. PET offers excellent barrier properties against oxygen, moisture, and contaminants, making it the preferred material for sensitive formulations.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span>Pharmaceutical tablets, capsules, and liquid medicines</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span>Edible oils, juices, and food products</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span>Cosmetics, personal care, and home care formulations</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 -mx-8 -mb-8 p-6 rounded-b-2xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">Waste Reduction</span>
                <p className="text-sm font-semibold text-slate-800">Longer shelf life means less product waste, creating better sustainability outcomes across the entire value chain.</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 100% Virgin Resin Highlight */}
        <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none"></div>
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
            >
              <div className="md:col-span-2">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider mb-4">
                  Quality Assurance
                </div>
                <h2 className="text-3xl font-bold mb-4">100% Virgin Resin — Food-Grade & Pharma-Safe</h2>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  At Sheth PET & Polymers, all our PET bottles and preforms are manufactured using 100% virgin resin — with no recycled content mixed in. This ensures complete food-grade and pharma-grade compliance, eliminating contamination risks, maintaining crisp clarity, and flawlessly matching strict regulatory parameters.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-300 font-medium">
                  <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Drug Manufacturers</div>
                  <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" /> F&B Brands</div>
                  <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Cosmetic Companies</div>
                </div>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/50 p-6 rounded-2xl text-center shadow-xl backdrop-blur-sm">
                <span className="text-5xl font-extrabold text-emerald-400 block mb-2">100%</span>
                <p className="text-sm font-semibold tracking-wide uppercase text-slate-200">Purity Standard</p>
                <p className="text-xs text-slate-400 mt-2">Zero recycled content mixtures for maximum regulatory compliance and material integrity.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Sheth PET & Polymers */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Sheth PET & Polymers</h2>
            <p className="text-slate-600">
              Since 1996, Sheth PET & Polymers has been manufacturing precision PET bottles, jars, and preforms from our facility in Wagle Industrial Estate, Thane. Our long-term commitment to material quality and dimensional consistency anchors our operations.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <Award className="w-5 h-5 text-emerald-600 mb-3" />
              <h4 className="font-bold text-slate-900 mb-1">25+ Years Experience</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">Deep domain expertise in custom and high-volume precision PET manufacturing since 1996.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <Layers className="w-5 h-5 text-emerald-600 mb-3" />
              <h4 className="font-bold text-slate-900 mb-1">Comprehensive Range</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">Pharma bottles, cosmetic , juice and edible oil bottles, jars, preforms, and caps.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <MapPin className="w-5 h-5 text-emerald-600 mb-3" />
              <h4 className="font-bold text-slate-900 mb-1">Thane, MH Unit</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">Strategically located industrial facility built to reliably serve domestic and international clients.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mb-3" />
              <h4 className="font-bold text-slate-900 mb-1">Certified Compliance</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">Strict food-grade and pharma-grade assurance utilizing only premium virgin PET resin.</p>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-emerald-50 px-4 sm:px-6 lg:px-8 text-center border-t border-emerald-100">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Make the Sustainable Switch to PET</h3>
            <p className="text-slate-600 font-medium text-sm max-w-2xl mx-auto mb-6">
              Whether you're sourcing packaging for a pharmaceutical product, an FMCG line, or a cosmetic range, Sheth PET & Polymers delivers solutions that safeguard your products while minimizing eco-footprints.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-colors shadow-sm shadow-emerald-800/10"
            >
              Request Sourcing Specs <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </section>

      </div>
    );
  }