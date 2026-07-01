import { motion } from 'framer-motion'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#15171A] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Privacy Policy
          </h1>
          
          <div className="space-y-8 text-[#5C6066] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            <section>
              <h2 className="text-2xl font-bold text-[#15171A] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                1. Introduction
              </h2>
              <p className="text-lg">
                Welcome to Sheth PET & Polymers. We respect your privacy and are committed to protecting your personal data.
                This privacy policy will inform you about how we look after your personal data when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#15171A] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                2. Data We Collect
              </h2>
              <p className="text-lg">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-lg">
                <li>Identity Data: includes first name, last name, username or similar identifier.</li>
                <li>Contact Data: includes email address and telephone numbers.</li>
                <li>Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug‑in types and versions, operating system and platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#15171A] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                3. How We Use Your Data
              </h2>
              <p className="text-lg">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-lg">
                <li>To respond to your inquiries and provide customer support.</li>
                <li>To process and deliver your orders and requests.</li>
                <li>To improve our website, products and services.</li>
                <li>To send you marketing communications if you have opted in.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#15171A] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                4. Data Security
              </h2>
              <p className="text-lg">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#15171A] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                5. Contact Us
              </h2>
              <p className="text-lg">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
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

export default PrivacyPolicy
