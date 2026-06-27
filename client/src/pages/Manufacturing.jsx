import React from 'react';
import { motion } from 'framer-motion';
import { 
  MdOutlineGrain, 
} from 'react-icons/md';
import { 
  GiWaterBottle,
  GiThermometerHot,
} from 'react-icons/gi';
import ManufacturingImage from '../assets/images/manufacturing process.png';

// Highly accurate custom icons using SVG or matched react-icons
const IconGranules = () => <MdOutlineGrain className="w-7 h-7 text-blue-800" />;
const IconPreform = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-slate-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6v4c0 1.5-1 3-1 5v7a2 2 0 01-2 2h-2a2 2 0 01-2-2v-7c0-2-1-3-1-5V3z" />
  </svg>
);
const IconConditioning = () => <GiThermometerHot className="w-6 h-6 text-blue-800" />;
const IconMoulding = () => <GiWaterBottle className="w-6 h-6 text-blue-800" />;
const IconCap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-red-500">
    <ellipse cx="12" cy="9" rx="7" ry="3" />
    <path d="M5 9v4c0 1.66 3.13 3 7 3s7-1.34 7-3V9" />
  </svg>
);
const IconMachine = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-red-500">
    <path d="M4 4h16v4H4zM6 8v12h12V8M12 12v4" />
  </svg>
);

const Manufacturing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } }
  };

  return (
    <div className="text-slate-900 mt-18 antialiased" style={{ fontFamily: "'Poppins', sans-serif" }}>
    

      {/* Manufacturing Process Section */}
      <section className="bg-[#F8FAFC] text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        {/* Header section matched exactly */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-black tracking-wide text-[#0A2540] uppercase">
            OUR MANUFACTURING PROCESS
          </h1>
          <div className="h-[3px] w-8 bg-red-500 mx-auto mt-2 mb-3" />
          <p className="text-slate-500 font-normal text-sm tracking-wide">
            Precision Manufacturing. Consistent Quality.
          </p>
        </div>

        {/* Main Container Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* =========================================================
              LEFT COLUMN: PET BOTTLES & JARS
              ========================================================= */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden"
          >
            {/* Header Banner */}
            <div className="bg-[#0B2545] text-white px-6 py-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-transparent shrink-0">
                <GiWaterBottle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-md font-bold tracking-wider uppercase">PET BOTTLES & JARS</h2>
            </div>

            <div className="p-6 flex flex-col items-center">
              {/* Step 1: PET Granules */}
              <motion.div variants={cardVariants} className="w-full max-w-md bg-white border border-slate-200/70 rounded-xl p-4 flex items-center gap-5 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-blue-50/50 border border-blue-100 flex items-center justify-center shrink-0">
                  <IconGranules />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-wider text-[#0A2540] uppercase mb-0.5">PET GRANULES</h3>
                  <p className="text-[12px] text-slate-700 leading-normal font-medium">High quality virgin PET granules are the raw material</p>
                </div>
              </motion.div>

              {/* Path routing splitter visual block */}
              <div className="w-full max-w-md flex flex-col items-center my-4 relative">
                <div className="w-0.5 h-6 bg-blue-600" />
                <div className="bg-[#0B2545] text-white px-5 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-sm z-10">
                  MANUFACTURING ROUTE
                </div>
                <div className="w-0.5 h-6 bg-red-500" />
                
                {/* Desktop connector line */}
                <div className="absolute top-[38px] left-[25%] right-[25%] h-0.5 bg-slate-300 hidden md:block" />
              </div>

              {/* Split Route Block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-start">
                
                {/* Route A: Single Stage */}
                <div className="flex flex-col items-center">
                  <motion.div variants={cardVariants} className="w-full bg-white border border-slate-300 rounded-xl p-4 flex flex-col items-center text-center">
                    <span className="bg-[#1E40AF] text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded mb-3 uppercase">
                      SINGLE STAGE ISBM PROCESS
                    </span>
                    <p className="text-[11px] text-slate-700 font-medium leading-relaxed mb-5">
                      Single Stage ISBM machine converts granules into bottles inside the machine in a 3-step process
                    </p>

                    {/* Horizontal 3 Step Sub Process */}
                    <div className="grid grid-cols-3 gap-2 w-full pt-3 border-t border-slate-100">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full border border-slate-400 bg-slate-50 flex items-center justify-center mb-1">
                          <IconPreform />
                        </div>
                        <span className="text-[9px] font-semibold text-slate-500 leading-tight">Injection of Preform</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full border border-slate-400 bg-slate-50 flex items-center justify-center mb-1">
                          <IconConditioning />
                        </div>
                        <span className="text-[9px] font-semibold text-slate-500 leading-tight">Conditioning (Heating)</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full border border-slate-400 bg-slate-50 flex items-center justify-center mb-1">
                          <IconMoulding />
                        </div>
                        <span className="text-[9px] font-semibold text-slate-500 leading-tight">Stretch Blow Moulding</span>
                      </div>
                    </div>
                  </motion.div>

                  <div className="w-0.5 h-10 bg-blue-600" />

                  {/* Final Blue Variant Output */}
                  <motion.div variants={cardVariants} className="w-full  bg-white border border-slate-300 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-[#1E40AF] text-white flex items-center justify-center shrink-0">
                      <GiWaterBottle className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-extrabold text-sm tracking-wider text-[#0A2540] uppercase">FINAL PRODUCT</h4>
                      <p className="text-[11px] text-slate-700 font-medium">High quality PET Bottle / Jar <br />Ready for use</p>
                    </div>
                  </motion.div>
                </div>

                {/* Route B: Two Stage */}
                <div className="flex flex-col items-center">
                  {/* Step 1 */}
                  <motion.div variants={cardVariants} className="w-full bg-white border border-slate-300 rounded-xl p-3.5 flex items-center gap-3.5 shadow-sm">
                    <div className="w-10 h-10 rounded-full border border-red-400 bg-red-50 flex items-center justify-center shrink-0">
                      <IconPreform />
                    </div>
                    <div className="text-left">
                      <span className="bg-red-600 text-white text-[10px] font-extrabold tracking-wider px-1.5 py-0.5 rounded uppercase block mb-1 w-max">
                        TWO STAGE - STEP 1
                      </span>
                      <p className="text-[11px] text-slate-700 leading-normal font-medium">PET granules are converted into PET preforms in injection moulding machines</p>
                    </div>
                  </motion.div>

                  <div className="w-0.5 h-5 bg-red-500" />

                  {/* Step 2 */}
                  <motion.div variants={cardVariants} className="w-full bg-white border border-slate-300 rounded-xl p-3.5 flex items-center gap-3.5 shadow-sm">
                    <div className="w-10 h-10 rounded-full border border-red-400 bg-red-50 flex items-center justify-center shrink-0">
                      <IconMoulding />
                    </div>
                    <div className="text-left">
                      <span className="bg-red-600 text-white text-[10px] font-extrabold tracking-wider px-1.5 py-0.5 rounded uppercase block mb-1 w-max">
                        TWO STAGE - STEP 2
                      </span>
                      <p className="text-[11px] text-slate-700 leading-normal font-medium">Preforms are fed into a blowing machine where they are reheated and stretch blown into final bottles</p>
                    </div>
                  </motion.div>

                  <div className="w-0.5 h-5 bg-red-500" />

                  {/* Final Red Variant Output */}
                  <motion.div variants={cardVariants} className="w-full bg-white border border-slate-300 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                      <GiWaterBottle className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-extrabold text-sm tracking-wider text-[#0A2540] uppercase">FINAL PRODUCT</h4>
                      <p className="text-[11px] text-slate-700 font-medium">High quality PET Bottle / Jar <br />Ready for use</p>
                    </div>
                  </motion.div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* =========================================================
              RIGHT COLUMN: CAPS & CLOSURES
              ========================================================= */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden"
          >
            {/* Header Banner */}
            <div className="bg-red-600 text-white px-6 py-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border bg-white border-white/30 flex items-center justify-center bg-transparent shrink-0">
                <IconCap />
              </div>
              <h2 className="text-md font-bold tracking-wider uppercase">CAPS & CLOSURES</h2>
            </div>

            <div className="p-6 flex flex-col items-center">
              
              {/* Step 1 */}
              <motion.div variants={cardVariants} className="w-full max-w-md bg-white border border-slate-300/70 rounded-xl p-4 flex items-center gap-5 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-red-50/50 border border-red-300 flex items-center justify-center shrink-0">
                  <IconGranules />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-wider text-[#0A2540] uppercase mb-0.5">PP MATERIAL</h3>
                  <p className="text-[12px] text-slate-700 leading-normal font-medium">High quality PP material is fed into the system</p>
                </div>
              </motion.div>

              <div className="w-0.5 h-6 bg-red-500 my-4" />

              {/* Step 2 */}
              <motion.div variants={cardVariants} className="w-full max-w-md bg-white border border-slate-300/70 rounded-xl p-4 flex items-center gap-5 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-red-50/50 border border-red-300 flex items-center justify-center shrink-0">
                  <IconMachine />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-wider text-[#0A2540] uppercase mb-0.5">INJECTION MOULDING</h3>
                  <p className="text-[12px] text-slate-700 leading-normal font-medium">The material is heated and pushed into the injection mould</p>
                </div>
              </motion.div>

              <div className="w-0.5 h-6 bg-red-500 my-4" />

              {/* Step 3 */}
              <motion.div variants={cardVariants} className="w-full max-w-md bg-white border border-slate-300/70 rounded-xl p-4 flex items-center gap-5 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-red-50/50 border border-red-300 flex items-center justify-center shrink-0">
                  <IconCap />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-wider text-[#0A2540] uppercase mb-0.5">POST PROCESSING (IF REQUIRED)</h3>
                  <p className="text-[12px] text-slate-700 leading-normal font-medium">Caps are processed on separate machines for folding of flip tops / insertion of wads or other operations</p>
                </div>
              </motion.div>

              <div className="w-0.5 h-6 bg-red-500 my-4" />

              {/* Finished Caps Block */}
              <motion.div variants={cardVariants} className="w-full max-w-md bg-white border border-slate-300/70 rounded-xl p-4 flex items-center gap-5 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-red-50/50 border border-red-300 flex items-center justify-center shrink-0">
                  <IconCap />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-wider text-[#0A2540] uppercase mb-0.5">FINISHED CAPS</h3>
                  <p className="text-[12px] text-slate-700 leading-normal font-medium">High quality caps / closures are ready for packaging</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Manufacturing;