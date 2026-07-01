import dotenv from 'dotenv'
import transporter from './utils/Mail.js'

dotenv.config()

const testEmail = async () => {
  try {
    console.log('📧 Testing email sending...')
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'avidevelop60@gmail.com',
      subject: 'Test Email from Sheth PET Website',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937;">Test Email</h2>
          <p>This is a test email to verify the contact form is working correctly!</p>
          <p>If you received this, everything is set up properly!</p>
        </div>
      `
    }
    
    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Test email sent successfully! Message ID:', info.messageId)
    process.exit(0)
  } catch (error) {
    console.error('❌ Error sending test email:', error)
    process.exit(1)
  }
}

testEmail()
