import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2, FlaskConical, Target, Package, Zap } from 'lucide-react';
import Header from '../components/Header/Header';

export default function Manufacturing() {
  const [petRoute, setPetRoute] = useState('single');

  return (
    <div className="text-slate-900 font-sans antialiased">
      <Header />

      {/* Header Section */}
      <section className="relative pt-23">
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left flex flex-col items-start" /* Changed from text-center to left-aligned flex layout */
          >
            {/* Badge container now aligns natively left without spreading full width */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-red-50/80 border border-red-100/70 rounded-full text-[11px] font-bold text-red-600 tracking-wider uppercase mb-6">
              <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
              MANUFACTURING EXCELLENCE
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-950 mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Two Systems.
              <span className="text-red-600">One Result.</span>
            </h1>

            {/* Removed mx-auto so the description stays anchored left */}
            <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl" style={{ fontFamily: "'Inter', sans-serif" }}>
              Aesthetic excellence requires mechanical rigor. Every polymer chain tracked from hopper to packed unit.
            </p>
          </motion.div>
        </div>
      </section>
      {/* LINE 01: PET Bottles & Jars */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-slate-400 p-6 md:p-10 rounded-3xl shadow-sm"
          >
            {/* Line Header */}
            <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-400">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase block mb-1.5 text-red-600 font-mono">
                  LINE 01
                </span>
                <h3 className="text-3xl font-semibold uppercase tracking-tight flex items-center gap-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  PET Bottles & Jars
                  <FlaskConical className="w-5 h-5 text-red-600" />
                </h3>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono hidden sm:inline">
                rPET / Virgin PET Granule
              </span>
            </div>

            {/* Controls Strip */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
              <div className="md:col-span-7 flex items-center justify-between p-4 bg-slate-950 text-white rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
                  <span className="font-mono text-[11px] uppercase tracking-wider">
                    Feedstock integration: High-viscosity resin granules
                  </span>
                </div>
              </div>

              <div className="md:col-span-5 flex items-center justify-center gap-3 p-2 rounded-2xl border-2 border-slate-950">
                {['single', 'two-stage'].map((route) => (
                  <button
                    key={route}
                    onClick={() => setPetRoute(route)}
                    className="flex-1 px-4 py-3 rounded-xl font-mono text-[11px] uppercase tracking-wider transition-all duration-300"
                    style={{
                      backgroundColor: petRoute === route ? '#0f172a' : 'transparent',
                      color: petRoute === route ? '#ffffff' : '#0f172a',
                    }}
                  >
                    {route === 'single' ? 'Single-Stage Route' : 'Two-Stage Route'}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Routing Matrix */}
            <div className="min-h-[300px] relative">
              <AnimatePresence mode="wait">
                {petRoute === 'single' ? (
                  <motion.div
                    key="single"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="p-2 md:p-6"
                  >
                    <FlowSteps
                      steps={[
                        { n: '01', title: 'Controlled Injection Molding', desc: 'Raw polymer is plasticized down heat zones and micro-injected straight into thermal matrices.' },
                        { n: '02', title: 'Axial Distribution Tuning', desc: 'Pre-molded parison profiles route through automated thermal equalization cells.' },
                        { n: '03', title: 'Bi-Axial Stretch Blow', desc: 'High-pressure pneumatic blow clamps stretch material into finalized glass-clear configurations.' },
                      ]}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="two-stage"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2"
                  >
                    <StageCard
                      tag="STAGE A — INJECTION"
                      title="Preform Structural Production"
                      body="Granules melt and shape into standalone test-tube preforms via high-cavity molding arrays, which are checked, cooled, and buffered in storage."
                      status="Verified Logistics Stage"
                    />
                    <StageCard
                      tag="STAGE B — BLOW CAVITY"
                      title="Reheat Calibration & Finishing"
                      body="Buffered preforms travel down infrared heating loops to reach ideal stretching temperatures, entering high-speed blow cavities for final geometry output."
                      status="Pneumatics Balanced"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LINE 02: Caps & Closures */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-slate-400 p-6 md:p-10 rounded-3xl shadow-sm"
          >
            {/* Line Header */}
              <div>
            <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-400">
                <span className="text-[14px] tracking-[0.25em] uppercase block mb-1.5 text-red-600 font-mono">
                  LINE 02
                </span>
                <h3 className="text-3xl font-semibold uppercase tracking-tight flex items-center gap-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Caps & Closures
                  <Target className="w-5 h-5 text-red-600" />
                </h3>
              </div>
              <span className="text-[14px] uppercase tracking-wider text-slate-700 font-mono hidden sm:inline">
                PP High-Flow Polymer
              </span>
            </div>

            {/* Process Stack Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">

              {/* Left Ledger Steps Stack */}
              <div className="lg:col-span-8 border-t-2 border-slate-950">
                {[
                  { title: 'Material Integration', tag: 'PP Vacuum Feed', body: 'Premium high-flow PP raw grains are parsed and vacuum-fed to injection manifolds.' },
                  { title: 'Die-Array Injection Moulding', tag: 'High Clamp Pressure', body: 'Heated polymer melt injects under extreme clamp tonnages into multi-cavity precision tool dies.' },
                  { title: 'Post-Mold Geometry Customization', tag: 'Downstream Sync', body: 'Molded closures auto-route down streams to integrated units for mechanical folding, lining, or cutting.' },
                  { title: 'Automated Vision Quality Inspection', tag: '100% Optically Checked', body: 'Finished closure components step past multi-angle optical inspection rigs directly into bulk export arrays.' },
                ].map((node, i, arr) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-6  px-6 py-6 transition-colors group hover:bg-red-50"
                    style={{ borderBottom: i < arr.length - 1 ? '1px solid #e2e8f0' : 'none' }}
                  >
                    <span className="font-mono text-sm pt-1 font-semibold transition-transform group-hover:scale-110 text-red-600">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <h4 className="text-base font-semibold uppercase tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{node.title}</h4>
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 shrink-0 text-slate-800 border border-slate-600 rounded">
                          {node.tag}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {node.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Information sidebar block */}
              <div className="lg:col-span-4 flex flex-col gap-4 h-full justify-between">
                <div className="p-6 bg-slate-50 border border-dashed border-slate-300 rounded-2xl">
                  <span className="font-mono text-[13px] uppercase font-bold tracking-wider block mb-2 text-red-600">
                    System Safeguard
                  </span>
                  <p className="text-sm leading-relaxed text-slate-700" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Every closure run undergoes automated seal profiling and micro-thread spacing validations before conveyor line gates clear for export distribution packaging.
                  </p>
                </div>

                <div className="p-5 flex items-center justify-between mt-auto bg-slate-950 text-white rounded-2xl">
                  <span className="font-mono text-[11px] uppercase tracking-wider flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 bg-slate-500 rounded-full animate-pulse" />
                    Bulk Export Line Output
                  </span>
                  <Package className="w-5 h-5 text-slate-500" />
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */

function FlowSteps({ steps }) {
  return (
    <div className="flex flex-col gap-2">
      {steps.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex gap-6 group p-4 border border-slate-400 bg-slate-50/40 rounded-2xl hover:bg-red-50 hover:border-red-400 transition-all duration-300"
        >

          <div className="flex flex-col items-center shrink-0 pt-0.5">
            <span className="font-mono text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 bg-white border-2 border-red-600 text-red-600">
              {s.n}
            </span>
          </div>

          <div>
            <h5 className="text-base font-semibold uppercase tracking-tight mb-1 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {s.title}
              <Zap className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 text-red-600" />
            </h5>
            <p className="text-xs leading-relaxed text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              {s.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function StageCard({ tag, title, body, status }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
      className="p-6 flex flex-col justify-between transition-all border border-slate-400 bg-white rounded-2xl hover:border-slate-950"
    >
      <div>
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 inline-block mb-4 text-slate-500 border border-slate-400 rounded">
          {tag}
        </span>
        <h5 className="text-base font-semibold uppercase tracking-tight mb-2.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h5>
        <p className="text-sm leading-relaxed text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
          {body}
        </p>
      </div>
      <div className="mt-6 pt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider border-t border-slate-400 text-slate-500">
        {status}
        <motion.div
          initial={{ x: -2 }}
          animate={{ x: 2 }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.8 }}
        >
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.div>
  );
}
