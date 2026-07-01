import { motion } from 'framer-motion'

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#15171A] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Terms of Service
          </h1>
          
          <div className="space-y-8 text-[#5C6066] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            <section>
              <h2 className="text-2xl font-bold text-[#15171A] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                1. Acceptance of Terms
              </h2>
              <p className="text-lg">
                By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#15171A] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                2. Use of Website
              </h2>
              <p className="text-lg">
                You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#15171A] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                3. Intellectual Property
              </h2>
              <p className="text-lg">
                The content on this website, including but not limited to text, graphics, logos, images, as well as the compilation thereof, and any software used on the website, is the property of Sheth PET & Polymers and is protected by copyright and other laws protecting intellectual property.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#15171A] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                4. Limitation of Liability
              </h2>
              <p className="text-lg">
                Sheth PET & Polymers will not be liable for any damages of any kind arising from the use of this site, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#15171A] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                5. Governing Law
              </h2>
              <p className="text-lg">
                These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#15171A] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                6. Contact Us
              </h2>
              <p className="text-lg">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 text-lg">
                <p className="font-medium">Sheth PET And Polymers Pvt. Ltd.</p>
                <p>Unit 510, B Wing, Lodha Supremus II, Wagle Industrial Estate, Thane - 400604</p>
                <p>Email: info@sethpet.com</p>
                <p>Phone: +91 80478 33997</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsOfService
