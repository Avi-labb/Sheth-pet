import { motion } from 'framer-motion'
import { Target, Eye, Leaf, CheckCircle, Zap, TrendingUp, Users, MapPin, Award, Scale, Mail, ArrowUpRight } from 'lucide-react'

const About = () => {
  const timeline = [
    { year: '1996', title: 'Radhe Containers', desc: 'Founded as Sheth PET & Polymers in Wada, MH.', loc: 'Wada, Maharashtra' },
    { year: '2008', title: 'Calyx Containers', desc: 'Commissioned in Anjar, Kutch facility.', loc: 'Anjar, Kutch' },
    { year: '2015', title: '200+ Active Clients', desc: 'Across FMCG, Pharma and Food & Beverage.', loc: 'India Wide' },
    { year: '2020', title: 'In-House Design Lab', desc: '3D printing operational for client sampling.', loc: 'Thane Headquarters' },
    { year: '2026', title: 'Third Facility', desc: 'Pardi, Vapi, Gujarat plant operations kickstart.', loc: 'Pardi, Vapi' }
  ]

  const leadership = [
    { initials: 'GS', name: 'Ghanshyam Sheth', email: 'ghanshyam.s@shethpet.com' },
    { initials: 'VS', name: 'Virendra Sheth', email: 'virendra.s@shethpet.com' },
    { initials: 'JS', name: 'Jignesh Sheth', email: 'jignesh.s@shethpet.com' }
  ]

  const coreValues = [
    { icon: Leaf, title: 'Sustainability', desc: 'Materials & processes engineered to minimize impact.' },
    { icon: CheckCircle, title: 'Quality Assurance', desc: 'Zero compromise on raw materials and final inspection.' },
    { icon: Zap, title: 'Innovation', desc: 'In-house design and 3D sampling to iterate fast.' },
    { icon: TrendingUp, title: 'Operational Excellence', desc: 'Continuous investment in best-in-class international tech.' },
    { icon: Users, title: 'Customer-Centricity', desc: 'Built on long-term client partnerships and satisfaction.' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <div className="bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-red-500 selection:text-white overflow-x-hidden">
      
      {/* Hero Section - Premium Editorial Split */}
      <section className="relative min-h-[85vh] flex items-center border-b border-slate-200/80 bg-white overflow-hidden">
        {/* Abstract Background Design Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-red-500/5 to-orange-500/0 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 bottom-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 px-6 lg:px-12 py-23 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-red-50/80 border border-red-100/70 rounded-full text-[11px] font-bold text-red-600 tracking-wider uppercase">
              <Scale size={13} className="text-red-500" /> Est. 1996 · Industrial Leadership
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 leading-[1.08]">
              High-performance packaging <br className="hidden sm:inline"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500">
                engineered for global brands.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">
              Discover how three decades of structured manufacturing converted a first-generation dream into India’s benchmark PET & PP solutions ecosystem.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#heritage" className="px-7 py-4 bg-slate-950 text-white rounded-2xl font-semibold text-sm hover:bg-slate-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2 group">
                Explore Our Story 
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Right Hero Visual Block */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative h-[480px] w-full bg-slate-100 rounded-[2.5rem] overflow-hidden border border-slate-200/60 shadow-xl shadow-slate-100/50">
              <img 
                src="/api/placeholder/600/600" 
                alt="Precision Engineering Architecture" 
                className="w-full h-full object-cover grayscale contrast-[1.15] mix-blend-multiply opacity-90 transition-transform duration-700 hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              
              {/* Dynamic Overlay Metric Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-xl">
                <div className="grid grid-cols-3 gap-2 text-center divide-x divide-slate-200/80">
                  <div>
                    <div className="text-3xl font-extrabold text-slate-950 tracking-tight">300+</div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">Global Clients</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-slate-950 tracking-tight">3</div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">Plants Run</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-slate-950 tracking-tight">50+</div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">Heavy Tech</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


<section id="heritage" className="py-20  bg-slate-50 border-t border-b border-slate-300 relative overflow-hidden">
  {/* Soft background design accent */}
  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-slate-50 rounded-full blur-3xl pointer-events-none -z-10" />

  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      
      {/* Left Column: Bold Summary & Visual Anchor */}
      <div className="lg:col-span-5 space-y-6 lg:sticky">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-400 text-slate-800 rounded-full text-[14px] font-bold tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> 1996 · The Origin
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative pl-6 border-l-4 border-red-500"
        >
          <h3 className="text-2xl md:text-3xl font-black text-slate-950 leading-[1.25] tracking-tight">
            A first-generation family business built on uncompromising manufacturing integrity.
          </h3>
        </motion.div>

        <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed max-w-sm">
          Today operating three facilities, serving over 300 global brands across 27 Indian states and 4 countries.
        </p>
      </div>

      {/* Right Column: Detailed Narrative with Inline Micro-Highlights */}
      <div className="lg:col-span-7">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-8 text-base md:text-lg text-slate-600 font-medium leading-relaxed"
        >
          <motion.p variants={itemVariants}>
            Sheth PET & Polymers was founded in 1996 by three first-generation entrepreneurs —{' '}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 text-sm font-bold rounded-full border border-red-100">Ghanshyam Sheth</span>,{' '}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 text-sm font-bold rounded-full border border-red-100">Virendra Sheth</span>, and{' '}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 text-sm font-bold rounded-full border border-red-100">Jignesh Sheth</span> — with a single defining belief: Indian industrial packaging could match global standards without structural or raw material compromises.
          </motion.p>
          
          <motion.p variants={itemVariants}>
            Today, under our specialized brand names{' '}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 text-sm font-bold rounded-full border border-red-100">Radhe Containers</span> and{' '}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 text-sm font-bold rounded-full border border-red-100">Calyx Containers</span>, we operate three multi-ton plants covering over{' '}
            <span className="font-semibold text-slate-950">100,000 sqft</span> of production space. Our floor houses more than 50 heavy high-output systems built by global engineering standard-bearers like ASB Japan, Boge Germany, HMT, and Husky, carefully processing over{' '}
            <span className="font-semibold text-slate-950">3,000 corporate consignments</span> every year.
          </motion.p>
          
          <motion.p variants={itemVariants} className="pt-2">
            Our{' '}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-100">
              150+ Specialist Team
            </span>{' '}
            — consisting of automation engineers, multi-station plant supervisors, logistics coordinators, and strict QA inspectors — operates directly out of a single shared playbook:{' '}
            <span className="font-bold text-slate-950 underline decoration-red-500 decoration-2 underline-offset-4">
              absolute zero compromise on base resin raw materials
            </span>, vigilant sensory checks at every manufacturing matrix, and deep, multi-decade partnerships with our clients.
          </motion.p>
        </motion.div>
      </div>

    </div>
  </div>
</section>

      {/* The Bento Ecosystem Block */}
      <section id="ecosystem" className="py-24 lg:py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 block">Operations Ecosystem</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-950">Purpose-Built Infrastructure</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission Box */}
          <div className="p-8 md:p-10 bg-white border border-slate-200/70 rounded-[2rem] shadow-sm flex flex-col justify-between group hover:border-slate-300 hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-900 mb-10 shadow-sm group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
              <Target size={26} />
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400">Our Mission</h3>
              <p className="text-xl font-bold text-slate-900 leading-snug tracking-tight">
                To engineer hyper-custom packaging blueprints balancing extreme structural integrity with client specifications.
              </p>
            </div>
          </div>

          {/* Vision Box */}
          <div className="p-8 md:p-10 bg-white border border-slate-200/70 rounded-[2rem] shadow-sm flex flex-col justify-between group hover:border-slate-300 hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-900 mb-10 shadow-sm group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
              <Eye size={26} />
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400">Our Vision</h3>
              <p className="text-xl font-bold text-slate-900 leading-snug tracking-tight">
                To anchor a dominant command structure across the subcontinental PET & PP high-output processing landscapes.
              </p>
            </div>
          </div>

          {/* Infrastructure Metrics Box */}
          <div className="p-8 md:p-10 bg-slate-950 text-white rounded-[2rem] shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/25 transition-colors duration-500" />
            <div className="z-10 h-full flex flex-col justify-between">
              <div className="w-14 h-14 bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center text-white mb-10 shadow-inner">
                <Award size={26} />
              </div>
              <div>
                <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">Footprint Scale</h3>
                <p className="text-2xl font-black tracking-tight text-white mb-4">
                  100,000+ sqft Capacity
                </p>
                <p className="text-sm text-slate-400 leading-relaxed font-normal opacity-90">
                  Utilizing state-of-the-art international hardware chains from ASB Japan, Boge Germany, HMT, and Husky.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Clean Cleaned-Up Core Values */}
      <section className="bg-slate-950 text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.05),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
              <span className="text-xs font-extrabold uppercase tracking-widest text-red-400 block">Operational DNA</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">The Frameworks That Sustain Us</h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md font-light">
                We manage production lines under uncompromising standards, validating every design iterate from material optimization to client integration.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coreValues.map((val, idx) => {
                const IconComponent = val.icon
                return (
                  <div key={idx} className="p-8 bg-slate-900/50 border border-slate-800/80 rounded-[2rem] hover:border-slate-700 hover:bg-slate-900 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-slate-800 border border-slate-700/60 rounded-xl flex items-center justify-center text-red-400 mb-6 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                      <IconComponent size={22} />
                    </div>
                    <h4 className="font-bold text-xl text-white mb-2 tracking-tight">{val.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed font-light opacity-90">{val.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sleek Left-Anchored Timeline */}
      <section id="timeline" className="py-24 lg:py-32 max-w-5xl mx-auto px-6 lg:px-12">
        <div className="mb-20 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 block">Our Timeline</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-950">Milestones & Expansions</h2>
        </div>

        <div className="relative border-l-2 border-slate-200/80 pl-8 ml-4 space-y-14">
          {timeline.map((item, idx) => (
            <motion.div 
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={itemVariants}
              className="relative group"
            >
              {/* Dot indicator */}
              <div className="absolute -left-[2.65rem] top-2 w-5 h-5 rounded-full bg-white border-4 border-red-500 shadow-sm group-hover:scale-110 transition-transform duration-300" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <span className="text-3xl font-black text-slate-950 tracking-tight">{item.year}</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-600 font-medium border border-slate-200/40">
                  <MapPin size={12} className="text-slate-400" /> {item.loc}
                </span>
              </div>
              <div className="bg-white p-6 md:p-8 border border-slate-200/70 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="font-bold text-lg text-slate-900 mb-1.5 tracking-tight">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Corporate Leadership Profiles */}
      <section id="leadership" className="py-24 lg:py-32 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-20 text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 block">Executive Council</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-950">Board of Directors</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, idx) => (
              <div key={idx} className="group bg-slate-50/60 border border-slate-200/80 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:border-slate-300/50 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-slate-950 text-white rounded-2xl flex items-center justify-center font-extrabold text-xl mb-6 shadow-md shadow-slate-950/10 group-hover:bg-red-600 transition-colors duration-300">
                    {member.initials}
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 mb-1 tracking-tight">{member.name}</h3>
                </div>
                <a 
                  href={`mailto:${member.email}`} 
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-widest bg-white border border-slate-200 px-4 py-3.5 rounded-xl hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all duration-300 w-full justify-center shadow-sm"
                >
                  <Mail size={14} /> Connect via Email
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default About